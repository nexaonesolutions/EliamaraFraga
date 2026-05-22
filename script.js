/* ==========================================================================
   DRA. MARY CONCEIÇÃO | ESTÉTICA BIOMÉDICA
   LÓGICA E INTERAÇÕES DINÂMICAS DE LUXO (VANILLA JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // Sub-rotinas principais modularizadas em conformidade com altos padrões de Clean Code
    initNavbarScroll();
    initMobileDrawer();
    initSkinManagementTabs();
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
                    if (window.scrollY > 50) {
                        navbar.classList.add('scrolled');
                    } else {
                        navbar.classList.remove('scrolled');
                    }
                } catch (scrollErr) {
                    console.error("System Exception no evento de scroll:", scrollErr);
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
            
            if (!menuToggle || !mobileDrawer) {
                throw new Error("System Exception: Elementos de menu móvel ('#menu-toggle' ou '#mobile-drawer') ausentes no DOM.");
            }

            const toggleMenu = () => {
                try {
                    const isExpanded = menuToggle.classList.contains('active');
                    if (isExpanded) {
                        menuToggle.classList.remove('active');
                        mobileDrawer.classList.remove('active');
                    } else {
                        menuToggle.classList.add('active');
                        mobileDrawer.classList.add('active');
                    }
                } catch (err) {
                    console.error("System Exception ao alternar estado do menu drawer:", err);
                }
            };

            menuToggle.addEventListener('click', toggleMenu);

            // Fecha o menu dinamicamente ao clicar em qualquer link de navegação
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    try {
                        menuToggle.classList.remove('active');
                        mobileDrawer.classList.remove('active');
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
     * 3. Sub-rotina: Init Skin Management Tabs
     * Controla o componente interativo de fases do Gerenciamento de Pele.
     * Altera o conteúdo explicativo e atualiza a imagem ilustrativa com efeito suave.
     */
    function initSkinManagementTabs() {
        try {
            const tabs = document.querySelectorAll('.phase-tab');
            const phaseImage = document.getElementById('phase-image');
            
            if (tabs.length === 0) {
                throw new Error("System Exception: Nenhuma aba '.phase-tab' encontrada no DOM.");
            }
            if (!phaseImage) {
                throw new Error("System Exception: Elemento '#phase-image' ausente na seção científica.");
            }

            // Mapeamento das imagens premium por fase
            const phaseImages = {
                "1": "./assets/skin_science.png",  // Imagem científica
                "2": "./assets/clinic_lobby.png",  // Imagem do lobby da clínica
                "3": "./assets/dra_mary.png"       // Retrato da Dra. Mary (lapidação final)
            };

            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    try {
                        const targetPhase = tab.getAttribute('data-phase');
                        
                        // Validação de Regra de Negócio (Business Exception)
                        if (!targetPhase || !phaseImages[targetPhase]) {
                            throw new Error(`Business Exception: A fase selecionada '${targetPhase}' é inválida ou não possui imagem associada.`);
                        }

                        // Remove a classe ativa de todas as abas
                        tabs.forEach(t => t.classList.remove('active'));
                        
                        // Adiciona a classe ativa na aba selecionada
                        tab.classList.add('active');
                        
                        // Aplica transição de opacidade suave na troca de imagem
                        phaseImage.style.opacity = '0.2';
                        phaseImage.style.transform = 'scale(0.98)';
                        phaseImage.style.transition = 'all 0.3s ease';

                        // Troca o source da imagem após o início do fade-out
                        setTimeout(() => {
                            try {
                                phaseImage.src = phaseImages[targetPhase];
                                phaseImage.style.opacity = '1';
                                phaseImage.style.transform = 'scale(1)';
                            } catch (imgErr) {
                                console.error("System Exception ao carregar novo source de imagem:", imgErr);
                            }
                        }, 250);

                    } catch (businessError) {
                        console.warn(businessError.message);
                    }
                });
            });

        } catch (error) {
            console.error("Falha ao inicializar as abas de gerenciamento de pele:", error.message);
        }
    }

    /**
     * 4. Sub-rotina: Init Faq Accordion
     * Lógica de colapso automático para o FAQ com cálculo dinâmico de altura.
     */
    function initFaqAccordion() {
        try {
            const faqQuestions = document.querySelectorAll('.faq-question');
            if (faqQuestions.length === 0) {
                throw new Error("System Exception: Nenhum elemento '.faq-question' encontrado para o FAQ.");
            }

            faqQuestions.forEach(question => {
                question.addEventListener('click', () => {
                    try {
                        const faqItem = question.parentElement;
                        const faqAnswer = question.nextElementSibling;
                        
                        if (!faqItem || !faqAnswer) {
                            throw new Error("System Exception: Estrutura do item de FAQ corrompida.");
                        }

                        const isOpen = faqItem.classList.contains('active');

                        // Fecha todos os outros itens abertos para um visual minimalista e limpo
                        document.querySelectorAll('.faq-item').forEach(item => {
                            try {
                                if (item !== faqItem) {
                                    item.classList.remove('active');
                                    item.querySelector('.faq-answer').style.maxHeight = null;
                                }
                            } catch (closeErr) {
                                console.error("System Exception ao auto-colapsar item do FAQ:", closeErr);
                            }
                        });

                        // Alterna o estado do painel clicado
                        if (isOpen) {
                            faqItem.classList.remove('active');
                            faqAnswer.style.maxHeight = null;
                        } else {
                            faqItem.classList.add('active');
                            // Calcula e define a altura real da rolagem para a animação do max-height funcionar perfeitamente
                            faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
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
     * 5. Sub-rotina: Init Scroll Reveal
     * Utiliza o Intersection Observer para disparar as animações ao rolar a tela.
     */
    function initScrollReveal() {
        try {
            const revealElements = document.querySelectorAll('.scroll-reveal');
            if (revealElements.length === 0) {
                return; // Silencioso: sem elementos para revelar nesta rota
            }

            // Configuração do Observador com margem confortável
            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    try {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('active');
                            // Remove o observador do elemento para otimizar memória após renderizado
                            observer.unobserve(entry.target);
                        }
                    } catch (entryErr) {
                        console.error("System Exception ao revelar elemento no scroll:", entryErr);
                    }
                });
            }, {
                threshold: 0.08,             // Elemento 8% visível na janela
                rootMargin: '0px 0px -40px 0px' // Revela um pouco antes de atingir o topo visível
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
