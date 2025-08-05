// Smooth scrolling para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efeito de scroll no header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Animação de escrita no caderno
const notebookTexts = [
    'Além disso, é fundamental que...',
    'A conclusão deve ser clara e...',
    'Portanto, podemos afirmar que...',
    'Em suma, a proposta de intervenção...',
    'Dessa forma, é possível concluir...'
];

let notebookTextIndex = 0;
let notebookCharIndex = 0;
let isNotebookDeleting = false;

function notebookTypeWriter() {
    const animatedText = document.querySelector('.animated-text');
    if (!animatedText) return;
    
    const currentText = notebookTexts[notebookTextIndex];
    
    if (isNotebookDeleting) {
        animatedText.textContent = currentText.substring(0, notebookCharIndex - 1);
        notebookCharIndex--;
    } else {
        animatedText.textContent = currentText.substring(0, notebookCharIndex + 1);
        notebookCharIndex++;
    }
    
    // Velocidade variável para simular escrita humana
    let typeSpeed = isNotebookDeleting ? 30 + Math.random() * 20 : 60 + Math.random() * 40;
    
    // Pausa extra em espaços e pontuação
    const currentChar = currentText[notebookCharIndex - 1];
    if (currentChar === ' ') typeSpeed += 50;
    if (currentChar === ',' || currentChar === '.') typeSpeed += 100;
    
    if (!isNotebookDeleting && notebookCharIndex === currentText.length) {
        typeSpeed = 3000; // Pausa mais longa para ler
        isNotebookDeleting = true;
    } else if (isNotebookDeleting && notebookCharIndex === 0) {
        isNotebookDeleting = false;
        notebookTextIndex = (notebookTextIndex + 1) % notebookTexts.length;
        typeSpeed = 800;
    }
    
    setTimeout(notebookTypeWriter, typeSpeed);
}

// Animação de entrada das linhas já escritas
function animateCompletedLines() {
    const completedLines = document.querySelectorAll('.line.completed');
    completedLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-10px)';
        
        setTimeout(() => {
            line.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            line.style.opacity = '0.8';
            line.style.transform = 'translateX(0)';
        }, index * 200);
    });
}

// Animação de typing no hero (mantendo a original)
const typingText = document.querySelector('.typing-text');
const texts = [
    'Analisando sua redação...',
    'Avaliando as 5 competências...',
    'Gerando feedback personalizado...',
    'Identificando pontos de melhoria...'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    if (!typingText) return;
    
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeWriter, typeSpeed);
}

// Iniciar animações
document.addEventListener('DOMContentLoaded', function() {
    // Animação das linhas já escritas no caderno
    setTimeout(animateCompletedLines, 500);
    
    // Animação de escrita no caderno
    setTimeout(notebookTypeWriter, 2000);
    
    // Animação de typing original (se existir o elemento)
    if (typingText) {
        setTimeout(typeWriter, 1000);
    }
});

// Animação de entrada dos elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animação aos elementos
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Contador animado para estatísticas
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    updateCounter();
}

// Ativar contadores quando visíveis
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.stat strong');
            stats.forEach(stat => {
                const text = stat.textContent;
                let target = 0;
                
                if (text.includes('k')) {
                    target = parseInt(text) * 1000;
                    stat.dataset.suffix = 'k+';
                } else if (text.includes('M')) {
                    target = parseInt(text) * 1000000;
                    stat.dataset.suffix = 'M+';
                } else if (text.includes('%')) {
                    target = parseInt(text);
                    stat.dataset.suffix = '%';
                } else {
                    target = parseInt(text);
                    stat.dataset.suffix = '+';
                }
                
                stat.textContent = '0';
                animateCounter(stat, target);
                
                // Adicionar sufixo após animação
                setTimeout(() => {
                    if (stat.dataset.suffix) {
                        stat.textContent += stat.dataset.suffix.replace('+', '+');
                    }
                }, 2000);
            });
            statsObserver.unobserve(entry.target);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
});

// Modal para demonstração (placeholder)
function showDemo() {
    alert('Demonstração em breve! Entre em contato para mais informações.');
}

// Event listeners para CTAs
document.addEventListener('DOMContentLoaded', function() {
    const demoButtons = document.querySelectorAll('button:contains("Ver Demonstração")');
    demoButtons.forEach(button => {
        if (button.textContent.includes('Ver Demonstração')) {
            button.addEventListener('click', showDemo);
        }
    });
    
    // Scroll suave para seções
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Efeito parallax suave no hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual && scrolled < window.innerHeight) {
        heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// FAQ accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Fechar todos os outros itens
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle do item atual
            item.classList.toggle('active');
        });
    });
});

// Lazy loading para melhor performance
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}