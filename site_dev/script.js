// Tema escuro com persistência
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Verifica se há um tema salvo
const savedTheme = localStorage.getItem('theme') || 'light';
body.dataset.theme = savedTheme;
themeToggle.innerHTML = savedTheme === 'dark' 
    ? '<i class="fas fa-sun"></i>' 
    : '<i class="fas fa-moon"></i>';

themeToggle.addEventListener('click', () => {
    const newTheme = body.dataset.theme === 'dark' ? 'light' : 'dark';
    body.dataset.theme = newTheme;
    localStorage.setItem('theme', newTheme);
    
    themeToggle.innerHTML = newTheme === 'dark' 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
});

// Animação de scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animação de entrada dos elementos
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.stack-card, .resource-card').forEach((el) => {
    observer.observe(el);
});

// API do GitHub
async function fetchGithubProjects() {
    try {
        const username = 'seu-usuario-github'; // Substitua pelo seu usuário
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=6`);
        const projects = await response.json();

        const projectsContainer = document.querySelector('.github-projects');
        projectsContainer.innerHTML = '';

        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <h3>${project.name}</h3>
                <p>${project.description || 'Sem descrição disponível'}</p>
                <div class="project-stats">
                    <span><i class="fas fa-star"></i> ${project.stargazers_count}</span>
                    <span><i class="fas fa-code-branch"></i> ${project.forks_count}</span>
                </div>
                <a href="${project.html_url}" target="_blank" class="project-link">
                    Ver no GitHub <i class="fas fa-external-link-alt"></i>
                </a>
            `;
            projectsContainer.appendChild(projectCard);
        });
    } catch (error) {
        console.error('Erro ao carregar projetos:', error);
    }
}

// Carregar projetos ao iniciar
fetchGithubProjects();

// Efeito de parallax no hero
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero-image');
    const speed = 5;
    const x = (window.innerWidth - e.pageX * speed) / 100;
    const y = (window.innerHeight - e.pageY * speed) / 100;
    
    hero.style.transform = `translateX(${x}px) translateY(${y}px)`;
});

// Animação de digitação para elementos com classe typewriter
function startTypewriter() {
    const text = document.querySelector('.typewriter');
    const words = ['Explore o mundo do desenvolvimento web', 'Aprenda tecnologias modernas', 'Construa projetos incríveis'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const current = words[wordIndex];
        if (isDeleting) {
            text.textContent = current.substring(0, charIndex - 1);
            charIndex--;
        } else {
            text.textContent = current.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === current.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }

    type();
}

// Iniciar animação de digitação
startTypewriter();

// Navegação melhorada
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

// Função para atualizar link ativo baseado na seção visível
function updateActiveLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - sectionHeight/3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// Atualizar link ativo no scroll
window.addEventListener('scroll', updateActiveLink); 