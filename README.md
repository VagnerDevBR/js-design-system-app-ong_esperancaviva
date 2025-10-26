#  ONG Esperança Viva | Projeto Final (Entrega III: Interatividade e Funcionalidades)

Este projeto representa a conclusão das Experiências Práticas, evoluindo de um site estático (Entrega II) para uma **Single Page Application (SPA)** dinâmica. Demonstra domínio em HTML5 Semântico, CSS3 Modular (Design System) e JavaScript avançado (SPA, Validação de Dados e Modularização).

###  Funcionalidades e Conquistas Técnicas

O projeto foi desenvolvido para transformar a interface estática em uma aplicação funcional, cumprindo integralmente todos os requisitos, incluindo:

#### Arquitetura Single Page Application (SPA Básico)

* **Roteamento (SPA):** O **`router.js`** faz o controle de navegação via **Hash (`#/`, `#cadastro`)**, injetando o conteúdo dinamicamente na página, eliminando a necessidade de múltiplos arquivos HTML e recargas.
* **Sistema de Templates:** O conteúdo das páginas (Início, Projetos, Cadastro) é gerenciado por **strings JavaScript (`templates.js`)**, cumprindo o requisito de templates JS.
* **Navegação Rápida:** A navegação é instantânea, proporcionando uma experiência de usuário semelhante a um aplicativo.

#### Validação e Consistência de Dados (JavaScript)

* **Verificação de Consistência (Requisito):** O **`formValidation.js`** implementa validação avançada, indo além do HTML5, com:
    * **Algoritmo de Validação de CPF.**
    * **Verificação de Idade Mínima** (usuário deve ter 18 anos ou mais).
    * Validação de padrões (Regex) para Telefone e CEP.
* **Feedback Inteligente:** O sistema impede o envio, destaca campos inválidos e exibe mensagens claras de erro.
* **Persistência de Dados:** O `storage.js` usa o `localStorage` para salvar os cadastros de voluntários e projetos, simulando uma persistência de dados em ambiente real.

#### Base do Design System (Entrega II)

* **Código Modular:** O projeto utiliza código JavaScript modular (`router.js`, `formValidation.js`, etc.) e CSS modular (pastas `modules/` e `components/`).
* **Design System (CSS Vars):** Implementação de variáveis CSS (`_variables.css`) para cores, tipografia e espaçamento, garantindo a padronização visual.
* **Layout Profissional:** Uso de **CSS Grid** (12 Colunas) e **Flexbox** para estrutura geral e componentes (cards/menu).
* **Responsividade:** Mais de 5 breakpoints definidos para adaptar o layout a qualquer dispositivo (Mobile First).

---

##  Estrutura do Projeto

O projeto segue um modelo modular e profissional:

```
PROJETOONG/
├── css/
│   ├── components/ (Botões, Cards, Formulários)
│   └── modules/    (Design System, Reset, Layout, Grid)
├── js/
│   ├── app.js            <-- Ponto de Entrada / Inicialização
│   ├── router.js         <-- Lógica SPA (Roteamento de Hash)
│   ├── formValidation.js <-- Lógica de Validação e Consistência
│   ├── templates.js      <-- Templates HTML e Funções de Renderização
│   └── storage.js        <-- Abstração do LocalStorage
├── img/
└── index.html            <-- ÚNICA página HTML carregada (Host do SPA)

```