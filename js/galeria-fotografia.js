document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoriaSeleccionada = urlParams.get('categoria') || 'arquitectura';
    const galeria = document.getElementById('contenedorGaleria');
    
    console.log('Categoría seleccionada:', categoriaSeleccionada); // Debug
    
    galeria.innerHTML = '<p class="sin-imagenes">Cargando galería...</p>';

    fetch('data/galeria-fotografia.json')
        .then(response => {
            if (!response.ok) throw new Error(`Error HTTP! estado: ${response.status}`);
            return response.json();
        })
        .then(data => {
            console.log('Datos JSON cargados:', data); // Debug
            
            const categoria = data.categorias.find(c => c.nombre === categoriaSeleccionada);
            
            if (!categoria) {
                console.error('Categorías disponibles:', data.categorias.map(c => c.nombre));
                throw new Error(`Categoría "${categoriaSeleccionada}" no encontrada`);
            }

            console.log('Categoría encontrada:', categoria); // Debug
            
            document.title = `ION BURETX - ${categoria.titulo}`;
            document.getElementById('tituloCategoria').textContent = categoria.titulo;
            
            if (categoria.imagenes.length === 0) {
                galeria.innerHTML = '<p class="sin-imagenes">Próximamente más imágenes</p>';
                return;
            }

            galeria.innerHTML = `
                <div class="galeria-columna" id="columna1"></div>
                <div class="galeria-columna" id="columna2"></div>
            `;
            
            const columna1 = document.getElementById('columna1');
            const columna2 = document.getElementById('columna2');
            
            categoria.imagenes.forEach((img, index) => {
                const imgElement = new Image();
                imgElement.onload = () => console.log('Imagen cargada:', img.src); // Debug
                imgElement.onerror = () => {
                    console.error('Error cargando imagen:', img.src);
                    imgElement.src = 'imagenes/placeholder.jpg';
                };
                imgElement.src = img.src;
                imgElement.alt = img.alt || `Foto de ${categoria.titulo}`;
                imgElement.loading = "lazy";

                const figure = document.createElement('figure');
                figure.className = 'galeria-item';
                figure.appendChild(imgElement);
                
                if (img.descripcion) {
                    const figcaption = document.createElement('figcaption');
                    figcaption.textContent = img.descripcion;
                    figure.appendChild(figcaption);
                }
                
                (index % 2 === 0 ? columna1 : columna2).appendChild(figure);
            });
        })
        .catch(error => {
            console.error('Error completo:', error);
            galeria.innerHTML = `
                <p class="error-carga">
                    Error al cargar la galería. 
                    <br>Detalle: ${error.message}
                    <br><a href="galeria-fotografia.html?categoria=retrato">Volver a intentar</a>
                </p>`;
        });
});

// Transición de entrada al cargar la galería
document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.querySelector('.transition-overlay');
    if (overlay) {
        overlay.style.opacity = '0'; // Asegura que empiece transparente
    }
});

// Cierre con transición (solo en galería-fotografia.js)
document.addEventListener('DOMContentLoaded', function() {
    const botonCerrar = document.getElementById('botonCerrarGaleria');
    const transitionOverlay = document.querySelector('.transition-overlay');
    
    if (botonCerrar && transitionOverlay) {
        botonCerrar.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Activar transición
            transitionOverlay.style.opacity = '1';
            transitionOverlay.style.pointerEvents = 'all';
            
            // Guardar flag y posición
            sessionStorage.setItem('fromGallery', 'true');
            
            // Redirigir después de la transición
            setTimeout(() => {
                window.location.href = 'biografia.html';
            }, 1000);
        });
    }
});