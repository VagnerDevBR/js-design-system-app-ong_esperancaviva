// router.js — Controle de rotas baseado em hash (SPA)

import { homePageTemplate, projetosPageTemplate, cadastroPageTemplate } from './templates.js'; // Importa os templates

const routes = {
    // Rotas principais da aplicação
    '#/': homePageTemplate,
    '#projetos': projetosPageTemplate,
    '#cadastro': cadastroPageTemplate
};

/* Lista de callbacks executados após cada troca de conteúdo */
const callbacks = [];

export function onContentLoaded(fn) {
  callbacks.push(fn);
}

function dispatchContentLoaded() {
  callbacks.forEach(fn => {
    try { fn(); } catch (e) { console.error(e); }
  });
}

export function initRouter() {
    // Escuta mudanças no hash da URL (ex: #cadastro, #projetos)
    window.addEventListener('hashchange', renderContent);

    // Renderiza o conteúdo inicial
    renderContent();
    
    // Intercepta cliques em links internos (SPA)
    document.addEventListener('click', (e) => {
        const a = e.target.closest('a');
        if (!a) return;

        const href = a.getAttribute('href');
        
        // Só trata links que começam com "#"
        if (href && href.startsWith('#')) {
            e.preventDefault();
            navigateTo(href);
        }
        
        // Fecha o menu mobile, se estiver aberto
        const ul = document.querySelector('nav ul');
        if (ul && ul.classList.contains('show')) ul.classList.remove('show');
    });
}

export function navigateTo(hash) {
    // Atualiza o hash manualmente, disparando o evento de navegação
    window.location.hash = hash;
}

function renderContent() {
    const hash = window.location.hash || '#/';
    const template = routes[hash];

    // Elemento principal onde o conteúdo das páginas é exibido
    const contentDiv = document.querySelector('#content'); 
    
    if (template && contentDiv) {
        contentDiv.innerHTML = template; 
        window.scrollTo(0, 0);
        dispatchContentLoaded();
    } else if (contentDiv) {
        contentDiv.innerHTML = '<section><h2>Página não encontrada!</h2><p>Verifique o endereço digitado.</p></section>';
    }
}
