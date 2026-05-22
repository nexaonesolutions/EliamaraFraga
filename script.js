/* ==========================================================================
   CENTRO ESTÉTICO ELIAMARA FRAGA | LUXURY CLINIC SPA
   LÓGICA E INTERAÇÕES DINÂMICAS DE LUXO (VANILLA JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // Sub-rotinas principais modularizadas em conformidade com altos padrões de Clean Code
    initNavbarScroll();
    initMobileDrawer();
    initFaqAccordion();
    initScrollReveal();

    /**
     * 1. Sub-rotina: Init Navbar Scroll Effect
     * Adiciona efeito visual de Glassmorphism à barra de navegação ao rolar a página.
     */
    function initNavbarScroll() {
        try {
            const navbar = document.getElementById('navbar');
            if (!navbar) {
                throw new Error("System Exception: Elemento '#navbar' não encontrado no DOM.");
            }
            
            const handleScroll = () => {
                try {
                    if (window.scrollY > 40) {
                        navbar.classList.add('scrolled', 'glassmorphism', 'py-3.5', 'border-b', 'border-luxury-champagne/10', 'shadow-sm');
                        navbar.classList.remove('py-5');
                    } else {
                        navbar.classList.remove('scrolled', 'glassmorphism', 'py-3.5', 'border-b', 'border-luxury-champagne/10', 'shadow-sm');
                        navbar.classList.add('py-5');
                    }
                } catch (scrollErr) {
                    console.error("System Exception no evento de scroll da navbar:", scrollErr);
                }
            };

            window.addEventListener('scroll', handleScroll);
            handleScroll(); // Verificação inicial ao carregar a página
            
        } catch (error) {
            console.error("Falha ao inicializar o scroll da navbar:", error.message);
        }
    }

    /**
     * 2. Sub-rotina: Init Mobile Drawer Navigation
     * Controla a abertura e fechamento do menu responsivo lateral (drawer).
     */
    function initMobileDrawer() {
        try {
            const menuToggle = document.getElementById('menu-toggle');
            const mobileDrawer = document.getElementById('mobile-drawer');
            const mobileLinks = document.querySelectorAll('.mobile-link');
            const bar1 = document.getElementById('bar1');
            const bar2 = document.getElementById('bar2');
            const bar3 = document.getElementById('bar3');
            
            if (!menuToggle || !mobileDrawer) {
                throw new Error("System Exception: Elementos de menu móvel ('#menu-toggle' ou '#mobile-drawer') ausentes no DOM.");
            }

            const toggleMenu = () => {
                try {
                    const isOpen = mobileDrawer.classList.contains('active');
                    if (isOpen) {
                        closeDrawer();
                    } else {
                        openDrawer();
                    }
                } catch (err) {
                    console.error("System Exception ao alternar estado do menu drawer:", err);
                }
            };

            const openDrawer = () => {
                mobileDrawer.classList.remove('right-[-100%]');
                mobileDrawer.classList.add('right-0', 'active');
                
                // Transição do Hamburger para "X"
                bar1.style.transform = 'translateY(6.5px) rotate(45deg)';
                bar2.style.opacity = '0';
                bar3.style.transform = 'translateY(-6.5px) rotate(-45deg)';
            };

            const closeDrawer = () => {
                mobileDrawer.classList.remove('right-0', 'active');
                mobileDrawer.classList.add('right-[-100%]');
                
                // Transição do "X" de volta para Hamburger
                bar1.style.transform = 'none';
                bar2.style.opacity = '1';
                bar3.style.transform = 'none';
            };

            menuToggle.addEventListener('click', toggleMenu);

            // Fecha o menu dinamicamente ao clicar em qualquer link de navegação
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    try {
                        closeDrawer();
                    } catch (err) {
                        console.error("System Exception ao fechar o menu drawer via link:", err);
                    }
                });
            });

        } catch (error) {
            console.error("Falha ao inicializar o drawer de navegação móvel:", error.message);
        }
    }

    /**
     * 3. Sub-rotina: Init Faq Accordion
     * Lógica de colapso automático para o FAQ com cálculo dinâmico de altura.
     */
    function initFaqAccordion() {
        try {
            const faqButtons = document.querySelectorAll('.faq-btn');
            if (faqButtons.length === 0) {
                throw new Error("System Exception: Nenhum elemento '.faq-btn' encontrado para o FAQ.");
            }

            faqButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    try {
                        const item = btn.closest('.border');
                        const answer = btn.nextElementSibling;
                        const icon = btn.querySelector('.faq-icon');
                        
                        if (!item || !answer || !icon) {
                            throw new Error("System Exception: Estrutura do item de FAQ corrompida.");
                        }

                        const isOpen = btn.getAttribute('aria-expanded') === 'true';

                        // Fecha todos os outros itens abertos para um visual minimalista e limpo
                        faqButtons.forEach(otherBtn => {
                            try {
                                if (otherBtn !== btn) {
                                    otherBtn.setAttribute('aria-expanded', 'false');
                                    otherBtn.nextElementSibling.style.maxHeight = null;
                                    otherBtn.querySelector('.faq-icon').style.transform = 'none';
                                    otherBtn.querySelector('.faq-icon').textContent = '+';
                                }
                            } catch (closeErr) {
                                console.error("System Exception ao auto-colapsar outros itens do FAQ:", closeErr);
                            }
                        });

                        // Alterna o estado do painel clicado
                        if (isOpen) {
                            btn.setAttribute('aria-expanded', 'false');
                            answer.style.maxHeight = null;
                            icon.style.transform = 'none';
                            icon.textContent = '+';
                        } else {
                            btn.setAttribute('aria-expanded', 'true');
                            // Define a altura real do scroll para a animação suave do CSS max-height
                            answer.style.maxHeight = answer.scrollHeight + 'px';
                            icon.style.transform = 'rotate(45deg)';
                            icon.textContent = '+'; // Mantém o caractere e rotaciona 45 graus para virar 'x'
                        }
                    } catch (itemError) {
                        console.error("Erro ao operar acordeão do FAQ:", itemError.message);
                    }
                });
            });

        } catch (error) {
            console.error("Falha ao inicializar o FAQ:", error.message);
        }
    }

    /**
     * 4. Sub-rotina: Init Scroll Reveal
     * Utiliza o Intersection Observer para disparar as animações ao rolar a tela.
     */
    function initScrollReveal() {
        try {
            const revealElements = document.querySelectorAll('.scroll-reveal');
            if (revealElements.length === 0) {
                return; // Sem elementos para revelar
            }

            // Configuração do Observador com margem confortável
            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    try {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('active');
                            // Remove o observador do elemento após ativado para otimizar desempenho e memória
                            observer.unobserve(entry.target);
                        }
                    } catch (entryErr) {
                        console.error("System Exception ao revelar elemento no scroll:", entryErr);
                    }
                });
            }, {
                threshold: 0.05,             // Elemento 5% visível na janela
                rootMargin: '0px 0px -20px 0px' // Dispara ligeiramente antes do elemento ficar totalmente visível
            });

            revealElements.forEach(el => {
                try {
                    revealObserver.observe(el);
                } catch (obsErr) {
                    console.error("System Exception ao iniciar observador de elemento individual:", obsErr);
                }
            });

        } catch (error) {
            console.error("Falha ao inicializar o Intersection Observer de Scroll Reveal:", error.message);
        }
    }

});
