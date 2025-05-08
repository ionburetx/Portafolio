document.addEventListener('DOMContentLoaded', function() {
    // Lista de categorías en orden
    const categorias = [
        'arquitectura', 
        'paisaje', 
        'animales', 
        'retrato', 
        'calle', 
        'estilo-de-vida'
    ];
    
    const urlParams = new URLSearchParams(window.location.search);
    let categoriaSeleccionada = urlParams.get('categoria') || 'arquitectura';
    const galeria = document.getElementById('contenedorGaleria');
    const tituloCategoria = document.getElementById('tituloCategoria');
    const botonAnterior = document.getElementById('botonAnterior');
    const botonSiguiente = document.getElementById('botonSiguiente');

    // Variables para el modal
    const modal = document.getElementById('modalFotos');
    const cerrarModal = document.getElementById('cerrarModal');
    const contenedorModal = document.getElementById('contenedorModal');
    const anteriorModal = document.getElementById('anteriorModal');
    const siguienteModal = document.getElementById('siguienteModal');
    let fotosActuales = [];
    let indiceFotoActual = 0;
    
    // Función para abrir el modal con una foto específica
    function abrirModal(index) {
        indiceFotoActual = index;
        actualizarModal();
        modal.classList.add('mostrar');
        document.body.classList.add('modal-abierto');
    }

    // Función para cerrar el modal
    function cerrarModalHandler() {
        modal.classList.remove('mostrar');
        document.body.classList.remove('modal-abierto');
    }

    // Función para actualizar el contenido del modal
    function actualizarModal() {
        contenedorModal.innerHTML = '';
        
        fotosActuales.forEach((foto, index) => {
            const img = document.createElement('img');
            img.src = foto.src;
            img.alt = foto.alt || `Foto ${index + 1}`;
            img.className = 'modal-foto';
            img.loading = 'eager';
            contenedorModal.appendChild(img);
        });
        
        // Desplazar a la foto actual
        const fotoActual = document.querySelectorAll('.modal-foto')[indiceFotoActual];
        if (fotoActual) {
            fotoActual.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    // Función para cargar una categoría
    function cargarCategoria(categoria) {
        categoriaSeleccionada = categoria;
        history.replaceState(null, '', `?categoria=${categoria}`);
        
        galeria.innerHTML = '<p class="sin-imagenes">Cargando galería...</p>';

        fetch('data/galeria-fotografia.json')
            .then(response => {
                if (!response.ok) throw new Error(`Error HTTP! estado: ${response.status}`);
                return response.json();
            })
            .then(data => {
                const categoriaData = data.categorias.find(c => c.nombre === categoriaSeleccionada);
                
                if (!categoriaData) {
                    console.error('Categorías disponibles:', data.categorias.map(c => c.nombre));
                    throw new Error(`Categoría "${categoriaSeleccionada}" no encontrada`);
                }
                
                document.title = `ION BURETX - ${categoriaData.titulo}`;
                tituloCategoria.textContent = categoriaData.titulo;
                
                // Guardar las fotos para el modal
                fotosActuales = categoriaData.imagenes;
                
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
                    imgElement.onerror = () => {
                        imgElement.src = 'imagenes/placeholder.jpg';
                    };
                    imgElement.src = img.src;
                    imgElement.alt = img.alt || `Foto de ${categoriaData.titulo}`;
                    imgElement.loading = "lazy";
                    imgElement.style.cursor = 'pointer';

                    const figure = document.createElement('figure');
                    figure.className = 'galeria-item';
                    figure.appendChild(imgElement);
                    
                    if (img.descripcion) {
                        const figcaption = document.createElement('figcaption');
                        figcaption.textContent = img.descripcion;
                        figure.appendChild(figcaption);
                    }
                    
                    // Añadir evento click para abrir el modal
                    figure.addEventListener('click', () => abrirModal(index));
                    
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
    }

    // Event listeners para las flechas de categoría
    botonAnterior.addEventListener('click', function() {
        const currentIndex = categorias.indexOf(categoriaSeleccionada);
        const prevIndex = (currentIndex - 1 + categorias.length) % categorias.length;
        cargarCategoria(categorias[prevIndex]);
    });

    botonSiguiente.addEventListener('click', function() {
        const currentIndex = categorias.indexOf(categoriaSeleccionada);
        const nextIndex = (currentIndex + 1) % categorias.length;
        cargarCategoria(categorias[nextIndex]);
    });

    // Event listeners para el modal
    cerrarModal.addEventListener('click', cerrarModalHandler);

    anteriorModal.addEventListener('click', () => {
        indiceFotoActual = (indiceFotoActual - 1 + fotosActuales.length) % fotosActuales.length;
        actualizarModal();
    });

    siguienteModal.addEventListener('click', () => {
        indiceFotoActual = (indiceFotoActual + 1) % fotosActuales.length;
        actualizarModal();
    });

    // Cerrar modal al presionar ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('mostrar')) {
            cerrarModalHandler();
        }
    });

    // Cargar la categoría inicial
    cargarCategoria(categoriaSeleccionada);

    // Transición de entrada al cargar la galería
    const overlay = document.querySelector('.transition-overlay');
    if (overlay) {
        overlay.style.opacity = '0';
    }

    // Cierre con transición
    const botonCerrar = document.getElementById('botonCerrarGaleria');
    if (botonCerrar && overlay) {
        botonCerrar.addEventListener('click', function(e) {
            e.preventDefault();
            
            overlay.style.opacity = '1';
            overlay.style.pointerEvents = 'all';
            
            sessionStorage.setItem('fromGallery', 'true');
            
            setTimeout(() => {
                window.location.href = 'biografia.html';
            }, 1000);
        });
    }
});