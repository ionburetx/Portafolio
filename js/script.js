// Transición de entrada al cargar la página
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
        setTimeout(function() {
            window.location.href = 'bienvenida.html';
        }, 1000);
    }
});

// Transición de página de bienvenida a biografía
document.addEventListener('DOMContentLoaded', function() {
    const botonAqui = document.querySelector('.boton-aqui');
    const transitionOverlay = document.querySelector('.transition-overlay'); // Asegúrate de que existe
    
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
                toggleMenu();
                
                // Scroll suave
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    setTimeout(() => {
                        window.scrollTo({
                            top: targetElement.offsetTop - 70,
                            behavior: 'smooth'
                        });
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
            window.scrollTo({
                top: trabajos.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    }
});

// ===============================
//PROVANDO TRANSICIONES DEL SCROLL
//================================
// Función para verificar si un elemento está en el viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }