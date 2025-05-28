// Menu mobile
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Animação de entrada dos elementos
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.skill-card, .content');
hiddenElements.forEach((el) => observer.observe(el));

window.addEventListener('load', typeWriter);

// Scroll suave para as seções
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Controle de exibição dos projetos em cada skill-card
document.querySelectorAll('.show-projects-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const projectsList = btn.nextElementSibling;
        const isVisible = projectsList.style.display === 'block';
        
        if (isVisible) {
            projectsList.style.display = 'none';
            btn.textContent = 'Ver Projetos';
            projectsList.classList.remove('active');
        } else {
            projectsList.style.display = 'block';
            projectsList.classList.add('active');
            btn.textContent = 'Ocultar Projetos';
        }
    });
});

// Criar e adicionar o modal ao body
const modalHTML = `
    <div id="demo-modal" class="modal">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3 class="modal-title">Demonstração do Projeto</h3>
            <div class="demo-container">
                <iframe id="demo-frame" src=""></iframe>
            </div>
            <div class="demo-controls">
                <button class="btn-small" id="run-demo">Executar Demo</button>
                <button class="btn-small" id="reset-demo">Resetar</button>
            </div>
        </div>
    </div>
`;
document.body.insertAdjacentHTML('beforeend', modalHTML);

// Configurações das demos
const demos = {
    'jogo-velha': {
        title: 'Jogo da Velha',
        url: 'demos/jogo_velha.html'
    },
    'todo': {
        title: 'Gerenciador de Tarefas',
        url: 'demos/todo_list.html'
    },
    'imc': {
        title: 'Calculadora de IMC',
        url: 'demos/imc_calc.html'
    }
};

// Elementos do modal
const modal = document.getElementById('demo-modal');
const demoFrame = document.getElementById('demo-frame');
const closeModal = document.querySelector('.close-modal');
const runDemo = document.getElementById('run-demo');
const resetDemo = document.getElementById('reset-demo');

// Abrir modal de demonstração
document.querySelectorAll('.demo-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = btn.dataset.project;
        const demo = demos[projectId];
        
        if (demo) {
            modal.style.display = 'block';
            document.querySelector('.modal-title').textContent = demo.title;
            demoFrame.src = demo.url;
        }
    });
});

// Fechar modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    demoFrame.src = '';
});

// Fechar modal ao clicar fora
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        demoFrame.src = '';
    }
});

// Botões de controle
runDemo.addEventListener('click', () => {
    demoFrame.contentWindow.location.reload();
});

resetDemo.addEventListener('click', () => {
    demoFrame.src = demoFrame.src;
});
