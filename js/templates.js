// js/templates.js — Funções e templates para renderização dinâmica

// --------------------------------------------------------
// --- TEMPLATES HTML (strings que representam as “páginas”)
// --------------------------------------------------------

export const homePageTemplate = `
<div class="container-grid">
    <section id="sobre" class="col-6">
        <h2>Quem Somos <span class="badge badge-primaria">ONG Oficial</span></h2>
        <p>
            A <strong>ONG Esperança Viva</strong> é uma organização sem fins lucrativos que atua na assistência social, promovendo
            ações de solidariedade, arrecadações e apoio a famílias em situação de vulnerabilidade.
        </p>
    </section>

    <section class="col-6">
        <img src="img/ong.png" alt="Voluntários ajudando a comunidade">
    </section>
</div>

<section id="missao">
    <h2>Nossa Missão</h2>
    <p> Nosso objetivo é levar esperança, alimentos, educação e dignidade a quem mais precisa. Acreditamos que pequenas ações transformam vidas e fortalecem nossa comunidade.</p>
</section>

<section id="contato">
    <h2>Entre em Contato</h2>
    <p>Para falar conosco, utilize os canais abaixo:</p>
    <ul>
        <li><strong>E-mail:</strong> contato@ongesperancaviva.org.br</li>
        <li><strong>Telefone:</strong> (11) 98765-4321</li>
        <li><strong>Endereço:</strong> Rua da Esperança, 123 - Bairro Feliz - São Paulo/SP</li>
    </ul>
</section>
`;

export const projetosPageTemplate = `
<section>
    <h2>Nossos Projetos</h2>
    <p> Desenvolvemos diversas ações voltadas à comunidade. </p>
    
    <div class="card-container" id="projetos-list-container">
        </div>
        
    <img src="img/voluntarios.png" alt="Equipe de voluntários atuando em um projeto social" width="600">
</section>

<section>
    <h2>Seja um Voluntário</h2>
    <p> Junte-se a nós e faça parte dessa transformação! Seu tempo e dedicação podem mudar vidas.</p>
    <a href="#cadastro" class="botao">Quero me Cadastrar Agora!</a>
</section>

<section id="doacao">
    <h2>Faça uma Doação e Transforme Vidas</h2>
    <p>Se você deseja apoiar financeiramente nossos projetos, sua doação é essencial para a continuidade de nossas ações sociais.</p>
    <p>Acesse nossa <a href="#" class="botao">Página de Doação</a> para conhecer as formas de contribuir.</p>
    
    <div class="alert alert-alerta">
        Atenção: A doação é 100% segura e auditada para garantir a transparência.
    </div>
</section>
`;

export const cadastroPageTemplate = `
<div class="container-grid">
    <div class="col-4">
        <img src="img/cadastro.png" alt="Imagem de cadastro para contribuidores">
    </div>
    
    <section class="col-8">
        <h2>Cadastro de Voluntário</h2>
        
        <div class="alert alert-sucesso">
            Preencha todos os campos para se juntar à nossa causa!
        </div>
        
        <form action="#" method="post">
            <fieldset>
                <legend>Informações Pessoais</legend>
                
                <div class="form-grid-2-cols"> 
                    <div>
                        <label for="nome">Nome Completo:</label>
                        <input type="text" id="nome" name="nome" required>
                    </div>
                    <div>
                        <label for="email">E-mail:</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                </div>

                <label for="cpf">CPF:</label>
                <input 
                    type="text" 
                    id="cpf" 
                    name="cpf" 
                    maxlength="14" 
                    required
                    pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}"
                    title="Formato exigido: 000.000.000-00"
                >
                
                <label for="telefone">Telefone:</label>
                <input 
                    type="tel" 
                    id="telefone" 
                    name="telefone" 
                    required
                    pattern="\\(\\d{2}\\)\\s\\d{4,5}-\\d{4}"
                    title="Formato exigido: (XX) XXXX-XXXX ou (XX) XXXXX-XXXX (com espaço)"
                >

                <label for="nascimento">Data de Nascimento:</label>
                <input type="date" id="nascimento" name="nascimento" required>
                
                <label for="endereco">Endereço:</label>
                <input type="text" id="endereco" name="endereco" required>
                
                <label for="cep">CEP:</label>
                <input 
                    type="text" 
                    id="cep" 
                    name="cep" 
                    maxlength="9" 
                    required
                    pattern="\\d{5}-\\d{3}"
                    title="Formato exigido: XXXXX-XXX"
                >
                
                <label for="cidade">Cidade:</label>
                <input type="text" id="cidade" name="cidade" required>

                <label for="estado">Estado:</label>
                <input type="text" id="estado" name="estado" maxlength="2" required>

                <input type="submit" value="Enviar Cadastro">
            </fieldset>
        </form>
    </section> 
</div>
`;


// --------------------------------------------------------
// --- FUNÇÕES DE RENDERIZAÇÃO
// --------------------------------------------------------

export function projectCardHTML(project) {
  return `
    <article class="card" data-id="${project.id || ''}">
            <h3>${escapeHtml(project.title)}</h3>
      <p>${escapeHtml(project.description)}</p>
      <div class="meta">
        <span class="badge badge-primaria">${escapeHtml(project.status || 'Ativo')}</span>
      </div>
    </article>
  `;
}

export function renderProjects(container, projects = []) {
  container.innerHTML = projects.map(p => projectCardHTML(p)).join('');
}

// Função auxiliar para evitar inserção insegura de HTML
function escapeHtml(text = '') {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Exibe um pequeno alerta temporário (toast)
export function showToast(message, type = 'info', timeout = 3500) {
  const existing = document.querySelector('.app-toast');
  if (existing) existing.remove();

  const div = document.createElement('div');
  div.className = `app-toast app-toast--${type}`;
  div.setAttribute('role', 'status');
  div.setAttribute('aria-live', 'polite');
  div.textContent = message;
  Object.assign(div.style, {
    position: 'fixed',
    right: '16px',
    bottom: '16px',
    background: type === 'error' ? '#ef5350' : (type === 'success' ? '#4caf50' : '#333'),
    color: 'white',
    padding: '10px 14px',
    borderRadius: '8px',
    boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
    zIndex: 9999
  });

  document.body.appendChild(div);
  setTimeout(() => div.remove(), timeout);
}
