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

    // Cargar galería inicial
    cargarGaleria(categoriaActual);

    // Event listeners para navegación
    botonAnterior.addEventListener('click', () => {
        navegarCategoria(-1); // -1 para anterior
    });

    botonSiguiente.addEventListener('click', () => {
        navegarCategoria(1); // 1 para siguiente
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
                    const imgElement = new Image();
                    imgElement.src = img.src;
                    imgElement.alt = img.alt || `Foto de ${categoriaData.titulo}`;
                    imgElement.loading = "lazy";

                    const figure = document.createElement('figure');
                    figure.className = 'galeria-item';
                    figure.innerHTML = `
                        ${imgElement.outerHTML}
                        ${img.descripcion ? `<figcaption>${img.descripcion}</figcaption>` : ''}
                    `;

                    (index % 2 === 0 ? columna1 : columna2).appendChild(figure); 
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

    // Cierre con transición
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