document.addEventListener('DOMContentLoaded', function () {
    const transitionOverlay = document.querySelector('.transition-overlay');

    // Transición de entrada: de negro a visible
    if (transitionOverlay) {
        transitionOverlay.style.opacity = '1'; // Comienza en negro
        setTimeout(() => {
            transitionOverlay.style.transition = 'opacity 1s ease-in-out'; // Suaviza la transición
            transitionOverlay.style.opacity = '0'; // Se desvanece a transparente
        }, 100); // Pequeño retraso para asegurar que la transición se vea
    }
});

// Transición de página de idioma a bienvenida
document.addEventListener('DOMContentLoaded', function() {
    try {
        var botones = document.querySelectorAll('.language-btn');
        var overlay = document.querySelector('.transition-overlay');
        
        botones.forEach(function(boton) {
            boton.addEventListener('click', function() {
                if (overlay) {
                    overlay.style.opacity = '1';
                }
                
                setTimeout(function() {
                    window.location.href = 'bienvenida.html';
                }, 1000);
            });
        });
    } catch (e) {
        console.error("Error en la transición de idioma:", e);
    }
});

// Transición de página de bienvenida a biografía
document.addEventListener('DOMContentLoaded', function() {
    const botonAqui = document.querySelector('.boton-aqui');
    const transitionOverlay = document.querySelector('.transition-overlay');
    
    if (botonAqui && transitionOverlay) {
        botonAqui.addEventListener('click', function(e) {
            e.preventDefault(); // Evita la navegación inmediata

            // Activa la transición a negro
            transitionOverlay.style.opacity = '1';
            transitionOverlay.style.pointerEvents = 'all';

            // Espera a que termine la transición y redirige
            setTimeout(function() {
                window.location.href = 'biografia.html';
            }, 1000); // 1 segundo (igual que la duración de la transición en CSS)
        });
    } else {
        console.error("No se encontró el botón (.boton-aqui) o el overlay (.transition-overlay)");
    }
});

// ================
//MENU HAMBURGUESA
//=================
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menuButton');
    const menuNav = document.getElementById('menuNav');
    
    // Función para alternar el menú
    function toggleMenu() {
        menuNav.classList.toggle('mostrar');
        menuButton.classList.toggle('abierto');
        
        // Bloquear el scroll del body cuando el menú está abierto
        if (menuNav.classList.contains('mostrar')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    // Evento click en el botón
    menuButton.addEventListener('click', toggleMenu);
    
    // Cerrar menú al hacer clic en enlace
    document.querySelectorAll('.menu-nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Solo cerrar el menú si es un enlace interno (#)
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                toggleMenu(); // Cierra el menú primero
                
                // Scroll suave con ajuste para cada sección
                if (targetElement) {
                    setTimeout(() => {
                        const headerHeight = document.querySelector('.header-container').offsetHeight;
                        
                        // Ajuste especial para la sección de contacto
                        if (targetId === '#contacto') {
                            window.scrollTo({
                                top: targetElement.offsetTop - headerHeight - 20, // Ajuste adicional para contacto
                                behavior: 'smooth'
                            });
                        } else {
                            window.scrollTo({
                                top: targetElement.offsetTop - headerHeight, // Ajuste estándar para otras secciones
                                behavior: 'smooth'
                            });
                        }
                    }, 400); // Espera a que el menú se cierre
                }
            }
        });
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!menuNav.contains(e.target) && !menuButton.contains(e.target)) {
            menuNav.classList.remove('mostrar');
            menuButton.classList.remove('abierto');
            document.body.style.overflow = '';
        }
    });
});

//FLECHA SCROLL
document.addEventListener('DOMContentLoaded', function () {
    const flecha = document.querySelector('.flecha');
    const trabajos = document.querySelector('#trabajos');

    if (flecha && trabajos) {
        flecha.addEventListener('click', function () {
            const headerHeight = document.querySelector('.header-container').offsetHeight;
            window.scrollTo({
                top: trabajos.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        });
    }
});

// Función para verificar si un elemento está en el viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
}

// ================
//BOTÓN + INFO CV
//=================
function setupAccordions() {
    const buttons = document.querySelectorAll('.masInfo');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const itemHeader = this.parentElement;
            const itemContent = itemHeader.nextElementSibling;
            
            // Cerrar otros acordeones abiertos si es necesario
            document.querySelectorAll('.cv-item-content.active').forEach(content => {
                if (content !== itemContent) {
                    content.classList.remove('active');
                    content.previousElementSibling.querySelector('.masInfo').textContent = '+';
                }
            });
            
            // Alternar el acordeón actual
            itemContent.classList.toggle('active');
            
            // Cambiar el ícono
            this.textContent = itemContent.classList.contains('active') ? '-' : '+';
        });
    });
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupAccordions);
} else {
    setupAccordions();
}

// ======================
//MARCADORES SECCIONES CV 
//=======================

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del menú
    const menuItems = {
        sobreMi: document.querySelector('#apartadosCv h4:nth-child(1)'),
        estudios: document.querySelector('#apartadosCv h4:nth-child(2)'),
        experiencia: document.querySelector('#apartadosCv h4:nth-child(3)')
    };

    // Secciones a observar
    const sections = {
        bio: document.querySelector('.miBio'),
        estudios: document.querySelector('.cv-items'),
        experiencia: document.querySelector('.cv-item:nth-child(5)') // Ajusta este selector según tu estructura
    };

    // Configuraciones específicas para cada sección
    const sectionConfigs = {
        bio: {
            rootMargin: '-20% 0px -50% 0px', // Se activa cuando está en el 20% superior
            threshold: 0
        },
        estudios: {
            rootMargin: '-60% 0px -40% 0px', // Se activa cuando está más abajo (60% desde el top)
            threshold: 0
        },
        experiencia: {
            rootMargin: '-40% 0px -50% 0px', // Se mantiene como estaba
            threshold: 0
        }
    };

    // Crear observers para cada sección
    const observers = {
        bio: new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    resetActiveItems();
                    menuItems.sobreMi.classList.add('active');
                }
            });
        }, sectionConfigs.bio),
        
        estudios: new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    resetActiveItems();
                    menuItems.estudios.classList.add('active');
                }
            });
        }, sectionConfigs.estudios),
        
        experiencia: new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    resetActiveItems();
                    menuItems.experiencia.classList.add('active');
                }
            });
        }, sectionConfigs.experiencia)
    };

    // Función para resetear todos los items
    function resetActiveItems() {
        Object.values(menuItems).forEach(item => item.classList.remove('active'));
    }

    // Observar las secciones con sus respectivos observers
    if (sections.bio) observers.bio.observe(sections.bio);
    if (sections.estudios) observers.estudios.observe(sections.estudios);
    if (sections.experiencia) observers.experiencia.observe(sections.experiencia);

    // Activar "Sobre mi" por defecto si está visible al cargar
    const checkInitialPosition = () => {
        if (sections.bio) {
            const bioRect = sections.bio.getBoundingClientRect();
            if (bioRect.top >= 0 && bioRect.bottom <= window.innerHeight) {
                resetActiveItems();
                menuItems.sobreMi.classList.add('active');
            }
        }
    };

    setTimeout(checkInitialPosition, 100);
});

// ======================
//ANIMACIÓN LOGO EN BIENVENIDA 
//=======================

document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start-animation');
    const body = document.body;
    const animatedLogo = document.getElementById('animated-logo');
    const transitionOverlay = document.querySelector('.transition-overlay');
    const path = document.querySelector('.line');
    
    // Path más curvo y elaborado
    path.setAttribute('d', `
        M5,5
        C20,30 40,20 50,50
        S80,30 95,95
    `);
    
    startButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Iniciar animación
        body.classList.add('animation-active');
        
        // Configuración de la animación
        const duration = 4000; // Aumentado a 4 segundos
        const startTime = performance.now();
        
        // Función de animación suavizada
        function animateLogo(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Animación del trazado de la línea
            path.style.strokeDashoffset = 2000 * (1 - progress);
            
            // Movimiento del logo
            const pathLength = path.getTotalLength();
            const point = path.getPointAtLength(progress * pathLength);
            
            // Aplicamos transformación con suavizado
            animatedLogo.style.transform = `
                translate(${point.x}vw, ${point.y}vh)
                scale(${1 - progress * 0.5}) /* Efecto de reducción gradual */
            `;
            
            // Opacidad gradual al final
            if (progress > 0.7) {
                animatedLogo.style.opacity = 1 - (progress - 0.7) / 0.3;
            }
            
            if (progress < 1) {
                requestAnimationFrame(animateLogo);
            } else {
                // Transición final más suave
                setTimeout(() => {
                    transitionOverlay.style.opacity = '1';
                    setTimeout(() => {
                        window.location.href = 'biografia.html';
                    }, 1500); // Más tiempo para el fade final
                }, 500);
            }
        }
        
        requestAnimationFrame(animateLogo);
    });
});

// ======================
//CARRUSEL ILUSTRACIONES   
// ====================== 

document.addEventListener('DOMContentLoaded', function() {
    const carrusel = document.querySelector('.carrusel');
    const imagen = document.querySelector('.carrusel-img1');
    let isDragging = false;
    let startX, currentX;
    let animationId;
    const duration = 40000; // 30 segundos (ajustable)
    
    function initCarousel() {
        if (!imagen.complete) {
            imagen.addEventListener('load', initCarousel);
            return;
        }
        
        const containerWidth = carrusel.offsetWidth;
        const imgWidth = imagen.offsetWidth;
        
        // Posición inicial: borde izquierdo en mitad de pantalla
        currentX = containerWidth * 0.3;
        applyTransform();
        
        // Calcular desplazamiento necesario
        const desplazamientoNecesario = imgWidth - (containerWidth * 0.7);
        
        function animate(startTime) {
            function runAnimation(timestamp) {
                if (!startTime) startTime = timestamp;
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing suave
                const easing = progress < 0.5 
                    ? 2 * progress * progress 
                    : 1 - Math.pow(-2 * progress + 2, 2) / 2;
                
                // Mover desde mitad de pantalla hasta borde derecho
                currentX = (containerWidth * 0.25) - (easing * desplazamientoNecesario);
                applyTransform();
                
                if (progress < 1 && !isDragging) {
                    animationId = requestAnimationFrame(runAnimation);
                }
            }
            
            animationId = requestAnimationFrame(runAnimation);
        }
        
        // Iniciar animación
        animate();
        
        // Eventos táctiles
        carrusel.addEventListener('touchstart', (e) => {
            cancelAnimationFrame(animationId);
            isDragging = true;
            startX = e.touches[0].clientX;
            currentX = parseInt(getComputedStyle(imagen).left) || (containerWidth / 2);
            e.preventDefault();
        });
        
        carrusel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            
            const x = e.touches[0].clientX;
            const diff = x - startX;
            currentX = currentX + diff;
            
            // Limitar el desplazamiento
            const maxX = containerWidth / 2; // No pasar de la posición inicial
            const minX = (containerWidth / 2) - (imgWidth - (containerWidth / 2)); // Hasta borde derecho
            currentX = Math.max(minX, Math.min(currentX, maxX));
            
            applyTransform();
        });
        
        carrusel.addEventListener('touchend', () => {
            isDragging = false;
        });
    }
    
    function applyTransform() {
        imagen.style.left = `${currentX}px`;
    }
    
    // Iniciar
    initCarousel();
});

// ==========================
//ANIMACIÓN ENTRADA ELEMENTOS  
// ==========================