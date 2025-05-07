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
function initLanguageSelector() {
    const languageButtons = document.querySelectorAll('.language-btn');
    const overlay = document.querySelector('.transition-overlay');
    
    if (languageButtons.length > 0 && overlay) {
        languageButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                overlay.style.opacity = '1';
                setTimeout(() => window.location.href = 'bienvenida.html', 1000);
            });
        });
    }
}

function initBioTransition() {
    const botonAqui = document.querySelector('.link--highlight');
    const transitionOverlay = document.querySelector('.transition-overlay');
    
    if (botonAqui && transitionOverlay) {
        botonAqui.addEventListener('click', (e) => {
            e.preventDefault();
            transitionOverlay.style.opacity = '1';
            setTimeout(() => window.location.href = 'biografia.html', 1000);
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initLanguageSelector(); // Solo funciona si hay elementos
    initBioTransition();    // Solo funciona en bienvenida.html
});

// ================
//MENU HAMBURGUESA
//=================
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menuButton');
    const menuNav = document.getElementById('menuNav');
    if (!menuButton || !menuNav) return;
    
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
//CARRUSEL ILUSTRACIONES   
// ====================== 

document.addEventListener('DOMContentLoaded', function() {
    const carrusel = document.querySelector('.carrusel');
    const imagen = document.querySelector('.carrusel-img1');
    if (!carrusel || !imagen) return; 
    let isDragging = false;
    let startX, currentX, lastX, velocity = 0;
    let lastTime;
    let animationId;
    const duration = 40000; // 40 segundos para la animación automática
    const friction = 0.95; // Fricción para el deslizamiento inercial
    const minVelocity = 0.1; // Velocidad mínima para continuar el movimiento
    
    function initCarousel() {
        if (!imagen.complete) {
            imagen.addEventListener('load', initCarousel);
            return;
        }
        
        const containerWidth = carrusel.offsetWidth;
        const imgWidth = imagen.offsetWidth;
        
        // Posición inicial: borde izquierdo en 30% del contenedor
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
                
                // Mover desde posición inicial hasta borde derecho
                currentX = (containerWidth * 0.3) - (easing * desplazamientoNecesario);
                applyTransform();
                
                if (progress < 1 && !isDragging) {
                    animationId = requestAnimationFrame(runAnimation);
                }
            }
            
            animationId = requestAnimationFrame(runAnimation);
        }
        
        // Eventos táctiles mejorados
        carrusel.addEventListener('touchstart', (e) => {
            cancelAnimationFrame(animationId);
            isDragging = true;
            startX = e.touches[0].clientX;
            lastX = currentX;
            lastTime = performance.now();
            velocity = 0;
            e.preventDefault();
        });
        
        carrusel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            
            const x = e.touches[0].clientX;
            const now = performance.now();
            const deltaTime = now - lastTime;
            
            if (deltaTime > 0) {
                const deltaX = x - startX;
                currentX = lastX + deltaX;
                
                // Calcular velocidad para el efecto inercial
                velocity = (currentX - lastX) / deltaTime;
                lastX = currentX;
                lastTime = now;
                
                // Limitar el desplazamiento
                const maxX = containerWidth * 0.3;
                const minX = maxX - (imgWidth - containerWidth * 0.7);
                currentX = Math.max(minX, Math.min(currentX, maxX));
                
                applyTransform();
            }
        });
        
        carrusel.addEventListener('touchend', () => {
            isDragging = false;
            
            // Aplicar efecto inercial si hay suficiente velocidad
            if (Math.abs(velocity) > minVelocity) {
                const inertiaAnimation = () => {
                    velocity *= friction; // Reducir velocidad por fricción
                    currentX += velocity * 16; // 16ms ≈ 60fps
                    
                    // Limitar movimiento dentro de los bordes
                    const maxX = containerWidth * 0.3;
                    const minX = maxX - (imgWidth - containerWidth * 0.7);
                    
                    if (currentX > maxX) {
                        currentX = maxX;
                        velocity = 0;
                    } else if (currentX < minX) {
                        currentX = minX;
                        velocity = 0;
                    }
                    
                    applyTransform();
                    
                    // Continuar animación si aún hay velocidad
                    if (Math.abs(velocity) > minVelocity) {
                        requestAnimationFrame(inertiaAnimation);
                    } else {
                        // Reiniciar animación automática después de detenerse
                        animate();
                    }
                };
                
                inertiaAnimation();
            } else {
                // Reiniciar animación automática si no hay movimiento inercial
                animate();
            }
        });
        
        // Iniciar animación automática
        animate();
    }
    
    function applyTransform() {
        // Usamos transform en lugar de left para mejor rendimiento
        imagen.style.transform = `translateX(${currentX}px)`;
    }
    
    // Iniciar el carrusel
    initCarousel();
});

// ======================
//BOTONES GALERIA FOTOS   
// ====================== 

// Guardar posición del scroll cuando se hace clic en un enlace a la galería
document.querySelectorAll('a[href^="galeria-fotografia.html"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        // Guardar posición actual del scroll
        sessionStorage.setItem('scrollPosition', window.scrollY);
        // Redirigir después de guardar
        setTimeout(() => window.location.href = this.href, 50);
    });
});

// Restaurar scroll si venimos de la galería
document.addEventListener('DOMContentLoaded', function() {
    if (sessionStorage.getItem('fromGallery') === 'true') {
        const savedPosition = sessionStorage.getItem('scrollPosition');
        if (savedPosition) {
            setTimeout(() => {
                window.scrollTo(0, parseInt(savedPosition));
                // Limpiar flags
                sessionStorage.removeItem('fromGallery');
                sessionStorage.removeItem('scrollPosition');
            }, 100); // Pequeño delay para asegurar la renderización
        }
    }
});

// ======================
// CIERRE DE GALERÍA CON TRANSICIÓN
// ======================
document.addEventListener('DOMContentLoaded', function() {
    const botonCerrar = document.getElementById('botonCerrarGaleria');
    const transitionOverlay = document.querySelector('.transition-overlay');
    
    if (botonCerrar && transitionOverlay) {
        botonCerrar.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Activar transición
            transitionOverlay.style.opacity = '1';
            transitionOverlay.style.pointerEvents = 'all';
            
            // Guardar flag para restaurar scroll
            sessionStorage.setItem('fromGallery', 'true');
            
            // Redirigir después de la transición
            setTimeout(() => {
                window.location.href = 'biografia.html';
            }, 1000); // 1 segundo (igual que tus otras transiciones)
        });
    }
});
