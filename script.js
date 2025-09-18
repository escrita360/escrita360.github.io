// Modern UX/UI JavaScript for Escrita360
class ModernUX {
    constructor() {
               // Dropdown menu functionality
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            if (toggle && menu) {
                toggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    const isActive = dropdown.classList.contains('active');
                    
                    // Close all dropdowns
                    document.querySelectorAll('.dropdown').forEach(d => {
                        d.classList.remove('active');
                        d.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
                    });
                    
                    // Toggle current dropdown
                    if (!isActive) {
                        dropdown.classList.add('active');
                        toggle.setAttribute('aria-expanded', 'true');
                    }
                });
            }
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                    const toggle = dropdown.querySelector('.dropdown-toggle');
                    if (toggle) toggle.setAttribute('aria-expanded', 'false');
                });
            }
        });is.notebookAnimationRunning = false;
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupAnimations();
        this.setupPricingToggle();
        this.setupNotebookAnimation();
        this.setupAccessibility();
        this.setupPerformance();
    }

    // Modern Navigation with better UX
    setupNavigation() {
        const header = document.querySelector('.header');
        let lastScrollY = window.scrollY;
        let ticking = false;

        // Hamburger menu toggle
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                const isActive = navMenu.classList.contains('active');
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                navToggle.setAttribute('aria-expanded', !isActive);
                
                // Close menu when clicking outside
                if (!isActive) {
                    document.addEventListener('click', (e) => {
                        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                            navToggle.classList.remove('active');
                            navMenu.classList.remove('active');
                            navToggle.setAttribute('aria-expanded', 'false');
                        }
                    });
                }
            });
        }

        const updateHeader = () => {
            const scrollY = window.scrollY;
            
            if (scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Auto-hide header on scroll down, show on scroll up
            if (Math.abs(scrollY - lastScrollY) < 10) return;
            
            if (scrollY > lastScrollY && scrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = scrollY;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        });

        // Smooth scroll with better UX
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Modern scroll effects
    setupScrollEffects() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    fadeInObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Apply to elements
        document.querySelectorAll('.card, .feature-item, .stat').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            fadeInObserver.observe(el);
        });

        // Parallax effect (performance optimized)
        let parallaxTicking = false;
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const heroVisual = document.querySelector('.hero-visual');
            
            if (heroVisual && scrolled < window.innerHeight) {
                heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
            parallaxTicking = false;
        };

        window.addEventListener('scroll', () => {
            if (!parallaxTicking) {
                requestAnimationFrame(updateParallax);
                parallaxTicking = true;
            }
        });
    }

    // Enhanced animations
    setupAnimations() {
        // Stagger animations for grids
        const animateGrid = (selector, delay = 100) => {
            const items = document.querySelectorAll(selector);
            items.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                item.style.transition = `opacity 0.5s ease ${index * delay}ms, transform 0.5s ease ${index * delay}ms`;
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 200);
            });
        };

        // Apply to feature grids
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => animateGrid('.feature-card', 150), 500);
        });

        // Button hover effects with better performance
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.willChange = 'transform';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.willChange = 'auto';
            });
        });
    }

    // Pricing toggle with smooth transitions
    setupPricingToggle() {
        const toggle = document.getElementById('pricing-toggle');
        if (!toggle) return;

        toggle.addEventListener('change', function() {
            const monthlyElements = document.querySelectorAll('.amount.monthly');
            const yearlyElements = document.querySelectorAll('.amount.yearly');
            
            const fadeOut = (elements) => {
                elements.forEach(el => {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(-10px)';
                });
            };
            
            const fadeIn = (elements) => {
                setTimeout(() => {
                    elements.forEach(el => {
                        el.style.display = this.checked ? 'inline' : 'none';
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    });
                }, 150);
            };

            if (this.checked) {
                fadeOut(monthlyElements);
                fadeIn(yearlyElements);
                monthlyElements.forEach(el => el.style.display = 'none');
                yearlyElements.forEach(el => el.style.display = 'inline');
            } else {
                fadeOut(yearlyElements);
                fadeIn(monthlyElements);
                yearlyElements.forEach(el => el.style.display = 'none');
                monthlyElements.forEach(el => el.style.display = 'inline');
            }
        });
    }

    // Enhanced notebook animation
    setupNotebookAnimation() {
        // Prevenir múltiplas execuções
        if (this.notebookAnimationRunning) {
            console.log('Animação do notebook já está rodando');
            return;
        }

        // Aguardar um pouco para garantir que o DOM está pronto
        const initAnimation = () => {
            const animatedText = document.querySelector('.animated-text');
            const cursor = document.querySelector('.cursor');
            
            if (!animatedText) {
                console.warn('Elemento .animated-text não encontrado');
                return false;
            }

            // Verificar se já há animação rodando
            if (animatedText.textContent && animatedText.textContent.length > 0) {
                console.log('Animação já está ativa, pulando inicialização');
                return true;
            }

            console.log('Elemento .animated-text encontrado, iniciando animação');

            // Marcar que a animação está rodando
            this.notebookAnimationRunning = true;

            const texts = [
                'A democracia no Brasil enfrenta desafios...',
                'É fundamental analisarmos os impactos sociais...',
                'Portanto, a proposta de intervenção deve...',
                'Em suma, é necessário que o Estado promova...'
            ];

            let textIndex = 0;
            let charIndex = 0;
            let isDeleting = false;

            const typeEffect = () => {
                if (!animatedText) return;

                const currentText = texts[textIndex];
                
                if (isDeleting) {
                    animatedText.textContent = currentText.substring(0, charIndex - 1);
                    charIndex--;
                } else {
                    animatedText.textContent = currentText.substring(0, charIndex + 1);
                    charIndex++;
                }

                let speed = isDeleting ? 50 : 100;
                speed += Math.random() * 30;

                if (!isDeleting && charIndex === currentText.length) {
                    speed = 2500; // Pausa mais longa para ler
                    isDeleting = true;
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                    speed = 800; // Pausa antes do próximo texto
                }

                setTimeout(typeEffect, speed);
            };

            // Garantir que o cursor esteja visível
            if (cursor) {
                cursor.style.display = 'inline-block';
                cursor.style.visibility = 'visible';
            }

            // Detectar se é dispositivo móvel para ajustar timing
            const isMobile = window.innerWidth <= 480;
            const delay = isMobile ? 2200 : 3200; // Timing mais rápido no mobile
            
            // Iniciar a animação de digitação após as outras linhas aparecerem
            setTimeout(typeEffect, delay);
            return true;
        };

        // Tentar inicializar múltiplas vezes
        let attempts = 0;
        const maxAttempts = 10;
        
        const tryInit = () => {
            attempts++;
            if (initAnimation()) {
                console.log('Animação do notebook iniciada com sucesso');
                return;
            }
            
            if (attempts < maxAttempts) {
                setTimeout(tryInit, 200);
            } else {
                console.warn('Falha ao iniciar animação do notebook após', maxAttempts, 'tentativas');
                this.notebookAnimationRunning = false; // Reset em caso de falha
            }
        };

        // Iniciar as tentativas
        setTimeout(tryInit, 500);
    }

    // Accessibility improvements
    setupAccessibility() {
        // Keyboard navigation for custom components
        document.querySelectorAll('.btn, .nav-menu a').forEach(element => {
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    element.click();
                }
            });
        });

        // Focus trap for modals (if any)
        const trapFocus = (element) => {
            const focusableElements = element.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];

            element.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstFocusable) {
                            lastFocusable.focus();
                            e.preventDefault();
                        }
                    } else {
                        if (document.activeElement === lastFocusable) {
                            firstFocusable.focus();
                            e.preventDefault();
                        }
                    }
                }
            });
        };

        // Reduce motion for users who prefer it
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--transition-fast', '0.01ms');
            document.documentElement.style.setProperty('--transition-base', '0.01ms');
            document.documentElement.style.setProperty('--transition-slow', '0.01ms');
        }

        // Announce dynamic content changes to screen readers
        const announceToScreenReader = (message) => {
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.className = 'sr-only';
            announcement.textContent = message;
            document.body.appendChild(announcement);
            
            setTimeout(() => {
                document.body.removeChild(announcement);
            }, 1000);
        };

        // Example usage for pricing toggle
        const pricingToggle = document.getElementById('pricing-toggle');
        if (pricingToggle) {
            pricingToggle.addEventListener('change', () => {
                const period = pricingToggle.checked ? 'anual' : 'mensal';
                announceToScreenReader(`Preços alterados para cobrança ${period}`);
            });
        }
    }

    // Performance optimizations
    setupPerformance() {
        // Lazy loading for images
        if ('loading' in HTMLImageElement.prototype) {
            document.querySelectorAll('img[data-src]').forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        } else {
            // Fallback for older browsers
            const lazyImageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        lazyImageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                lazyImageObserver.observe(img);
            });
        }

        // Preload critical resources
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.href = 'https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap';
        preloadLink.as = 'style';
        document.head.appendChild(preloadLink);

        // Service Worker for offline functionality (future enhancement)
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .catch(() => {
                        // Service worker not available, that's okay
                    });
            });
        }
    }
}

// FAQ functionality
const setupFAQ = () => {
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                document.querySelectorAll('.faq-item').forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
};

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    try {
        const modernUX = new ModernUX();
        setupFAQ();
        
        // Verificação adicional para animação do notebook (sem criar nova instância)
        setTimeout(() => {
            const animatedText = document.querySelector('.animated-text');
            if (animatedText && animatedText.textContent === '') {
                console.log('Tentando reiniciar animação do notebook...');
                // Reutilizar a instância existente ao invés de criar uma nova
                modernUX.setupNotebookAnimation();
            }
        }, 3000);
        
    } catch (error) {
        console.warn('Erro ao inicializar:', error);
    }
});

// Global error handling
window.addEventListener('error', (e) => {
    console.warn('Non-critical error:', e.error);
});

// Função para testar a animação manualmente
window.testNotebookAnimation = function() {
    console.log('Testando animação do notebook...');
    const animatedText = document.querySelector('.animated-text');
    const cursor = document.querySelector('.cursor');
    
    console.log('Elemento .animated-text:', animatedText);
    console.log('Elemento .cursor:', cursor);
    
    if (animatedText) {
        // Parar qualquer animação existente temporariamente
        const originalText = animatedText.textContent;
        animatedText.textContent = 'Teste de animação funcionando!';
        console.log('Texto definido com sucesso');
        
        // Restaurar após 3 segundos
        setTimeout(() => {
            animatedText.textContent = originalText;
            console.log('Texto original restaurado');
        }, 3000);
    } else {
        console.error('Elemento .animated-text não encontrado!');
    }
};

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const navigation = performance.getEntriesByType('navigation')[0];
            if (navigation.loadEventEnd > 3000) {
                console.info('Page load time could be improved');
            }
            
            // Verificar se a animação do notebook está funcionando
            setTimeout(() => {
                const animatedText = document.querySelector('.animated-text');
                if (animatedText && animatedText.textContent.length > 0) {
                    console.log('✅ Animação do notebook está funcionando');
                } else {
                    console.warn('⚠️ Animação do notebook pode não estar funcionando');
                    console.log('Execute window.testNotebookAnimation() no console para testar');
                }
            }, 5000);
        }, 0);
    });
}