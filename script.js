// Modern UX/UI JavaScript for Escrita360
class ModernUX {
    constructor() {
               // Dropdown menu functionality
        const dropdowns = document.querySelectorAll('.dropdown');
        const overlay = document.querySelector('.dropdown-overlay');
        
        // Helper function to manage overlay
        const updateOverlay = () => {
            if (!overlay) return;
            
            const hasActiveEnhancedDropdown = document.querySelector('.dropdown.active .dropdown-content') !== null;
            
            if (hasActiveEnhancedDropdown) {
                overlay.style.opacity = '1';
                overlay.style.visibility = 'visible';
                overlay.style.pointerEvents = 'auto';
            } else {
                overlay.style.opacity = '0';
                overlay.style.visibility = 'hidden';
                overlay.style.pointerEvents = 'none';
            }
        };
        
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu') || dropdown.querySelector('.dropdown-content');
            
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
                    
                    // Update overlay based on current state
                    updateOverlay();
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
                
                // Update overlay
                updateOverlay();
            }
        });is.notebookAnimationRunning = false;
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupAnimations();
        this.setupPricingToggle();
        this.setupNotebookVisibilityDetection(); // Detectar quando hero fica visível
        this.setupNotebookAnimation();
        this.setupAccessibility();
        this.setupPerformance();
    }

    // Detectar quando a seção hero fica visível para iniciar animação
    setupNotebookVisibilityDetection() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) {
            console.warn('❌ Seção .hero não encontrada para detecção de visibilidade');
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('👁️ Seção hero ficou visível');
                    
                    // Aguardar um pouco e verificar se animação precisa ser iniciada
                    setTimeout(() => {
                        const animatedText = document.querySelector('.animated-text');
                        if (animatedText && !this.notebookAnimationRunning) {
                            console.log('🎬 Iniciando animação por detecção de visibilidade');
                            this.setupNotebookAnimation();
                        }
                    }, 1000);
                }
            });
        }, {
            threshold: 0.3 // Quando 30% da seção estiver visível
        });

        observer.observe(heroSection);
        console.log('👁️ Observer de visibilidade configurado para seção hero');
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

    // Enhanced notebook animation - VERSÃO COM CONTROLE POR HOVER
    setupNotebookAnimation() {
        console.log('🎭 Iniciando setup da animação do notebook com controle por hover...');
        
        // Prevenir múltiplas execuções
        if (this.notebookAnimationInitialized) {
            console.log('❌ Animação do notebook já foi inicializada');
            return;
        }

        const notebook = document.querySelector('.notebook');
        const animatedText = document.querySelector('.animated-text');
        const cursor = document.querySelector('.cursor');
        const hero = document.querySelector('.hero');
        
        // Verificações básicas
        if (!notebook) {
            console.warn('❌ Elemento .notebook não encontrado');
            return;
        }
        
        if (!animatedText) {
            console.warn('❌ Elemento .animated-text não encontrado');
            return;
        }

        if (!cursor) {
            console.warn('❌ Elemento .cursor não encontrado');
            return;
        }

        console.log('✅ Todos os elementos encontrados');
        
        // Marcar como inicializado
        this.notebookAnimationInitialized = true;
        this.notebookAnimationRunning = false;
        this.isHovering = false;

        const texts = [
            'A democracia no Brasil enfrenta desafios complexos...',
            'É fundamental analisarmos os impactos sociais...',
            'Portanto, a proposta de intervenção deve considerar...',
            'Em suma, é necessário que o Estado promova mudanças...',
            'Assim, podemos concluir que a educação é essencial...'
        ];

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isPaused = false;
        let animationId = null;

        const typeEffect = () => {
            // Só continuar se estiver em hover e não parado
            if (!this.isHovering || this.notebookAnimationStopped) {
                console.log('🛑 Animação pausada - hover:', this.isHovering);
                return;
            }

            // Verificar se elemento ainda existe
            if (!animatedText || !animatedText.parentElement) {
                console.warn('❌ Elemento animatedText removido do DOM');
                this.notebookAnimationRunning = false;
                return;
            }

            const currentText = texts[textIndex];
            
            if (isPaused) {
                isPaused = false;
                animationId = setTimeout(typeEffect, 400);
                return;
            }
            
            if (isDeleting) {
                animatedText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                animatedText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let speed = isDeleting ? 25 : 60;
            speed += Math.random() * 30;

            if (!isDeleting && charIndex === currentText.length) {
                speed = 2500; // Pausa para ler
                isDeleting = true;
                console.log(`📝 Texto completo: "${currentText}"`);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                speed = 600;
                isPaused = true;
                console.log(`🔄 Próximo texto: ${textIndex + 1}/${texts.length}`);
            }

            animationId = setTimeout(typeEffect, speed);
        };

        const startTyping = () => {
            if (this.notebookAnimationRunning) return;
            
            console.log('🚀 Iniciando animação de digitação por hover!');
            this.notebookAnimationRunning = true;
            
            // Garantir visibilidade do cursor
            cursor.style.display = 'inline-block';
            cursor.style.visibility = 'visible';
            cursor.style.opacity = '1';
            
            // Aguardar as animações CSS das linhas terminarem se necessário
            const delay = this.cssAnimationsCompleted ? 0 : 6800;
            
            setTimeout(() => {
                if (this.isHovering) {
                    typeEffect();
                }
            }, delay);
        };

        const stopTyping = () => {
            console.log('⏸️ Pausando animação de digitação');
            this.notebookAnimationRunning = false;
            
            if (animationId) {
                clearTimeout(animationId);
                animationId = null;
            }
        };

        const resetAnimation = () => {
            console.log('� Resetando animação');
            stopTyping();
            animatedText.textContent = '';
            textIndex = 0;
            charIndex = 0;
            isDeleting = false;
            isPaused = false;
        };

        // Event listeners para hover
        notebook.addEventListener('mouseenter', () => {
            console.log('🖱️ Mouse sobre notebook - iniciando animação');
            this.isHovering = true;
            
            // Adicionar classe visual para feedback
            notebook.classList.add('animation-active');
            
            // Iniciar digitação
            startTyping();
        });

        notebook.addEventListener('mouseleave', () => {
            console.log('🖱️ Mouse saiu do notebook - pausando animação');
            this.isHovering = false;
            
            // Remover classe visual
            notebook.classList.remove('animation-active');
            
            // Parar digitação
            stopTyping();
        });

        // Marcar que animações CSS foram completadas após delay
        setTimeout(() => {
            this.cssAnimationsCompleted = true;
            console.log('✅ Animações CSS das linhas completadas');
        }, 7000);

        // Tornar funções disponíveis globalmente para debug
        this.startTyping = startTyping;
        this.stopTyping = stopTyping;
        this.resetAnimation = resetAnimation;

        console.log('✅ Sistema de hover configurado para o notebook');
        console.log('🖱️ Passe o mouse sobre o notebook para iniciar a animação!');
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

// Initialize everything - VERSÃO MELHORADA
document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('🌟 Inicializando sistema Escrita360...');
        
        const modernUX = new ModernUX();
        
        // Tornar disponível globalmente para debug
        window.modernUXInstance = modernUX;
        
        setupFAQ();
        
        console.log('✅ Sistema inicializado com sucesso!');
        
        // Aguardar um pouco mais para garantir que todos os elementos estejam carregados
        setTimeout(() => {
            console.log('🔍 Verificando elementos para animação...');
            const animatedText = document.querySelector('.animated-text');
            const cursor = document.querySelector('.cursor');
            
            if (animatedText && cursor) {
                console.log('✅ Elementos encontrados, forçando inicialização da animação...');
                
                // Garantir que não há animação rodando
                modernUX.notebookAnimationRunning = false;
                modernUX.notebookAnimationStopped = false;
                
                // Inicializar animação
                modernUX.setupNotebookAnimation();
            } else {
                console.warn('⚠️ Elementos não encontrados:');
                console.warn('- animated-text:', animatedText);
                console.warn('- cursor:', cursor);
                
                // Tentar novamente após mais tempo
                setTimeout(() => {
                    console.log('🔄 Segunda tentativa de inicialização...');
                    modernUX.notebookAnimationRunning = false;
                    modernUX.setupNotebookAnimation();
                }, 5000);
            }
        }, 3000);
        
    } catch (error) {
        console.error('❌ Erro ao inicializar:', error);
    }
});

// Backup: tentar inicializar quando a página estiver completamente carregada
window.addEventListener('load', () => {
    setTimeout(() => {
        console.log('🔄 Backup: Verificando animação após load completo...');
        
        const modernUX = window.modernUXInstance;
        const animatedText = document.querySelector('.animated-text');
        
        if (modernUX && animatedText && (!animatedText.textContent || animatedText.textContent === '')) {
            console.log('🚀 Iniciando animação via backup...');
            modernUX.notebookAnimationRunning = false;
            modernUX.setupNotebookAnimation();
        }
    }, 2000);
});

// Global error handling
window.addEventListener('error', (e) => {
    console.warn('Non-critical error:', e.error);
});

// Função para debug rápido da página principal - VERSÃO HOVER
window.debugMainPageAnimation = function() {
    console.log('🔧 === DEBUG ANIMAÇÃO PÁGINA PRINCIPAL (HOVER) ===');
    
    // Verificar elementos
    const notebook = document.querySelector('.notebook');
    const animatedText = document.querySelector('.animated-text');
    const cursor = document.querySelector('.cursor');
    const hero = document.querySelector('.hero');
    const lines = document.querySelectorAll('.line-1, .line-2, .line-3, .line-4');
    
    console.log('📋 Elementos encontrados:');
    console.log('- Notebook:', notebook ? '✅' : '❌');
    console.log('- Hero section:', hero ? '✅' : '❌');
    console.log('- Animated text:', animatedText ? '✅' : '❌');
    console.log('- Cursor:', cursor ? '✅' : '❌');
    console.log('- Linhas (4 total):', lines.length);
    
    if (animatedText) {
        console.log('📝 Texto atual:', `"${animatedText.textContent}"`);
    }
    
    // Verificar se instância existe
    const modernUX = window.modernUXInstance;
    console.log('📦 ModernUX instance:', modernUX ? '✅' : '❌');
    
    if (modernUX) {
        console.log('🏃 Animation initialized:', modernUX.notebookAnimationInitialized);
        console.log('🏃 Animation running:', modernUX.notebookAnimationRunning);
        console.log('�️ Is hovering:', modernUX.isHovering);
        console.log('✅ CSS animations completed:', modernUX.cssAnimationsCompleted);
    }
    
    // Verificar eventos de hover
    if (notebook) {
        console.log('🖱️ Notebook tem cursor pointer:', window.getComputedStyle(notebook).cursor);
        console.log('🎨 Classes do notebook:', notebook.className);
    }
    
    console.log('💡 INSTRUÇÕES:');
    console.log('1. Passe o mouse SOBRE o notebook para iniciar');
    console.log('2. Retire o mouse para pausar');
    console.log('3. Execute forceStartHoverAnimation() para teste');
    
    return {
        notebook,
        animatedText,
        cursor,
        hero,
        lines,
        modernUX
    };
};

// Função para simular hover e forçar início da animação
window.forceStartHoverAnimation = function() {
    console.log('🖱️ Simulando hover no notebook...');
    
    const modernUX = window.modernUXInstance;
    const notebook = document.querySelector('.notebook');
    
    if (!modernUX) {
        console.error('❌ ModernUX instance não encontrada');
        return;
    }
    
    if (!notebook) {
        console.error('❌ Notebook não encontrado');
        return;
    }
    
    // Simular hover
    modernUX.isHovering = true;
    notebook.classList.add('animation-active');
    
    console.log('� Forçando início da animação...');
    
    if (modernUX.startTyping) {
        modernUX.startTyping();
    } else {
        console.warn('⚠️ Função startTyping não disponível');
    }
};

// Função para parar animação simulando mouse leave
window.forceStopHoverAnimation = function() {
    console.log('🖱️ Simulando saída do mouse...');
    
    const modernUX = window.modernUXInstance;
    const notebook = document.querySelector('.notebook');
    
    if (modernUX) {
        modernUX.isHovering = false;
        if (notebook) {
            notebook.classList.remove('animation-active');
        }
        
        if (modernUX.stopTyping) {
            modernUX.stopTyping();
        }
        
        console.log('⏸️ Animação pausada');
    }
};

// Função para forçar restart da animação na página principal
window.forceRestartMainAnimation = function() {
    console.log('🔄 Forçando restart da animação na página principal...');
    
    const modernUX = window.modernUXInstance;
    if (!modernUX) {
        console.error('❌ ModernUX instance não encontrada');
        return;
    }
    
    // Parar animação atual
    modernUX.notebookAnimationRunning = false;
    modernUX.notebookAnimationStopped = true;
    
    // Limpar texto
    const animatedText = document.querySelector('.animated-text');
    if (animatedText) {
        animatedText.textContent = '';
        console.log('🧹 Texto limpo');
    }
    
    // Restart após delay
    setTimeout(() => {
        console.log('� Reiniciando animação...');
        modernUX.notebookAnimationStopped = false;
        modernUX.notebookAnimationRunning = false;
        modernUX.setupNotebookAnimation();
    }, 1000);
};

// Função para forçar restart da animação
window.restartNotebookAnimation = function() {
    console.log('🔄 Forçando restart da animação...');
    
    // Parar animação atual
    const modernUX = window.modernUXInstance;
    if (modernUX) {
        modernUX.notebookAnimationRunning = false;
        modernUX.notebookAnimationStopped = true;
    }
    
    // Limpar texto
    const animatedText = document.querySelector('.animated-text');
    if (animatedText) {
        animatedText.textContent = '';
    }
    
    // Restart após delay
    setTimeout(() => {
        if (modernUX) {
            modernUX.notebookAnimationStopped = false;
            modernUX.notebookAnimationRunning = false;
            modernUX.setupNotebookAnimation();
        }
    }, 1000);
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