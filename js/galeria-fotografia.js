document.addEventListener('DOMContentLoaded', function() {
    // Configuración inicial
    const categoriasDisponibles = [
        'arquitectura', 
        'paisaje', 
        'animales', 
        'retrato', 
        'calle', 
        'estilo-de-vida'
    ];
    let categoriaActual = new URLSearchParams(window.location.search).get('categoria') || 'arquitectura';
    const botonAnterior = document.getElementById('botonAnterior');
    const botonSiguiente = document.getElementById('botonSiguiente');
    const botonCerrar = document.getElementById('botonCerrarGaleria');
    const tituloCategoria = document.getElementById('tituloCategoria');
    const galeria = document.getElementById('contenedorGaleria');
    const transitionOverlay = document.querySelector('.transition-overlay');
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxImagesContainer = lightbox.querySelector('.lightbox-images-container');
    
    // Variables para controlar el lightbox
    let currentImageIndex = 0;
    let currentCategoryImages = [];

    // Cargar galería inicial
    cargarGaleria(categoriaActual);

    // Event listeners para navegación
    botonAnterior.addEventListener('click', () => {
        navegarCategoria(-1);
    });

    botonSiguiente.addEventListener('click', () => {
        navegarCategoria(1);
    });

    // Función para navegar entre categorías
    function navegarCategoria(direccion) {
        const indiceActual = categoriasDisponibles.indexOf(categoriaActual);
        let nuevoIndice = indiceActual + direccion;

        // Circular entre categorías
        if (nuevoIndice < 0) {
            nuevoIndice = categoriasDisponibles.length - 1;
        } else if (nuevoIndice >= categoriasDisponibles.length) {
            nuevoIndice = 0;
        }

        categoriaActual = categoriasDisponibles[nuevoIndice];
        
        // Transición suave
        transitionOverlay.style.opacity = '0.7';
        setTimeout(() => {
            cargarGaleria(categoriaActual);
            history.pushState(null, '', `?categoria=${categoriaActual}`);
            transitionOverlay.style.opacity = '0';
        }, 300);
    }

    // Función principal para cargar la galería
    function cargarGaleria(categoria) {
        galeria.innerHTML = '<p class="sin-imagenes">Cargando galería...</p>';

        fetch('data/galeria-fotografia.json')
            .then(response => response.json())
            .then(data => {
                const categoriaData = data.categorias.find(c => c.nombre === categoria);
                
                if (!categoriaData) {
                    throw new Error(`Categoría "${categoria}" no encontrada`);
                }

                // Guardar imágenes para el lightbox
                currentCategoryImages = categoriaData.imagenes;

                // Actualizar título
                document.title = `ION BURETX - ${categoriaData.titulo}`;
                tituloCategoria.textContent = categoriaData.titulo;

                // Construir galería
                if (categoriaData.imagenes.length === 0) {
                    galeria.innerHTML = '<p class="sin-imagenes">Próximamente más imágenes</p>';
                    return;
                }

                galeria.innerHTML = `
                    <div class="galeria-columna" id="columna1"></div>
                    <div class="galeria-columna" id="columna2"></div>
                `;

                const columna1 = document.getElementById('columna1');
                const columna2 = document.getElementById('columna2');

                categoriaData.imagenes.forEach((img, index) => {
                    const imgElement = document.createElement('img');
                    imgElement.src = img.src;
                    imgElement.alt = img.alt || `Foto de ${categoriaData.titulo}`;
                    imgElement.loading = "lazy";
                    imgElement.classList.add('galeria-imagen');
                    imgElement.dataset.index = index;
                    
                    // Estilos para la imagen
                    imgElement.style.width = '100%';
                    imgElement.style.height = 'auto';
                    imgElement.style.display = 'block';
                    imgElement.style.borderRadius = '6px';
                    imgElement.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                    imgElement.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';

                    const figure = document.createElement('figure');
                    figure.className = 'galeria-item';
                    figure.appendChild(imgElement);

                    (index % 2 === 0 ? columna1 : columna2).appendChild(figure);
                });

                // Event listeners para las imágenes
                document.querySelectorAll('.galeria-imagen').forEach(img => {
                    img.addEventListener('click', function() {
                        currentImageIndex = parseInt(this.dataset.index);
                        openLightbox();
                    });
                    
                    // Efectos hover
                    img.addEventListener('mouseenter', function() {
                        this.style.transform = 'scale(1.02)';
                        this.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
                    });
                    
                    img.addEventListener('mouseleave', function() {
                        this.style.transform = '';
                        this.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                    });
                });
            })
            .catch(error => {
                console.error('Error:', error);
                galeria.innerHTML = `
                    <p class="error-carga">
                        Error al cargar: ${error.message}
                        <br><a href="?categoria=retrato">Recargar</a>
                    </p>`;
            });
    }

    // Funciones del lightbox
    function openLightbox() {
        document.body.classList.add('lightbox-active');
        lightbox.classList.add('active');
        
        // Limpiar contenedor
        lightboxImagesContainer.innerHTML = '';
        
        // Añadir todas las imágenes de la categoría
        currentCategoryImages.forEach((img, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = img.src;
            imgElement.alt = img.alt || '';
            imgElement.classList.add('lightbox-image');
            
            // Destacar la imagen seleccionada
            if (index === currentImageIndex) {
                setTimeout(() => {
                    imgElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 50);
            }
            
            lightboxImagesContainer.appendChild(imgElement);
        });
    }

    function closeLightbox() {
        document.body.classList.remove('lightbox-active');
        lightbox.classList.remove('active');
    }

    // Event listeners para el lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    
    // Cerrar al hacer clic fuera de la imagen
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Cerrar con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // Cierre con transición (para el botón de cerrar galería)
    if (botonCerrar) {
        botonCerrar.addEventListener('click', (e) => {
            e.preventDefault();
            transitionOverlay.style.opacity = '1';
            setTimeout(() => {
                window.location.href = 'biografia.html';
            }, 1000);
        });
    }
});