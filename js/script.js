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
//Transicion de pagina de bienvenida a biografia
document.addEventListener('DOMContentLoaded', function () {
    const ionButton = document.querySelector('.ion-button');
    const transitionOverlay = document.querySelector('.transition-overlay');

    ionButton.addEventListener('click', function (e) {
        e.preventDefault(); // Evita el comportamiento predeterminado del enlace

        // Activa la transición a negro
        transitionOverlay.style.opacity = '1';
        transitionOverlay.style.pointerEvents = 'all';

        // Espera a que termine la transición y redirige
        setTimeout(function () {
            window.location.href = 'biografia.html';
        }, 1000); // Tiempo en milisegundos (1s) para que coincida con la duración de la transición
    });
});