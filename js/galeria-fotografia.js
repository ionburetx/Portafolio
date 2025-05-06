document.addEventListener('DOMContentLoaded', function() {
    // Obtener la categoría de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoriaSeleccionada = urlParams.get('categoria');
    
    // Cargar datos del JSON
    fetch('data/galeria.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(data => {
            // Verificar si existe la categoría seleccionada
            const categoriaEncontrada = data.categorias.find(
                cat => cat.nombre === categoriaSeleccionada
            );
            
            if (!categoriaEncontrada) {
                console.error('Categoría no encontrada:', categoriaSeleccionada);
                // Redirigir a una categoría por defecto o mostrar mensaje
                window.location.href = 'galeria-fotografia.html?categoria=arquitectura';
                return;
            }
            
            // Mostrar título específico de la categoría
            document.title = `ION BURETX - ${categoriaEncontrada.titulo}`;
            document.getElementById('tituloCategoria').textContent = categoriaEncontrada.titulo;
            
            // Cargar imágenes
            const galeria = document.getElementById('contenedorGaleria');
            galeria.innerHTML = ''; // Limpiar contenedor
            
            if (categoriaEncontrada.imagenes.length === 0) {
                galeria.innerHTML = '<p class="sin-imagenes">Próximamente más imágenes en esta categoría</p>';
                return;
            }
            
            categoriaEncontrada.imagenes.forEach(img => {
                const figure = document.createElement('figure');
                figure.className = 'galeria-item';
                
                const imgElement = document.createElement('img');
                imgElement.src = img.src;
                imgElement.alt = img.alt || `Foto de ${categoriaEncontrada.titulo}`;
                imgElement.loading = "lazy";
                
                figure.appendChild(imgElement);
                
                if (img.descripcion) {
                    const figcaption = document.createElement('figcaption');
                    figcaption.textContent = img.descripcion;
                    figure.appendChild(figcaption);
                }
                
                galeria.appendChild(figure);
            });
        })
        .catch(error => {
            console.error('Error cargando la galería:', error);
            document.getElementById('contenedorGaleria').innerHTML = 
                '<p class="error-carga">Error al cargar la galería. Por favor, inténtalo más tarde.</p>';
        });
});