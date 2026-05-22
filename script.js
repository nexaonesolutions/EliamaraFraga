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
    initThemeToggle();
    initCollagenSimulator();
    initEstheticQuiz();

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
                        const answer = btn.nextElementSibling;
                        const icon = btn.querySelector('.faq-icon');
                        
                        if (!answer || !icon) {
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

    /**
     * 5. Sub-rotina: Init Theme Toggle System
     * Controla a alternância sem interrupções entre o modo Pristine Off-White (#FAFAFA)
     * e o modo Midnight Onyx (#121212), persistindo a preferência do usuário.
     */
    function initThemeToggle() {
        try {
            const toggleBtn = document.getElementById('theme-toggle');
            const toggleBtnMobile = document.getElementById('theme-toggle-mobile');

            const themeSun = document.getElementById('theme-sun');
            const themeMoon = document.getElementById('theme-moon');

            const themeSunMobile = document.getElementById('theme-sun-mobile');
            const themeMoonMobile = document.getElementById('theme-moon-mobile');
            const themeTextMobile = document.getElementById('theme-text-mobile');

            if (!toggleBtn && !toggleBtnMobile) {
                throw new Error("System Exception: Elementos de alternância de tema ausentes no DOM.");
            }

            const applyTheme = (isOnyx) => {
                try {
                    if (isOnyx) {
                        document.body.classList.add('theme-onyx');
                        
                        // Atualiza ícones desktop
                        if (themeSun) themeSun.classList.remove('hidden');
                        if (themeMoon) themeMoon.classList.add('hidden');
                        
                        // Atualiza ícones/texto mobile
                        if (themeSunMobile) themeSunMobile.classList.remove('hidden');
                        if (themeMoonMobile) themeMoonMobile.classList.add('hidden');
                        if (themeTextMobile) themeTextMobile.textContent = 'Modo Pristine Off-White';
                        
                        localStorage.setItem('theme', 'onyx');
                    } else {
                        document.body.classList.remove('theme-onyx');
                        
                        // Atualiza ícones desktop
                        if (themeSun) themeSun.classList.add('hidden');
                        if (themeMoon) themeMoon.classList.remove('hidden');
                        
                        // Atualiza ícones/texto mobile
                        if (themeSunMobile) themeSunMobile.classList.add('hidden');
                        if (themeMoonMobile) themeMoonMobile.classList.remove('hidden');
                        if (themeTextMobile) themeTextMobile.textContent = 'Modo Midnight Onyx';
                        
                        localStorage.setItem('theme', 'offwhite');
                    }
                } catch (applyErr) {
                    console.error("System Exception na rotina applyTheme:", applyErr);
                }
            };

            // Event Listeners para Desktop e Mobile com tratamento resiliente
            if (toggleBtn) {
                toggleBtn.addEventListener('click', () => {
                    try {
                        const isOnyx = document.body.classList.contains('theme-onyx');
                        applyTheme(!isOnyx);
                    } catch (clickErr) {
                        console.error("System Exception no clique do botão de tema desktop:", clickErr);
                    }
                });
            }

            if (toggleBtnMobile) {
                toggleBtnMobile.addEventListener('click', () => {
                    try {
                        const isOnyx = document.body.classList.contains('theme-onyx');
                        applyTheme(!isOnyx);
                    } catch (clickErr) {
                        console.error("System Exception no clique do botão de tema móvel:", clickErr);
                    }
                });
            }

            // Inicialização baseada no LocalStorage ou preferência do sistema
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'onyx') {
                applyTheme(true);
            } else if (savedTheme === 'offwhite') {
                applyTheme(false);
            } else {
                // Padrão de fábrica: Pristine Off-White (falso para Onyx)
                applyTheme(false);
            }

        } catch (error) {
            console.error("Falha ao inicializar o controle de temas:", error.message);
        }
    }

    /**
     * 6. Sub-rotina: Init Simulador Clínico de Colágeno
     * Calcula dinamicamente a perda de colágeno (1% ao ano a partir dos 25 anos)
     * e projeta a resposta de tratamento regenerativo com bioestimuladores em 30, 90 e 180 dias.
     */
    function initCollagenSimulator() {
        try {
            const ageSlider = document.getElementById('age-slider');
            const ageDisplay = document.getElementById('age-display');
            const collagenLoss = document.getElementById('collagen-loss');
            const collagenIndex = document.getElementById('collagen-index');
            const collagenProgress = document.getElementById('collagen-progress');
            const sim30d = document.getElementById('sim-30d');
            const sim90d = document.getElementById('sim-90d');
            const sim180d = document.getElementById('sim-180d');
            const btnSimCta = document.getElementById('btn-sim-cta');

            if (!ageSlider || !ageDisplay || !collagenLoss || !collagenIndex || !collagenProgress) {
                throw new Error("System Exception: Componentes essenciais do simulador ausentes no DOM.");
            }

            const updateSimulator = () => {
                try {
                    const age = parseInt(ageSlider.value, 10);
                    
                    // Validação de happy path
                    if (isNaN(age) || age < 25 || age > 70) {
                        throw new Error("Business Exception: Valor de idade fora do intervalo clínico válido (25-70).");
                    }

                    // Atualiza exibição de idade no slider
                    ageDisplay.textContent = `${age} anos`;

                    // Cálculo fisiológico: 1% de perda ao ano após os 25 anos
                    const loss = age - 25;
                    const index = 100 - loss;

                    // Atualiza painéis numéricos
                    collagenLoss.textContent = `-${loss}%`;
                    collagenIndex.textContent = `${index}%`;

                    // Atualiza a barra de progresso do índice dermal
                    collagenProgress.style.width = `${index}%`;

                    // Projeta regeneração com base na reatividade celular e idade do paciente
                    // Pacientes mais maduros demonstram maior delta percentual em tratamentos de alta intensidade
                    const clinicalFactor = 1 + (loss * 0.005);
                    const calc30d = Math.round(12 * clinicalFactor);
                    const calc90d = Math.round(35 * clinicalFactor);
                    const calc180d = Math.round(78 * clinicalFactor);

                    if (sim30d) sim30d.textContent = `+${calc30d}% colágeno`;
                    if (sim90d) sim90d.textContent = `+${calc90d}% colágeno`;
                    if (sim180d) sim180d.textContent = `+${calc180d}% colágeno`;

                    // Atualiza o link do WhatsApp para conversão de altíssimo nível (Lead Qualificado)
                    if (btnSimCta) {
                        const message = `Olá Dra. Eliamara! Fiz a simulação científica de colágeno no site. Minha idade é de ${age} anos. Meu Índice Dermal estimado é de ${index}% (perda de ${loss}%). Gostaria de agendar uma consulta para o meu Protocolo de Bioestimulação de Colágeno personalizado!`;
                        btnSimCta.href = `https://wa.me/5544999999999?text=${encodeURIComponent(message)}`;
                    }

                } catch (calcErr) {
                    console.error("Erro interno no processamento do Simulador Clínico:", calcErr.message);
                }
            };

            // Vincula o evento dinâmico de input para arrasto responsivo
            ageSlider.addEventListener('input', updateSimulator);
            
            // Inicializa com o valor padrão do HTML
            updateSimulator();

        } catch (error) {
            console.error("Falha ao inicializar o Simulador de Colágeno:", error.message);
        }
    }

    /**
     * 7. Sub-rotina: Init Quiz de Protocolo Personalizado
     * Lógica de questionário multi-etapas que entrega um diagnóstico e indicação
     * de tratamento exclusivo, gerando leads premium ultra-qualificados.
     */
    function initEstheticQuiz() {
        try {
            const quizContainer = document.getElementById('quiz-container');
            const stepTitle = document.getElementById('quiz-step-title');
            const progressBar = document.getElementById('quiz-progress-bar');
            
            const stepCards = [
                document.getElementById('quiz-step-1'),
                document.getElementById('quiz-step-2'),
                document.getElementById('quiz-step-3'),
                document.getElementById('quiz-result-screen')
            ];

            const btnPrev = document.getElementById('btn-quiz-prev');
            const btnNext = document.getElementById('btn-quiz-next');
            const btnRestart = document.getElementById('btn-quiz-restart');
            const btnCta = document.getElementById('btn-quiz-cta');

            const recommendedTitle = document.getElementById('quiz-recommended-title');
            const recommendedDesc = document.getElementById('quiz-recommended-desc');

            if (!quizContainer || stepCards.some(card => !card) || !btnPrev || !btnNext || !btnRestart || !btnCta) {
                throw new Error("System Exception: Estrutura do Quiz Estético incompleta no DOM.");
            }

            // Estado interno do Quiz
            let currentStep = 1; // 1, 2, 3 ou 4 (tela de resultados)
            const answers = {
                concern: null,
                age: null,
                goal: null
            };

            // Mapeamentos para conversão textual elegante no WhatsApp
            const labels = {
                concern: {
                    'rugas': 'Rugas e Linhas de Expressão',
                    'flacidez': 'Flacidez e Firmeza da Pele',
                    'labios': 'Volume/Hidratação Labial',
                    'contorno': 'Simetria/Contorno Facial'
                },
                age: {
                    '20-35': '20 a 35 anos',
                    '36-50': '36 a 50 anos',
                    '50+': 'Acima de 50 anos'
                },
                goal: {
                    'previsao': 'Prevenção ativa e hidratação',
                    'volume': 'Volume rápido e projeção',
                    'natural': 'Rejuvenescimento natural gradual',
                    'lifting': 'Lifting tridimensional profunda'
                }
            };

            // Atualiza a interface gráfica do Quiz (Slides, Rodapé, Título)
            const renderQuiz = () => {
                try {
                    // Remove estado ativo de todos os cards
                    stepCards.forEach(card => card.classList.remove('active'));

                    // Adiciona estado ativo ao card atual
                    stepCards[currentStep - 1].classList.add('active');

                    // Gerencia visibilidade da barra de progresso e textos superiores
                    if (currentStep <= 3) {
                        if (stepTitle) stepTitle.textContent = `Etapa ${currentStep} de 3`;
                        if (progressBar) {
                            progressBar.style.width = `${(currentStep / 3) * 100}%`;
                        }
                        
                        // Habilita/Desabilita navegação
                        btnPrev.disabled = currentStep === 1;
                        
                        // Verifica se a etapa atual possui resposta selecionada
                        let hasAnswer = false;
                        if (currentStep === 1 && answers.concern) hasAnswer = true;
                        if (currentStep === 2 && answers.age) hasAnswer = true;
                        if (currentStep === 3 && answers.goal) hasAnswer = true;
                        
                        btnNext.disabled = !hasAnswer;
                        btnNext.textContent = 'Próximo';
                        btnNext.classList.remove('hidden');
                        
                        // Mostra rodapé de navegação se estiver oculto
                        const navFooter = document.getElementById('quiz-nav-footer');
                        if (navFooter) navFooter.classList.remove('hidden');
                    } else {
                        // Tela de resultados
                        if (stepTitle) stepTitle.textContent = 'Diagnóstico Clínico Recomendado';
                        if (progressBar) {
                            progressBar.style.width = '100%';
                        }
                        
                        // Oculta rodapé de navegação tradicional
                        const navFooter = document.getElementById('quiz-nav-footer');
                        if (navFooter) navFooter.classList.add('hidden');
                        
                        // Calcula e renderiza o protocolo ideal
                        calculateResult();
                    }
                } catch (renderErr) {
                    console.error("System Exception na renderização do Quiz:", renderErr);
                }
            };

            // Regra de Negócio Clínico: Mapeamento de Protocolos de Luxo
            const calculateResult = () => {
                try {
                    let title = "Protocolo Exclusivo Eliamara Fraga Tailored";
                    let desc = "Uma abordagem sofisticada e de alta precisão que integra bioestimuladores de colágeno de alta pureza e hidratação celular molecular para restaurar o brilho e a firmeza da sua derme de maneira personalizada.";

                    const { concern, age, goal } = answers;

                    // Decisões baseadas nas respostas do Lead
                    if (concern === 'labios') {
                        title = "Protocolo Lip Gloss & Contour de Haute Précision";
                        desc = "Uma combinação de preenchimento labial refinado com ácido hialurônico premium suíço e hidratação profunda e volumização sutil (Skinbooster) para redesenhar o contorno, rejuvenescer rugas periorais e reter o brilho de seda.";
                    } 
                    else if (concern === 'flacidez' && (age === '50+' || goal === 'lifting')) {
                        title = "Lifting Biomimético Sculpt & Lift";
                        desc = "Combinação clínica sinérgica de Bioestimuladores de Colágeno (Radiesse/Sculptra) com Ultraformer III micro e macrofocado, gerando alta ancoragem muscular facial e redefinição dos ângulos sem intervenção cirúrgica.";
                    } 
                    else if (concern === 'flacidez') {
                        title = "Protocolo Collagen Booster Advanced";
                        desc = "Terapia intensiva com bioestimuladores puros, restaurando a firmeza estrutural, melhorando a espessura da pele e rejuvenescendo a matriz extracelular para deter o envelhecimento fisiológico com elegância.";
                    } 
                    else if (concern === 'rugas' && age === '20-35') {
                        title = "Protocolo Preventivo Baby Botox & Skin Management";
                        desc = "Aplicação preventiva ultra-sutil de toxina botulínica premium para suavizar dinâmicas musculares antes que se tornem estáticas, acompanhado de peeling francês iluminador.";
                    } 
                    else if (concern === 'rugas') {
                        title = "Harmonização de Linhas e Sulcos Full Face";
                        desc = "Abordagem tridimensional associando toxina botulínica de alta performance para controle de linhas dinâmicas e preenchimento de sulcos faciais (como bigode chinês) para conferir aspecto descansado e rejuvenescido.";
                    } 
                    else if (concern === 'contorno') {
                        title = "Protocolo Contour 3D Sculpt & Profile";
                        desc = "Escultura precisa dos principais vetores de sustentação facial (malar, mandíbula e mento) com ácido hialurônico de alta viscosidade estrutural, projetando beleza de perfil incomparável.";
                    }

                    // Renderiza o resultado no HTML
                    if (recommendedTitle) recommendedTitle.textContent = title;
                    if (recommendedDesc) recommendedDesc.textContent = desc;

                    // Constrói a mensagem personalizada do WhatsApp
                    const wppConcern = labels.concern[concern] || concern;
                    const wppAge = labels.age[age] || age;
                    const wppGoal = labels.goal[goal] || goal;
                    
                    const message = `Olá Dra. Eliamara! Fiz o Quiz de Protocolo Clínico no site. Minha queixa é: ${wppConcern}, Faixa etária: ${wppAge}, Objetivo principal: ${wppGoal}. Meu resultado recomendado foi o *${title}*. Gostaria de agendar uma consulta para avaliarmos este protocolo!`;
                    
                    if (btnCta) {
                        btnCta.href = `https://wa.me/5544999999999?text=${encodeURIComponent(message)}`;
                    }

                } catch (calcErr) {
                    console.error("Erro interno no cálculo clínico de diagnóstico do Quiz:", calcErr);
                }
            };

            // Gerencia eventos de clique nos botões de opções
            stepCards.forEach((card, index) => {
                if (index === 3) return; // Pula a tela de resultados
                
                const options = card.querySelectorAll('.quiz-option');
                options.forEach(opt => {
                    opt.addEventListener('click', () => {
                        try {
                            // Remove seleção das demais opções deste card
                            options.forEach(o => o.classList.remove('selected'));
                            
                            // Marca a opção clicada
                            opt.classList.add('selected');
                            
                            // Salva a resposta com base na etapa ativa
                            const val = opt.getAttribute('data-value');
                            if (currentStep === 1) answers.concern = val;
                            if (currentStep === 2) answers.age = val;
                            if (currentStep === 3) answers.goal = val;

                            // Habilita o botão 'Próximo' no rodapé
                            btnNext.disabled = false;

                            // Transição suave com micro-atraso para o usuário perceber a seleção (Aesthetics UX)
                            setTimeout(() => {
                                try {
                                    if (currentStep === index + 1) { // Garante que a etapa ainda seja a mesma
                                        currentStep++;
                                        renderQuiz();
                                    }
                                } catch (timeErr) {
                                    console.error("Erro ao auto-avançar etapa do quiz:", timeErr);
                                }
                            }, 350);

                        } catch (clickErr) {
                            console.error("System Exception na seleção de opção do quiz:", clickErr);
                        }
                    });
                });
            });

            // Botão Voltar
            btnPrev.addEventListener('click', () => {
                try {
                    if (currentStep > 1) {
                        currentStep--;
                        renderQuiz();
                    }
                } catch (navErr) {
                    console.error("System Exception ao retroceder etapa do quiz:", navErr);
                }
            });

            // Botão Próximo
            btnNext.addEventListener('click', () => {
                try {
                    if (currentStep < 4) {
                        // Verifica se possui resposta antes de avançar
                        let hasAnswer = false;
                        if (currentStep === 1 && answers.concern) hasAnswer = true;
                        if (currentStep === 2 && answers.age) hasAnswer = true;
                        if (currentStep === 3 && answers.goal) hasAnswer = true;

                        if (hasAnswer) {
                            currentStep++;
                            renderQuiz();
                        } else {
                            throw new Error("Business Exception: Selecione uma opção antes de avançar.");
                        }
                    }
                } catch (navErr) {
                    console.warn(navErr.message);
                }
            });

            // Botão Reiniciar Quiz
            btnRestart.addEventListener('click', () => {
                try {
                    // Limpa respostas e classes CSS de seleção
                    answers.concern = null;
                    answers.age = null;
                    answers.goal = null;

                    stepCards.forEach(card => {
                        const selectedOpts = card.querySelectorAll('.quiz-option.selected');
                        selectedOpts.forEach(o => o.classList.remove('selected'));
                    });

                    // Retorna para o primeiro passo
                    currentStep = 1;
                    renderQuiz();

                } catch (restartErr) {
                    console.error("System Exception ao reiniciar o quiz:", restartErr);
                }
            });

            // Primeira renderização
            renderQuiz();

        } catch (error) {
            console.error("Falha ao inicializar o Quiz de Protocolo:", error.message);
        }
    }

});
