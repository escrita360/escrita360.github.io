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
        });

        // Close dropdown when clicking "Ver Todos os Recursos" button
        document.addEventListener('click', (e) => {
            if (e.target.closest('.dropdown-link-primary')) {
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                    const toggle = dropdown.querySelector('.dropdown-toggle');
                    if (toggle) toggle.setAttribute('aria-expanded', 'false');
                });
                
                // Update overlay
                updateOverlay();
            }
        });
        
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupAnimations();
        this.setupPricingToggle();
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

// Carrossel da demonstração
class DemoCarousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = [
            'Dashboard do Estudante',
            'Módulo de Escrita',
            'Painel de Sentimentos',
            'Dashboard do Professor',
            'Relatórios e Analytics'
        ];
        this.totalSlides = this.slides.length;
        this.autoPlayInterval = null;
        this.init();
    }

    init() {
        this.setupControls();
        this.setupIndicators();
        this.startAutoPlay();
    }

    setupControls() {
        const prevBtn = document.querySelector('.carousel-prev');
        const nextBtn = document.querySelector('.carousel-next');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.stopAutoPlay();
                this.previousSlide();
                this.startAutoPlay();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.stopAutoPlay();
                this.nextSlide();
                this.startAutoPlay();
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (document.querySelector('.demo-carousel')) {
                if (e.key === 'ArrowLeft') {
                    this.stopAutoPlay();
                    this.previousSlide();
                    this.startAutoPlay();
                } else if (e.key === 'ArrowRight') {
                    this.stopAutoPlay();
                    this.nextSlide();
                    this.startAutoPlay();
                }
            }
        });
    }

    setupIndicators() {
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.stopAutoPlay();
                this.goToSlide(index);
                this.startAutoPlay();
            });
        });
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarousel();
    }

    previousSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateCarousel();
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateCarousel();
    }

    updateCarousel() {
        // Update indicators
        document.querySelectorAll('.indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });

        // Update content
        document.querySelectorAll('.demo-content').forEach((content, index) => {
            content.classList.toggle('active', index === this.currentSlide);
        });

        // Update images
        document.querySelectorAll('.carousel-img').forEach((img, index) => {
            img.classList.toggle('active', index === this.currentSlide);
        });

        // Announce change to screen readers
        this.announceSlideChange();
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Change slide every 5 seconds
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    announceSlideChange() {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = `Slide ${this.currentSlide + 1} de ${this.totalSlides}: ${this.slides[this.currentSlide]}`;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    // Pause autoplay when user hovers over carousel
    pauseOnHover() {
        const carousel = document.querySelector('.demo-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
            carousel.addEventListener('mouseleave', () => this.startAutoPlay());
        }
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('🌟 Inicializando sistema Escrita360...');
        
        const modernUX = new ModernUX();
        
        // Initialize demo carousel if demo section exists
        if (document.querySelector('.demo-carousel')) {
            const carousel = new DemoCarousel();
            carousel.pauseOnHover();
            window.carouselInstance = carousel; // For debugging
        }
        
        // Initialize benefits carousel
        if (document.querySelector('.benefits-carousel')) {
            const benefitsCarousel = new BenefitsCarousel();
            window.benefitsCarouselInstance = benefitsCarousel; // For debugging
            console.log('🎠 Carrossel de benefícios inicializado!');
        }
        
        // Tornar disponível globalmente para debug
        window.modernUXInstance = modernUX;
        
        setupFAQ();
        
        console.log('✅ Sistema inicializado com sucesso!');
        
    } catch (error) {
        console.error('❌ Erro ao inicializar:', error);
    }
});

// Carrossel de Benefícios - Dynamic Album Style
class BenefitsCarousel {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 6;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 7000; // 7 segundos
        this.isTransitioning = false;
        this.init();
    }

    init() {
        this.setupControls();
        this.setupIndicators();
        this.setupKeyboardNavigation();
        this.setupTouchNavigation();
        this.startAutoPlay();
        this.setupHoverPause();
        this.updateCarousel();
    }

    setupControls() {
        // Controles de navegação removidos - agora apenas hover nos indicadores
    }

    setupIndicators() {
        const indicators = document.querySelectorAll('.benefits-carousel .indicator');
        indicators.forEach((indicator, index) => {
            // Click navigation
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
            });
            
            // Hover navigation for album-like experience
            indicator.addEventListener('mouseenter', () => {
                // Small delay to avoid rapid changes
                this.hoverTimeout = setTimeout(() => {
                    this.goToSlide(index);
                }, 300);
            });
            
            indicator.addEventListener('mouseleave', () => {
                if (this.hoverTimeout) {
                    clearTimeout(this.hoverTimeout);
                    this.hoverTimeout = null;
                }
            });
        });
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (!document.querySelector('.benefits-carousel:hover')) return;
            
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.previousSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.nextSlide();
            } else if (e.key >= '1' && e.key <= '6') {
                e.preventDefault();
                this.goToSlide(parseInt(e.key) - 1);
            }
        });
    }

    setupTouchNavigation() {
        const carousel = document.querySelector('.carousel-container');
        if (!carousel) return;

        let startX = 0;
        let endX = 0;

        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });

        carousel.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
        }, { passive: true });

        carousel.addEventListener('touchend', () => {
            const threshold = 50;
            const diff = startX - endX;

            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }
        });
    }

    setupHoverPause() {
        const carousel = document.querySelector('.benefits-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => {
                this.stopAutoPlay();
            });

            carousel.addEventListener('mouseleave', () => {
                this.startAutoPlay();
            });
        }
    }

    nextSlide() {
        if (this.isTransitioning) return;
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarousel();
        this.restartAutoPlay();
    }

    previousSlide() {
        if (this.isTransitioning) return;
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateCarousel();
        this.restartAutoPlay();
    }

    goToSlide(index) {
        if (this.isTransitioning || index === this.currentSlide) return;
        this.currentSlide = index;
        this.updateCarousel();
        this.restartAutoPlay();
    }

    updateCarousel() {
        this.isTransitioning = true;

        // Update slides
        document.querySelectorAll('.carousel-slide').forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentSlide);
        });

        // Update indicators
        document.querySelectorAll('.benefits-carousel .indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });

        // No need to transform track since we use absolute positioning

        // Announce to screen readers
        this.announceSlideChange();

        // Reset transition flag after animation
        setTimeout(() => {
            this.isTransitioning = false;
        }, 600);
    }

    startAutoPlay() {
        this.stopAutoPlay(); // Clear any existing interval
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    restartAutoPlay() {
        this.stopAutoPlay();
        setTimeout(() => {
            this.startAutoPlay();
        }, 2000); // Restart after 2 seconds
    }

    announceSlideChange() {
        const slideNames = [
            'Escrita Autorregulada no Centro',
            'Imersão total com Análise Integrada em Tempo Real',
            'Painel de Sentimentos',
            'Uso de rubricas e evolução por níveis',
            'IA como Assistente',
            'Metodologia Validada Academicamente'
        ];

        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = `Slide ${this.currentSlide + 1} de ${this.totalSlides}: ${slideNames[this.currentSlide]}`;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            if (document.body.contains(announcement)) {
                document.body.removeChild(announcement);
            }
        }, 1000);
    }

    // Method for debugging
    getCurrentSlide() {
        return {
            current: this.currentSlide,
            total: this.totalSlides,
            isAutoPlaying: !!this.autoPlayInterval
        };
    }
}

// Global error handling
window.addEventListener('error', (e) => {
    console.warn('Non-critical error:', e.error);
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const navigation = performance.getEntriesByType('navigation')[0];
            if (navigation.loadEventEnd > 3000) {
                console.info('Page load time could be improved');
            }
        }, 0);
    });
}

