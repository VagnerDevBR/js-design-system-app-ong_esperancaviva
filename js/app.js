// app.js — ponto de entrada principal
import { initRouter, onContentLoaded } from './router.js';
import { initFormValidation } from './formValidation.js';
import { storage } from './storage.js';
import { renderProjects, showToast } from './templates.js';

function init() {
  initRouter();
  // Inicia as funcionalidades logo após o primeiro carregamento
  initPageFeatures();
  // Reexecuta as features sempre que o conteúdo for trocado (SPA)
  onContentLoaded(initPageFeatures);
  // Ativa o controle de acessibilidade do menu mobile
  setupMenuToggle();
}

function setupMenuToggle() {
  const toggle = document.querySelector('.menu-toggle');
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    const ul = document.querySelector('nav ul');
    if (!ul) return;
    ul.classList.toggle('show');
  });
}

function initPageFeatures() {
  // 1. Se houver formulário na página, inicializa as validações
  initFormValidation();

  // 2. Se estiver na página de projetos, renderiza os cards dinâmicos
  const projectsContainer = document.querySelector('#projetos-list-container'); 
  if (projectsContainer) {
    const projects = storage.get('projetos', getSeedProjects());
    renderProjects(projectsContainer, projects);
  }

  // 3. Adiciona eventos de clique aos cards
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      showToast('Você clicou em um projeto.', 'info', 1800);
    });
  });
}

/* Dados iniciais (seeds) para o localStorage */
function getSeedProjects() {
  const seed = [
    { id: 1, title: 'Doação Solidária', description: 'Arrecadação e distribuição de alimentos.', img: 'img/doacao.jpg', status: 'Ativo' },
    { id: 2, title: 'Programa Voluntariado', description: 'Capacitação e engajamento de voluntários.', img: 'img/voluntariado.jpg', status: 'Em andamento' },
    { id: 3, title: 'Educar para o Futuro', description: 'Oficinas de reforço escolar e inclusão digital.', img: 'img/ong.png', status: 'Novo' }
  ];
  storage.set('projetos', seed);
  return seed;
}

// Inicializa a aplicação
document.addEventListener('DOMContentLoaded', init);
