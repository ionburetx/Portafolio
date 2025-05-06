// Obtener la categoría de la URL
const urlParams = new URLSearchParams(window.location.search);
const categoria = urlParams.get('categoria') || 'arquitectura'; // Valor por defecto

// Mostrar el título de la categoría
document.getElementById('tituloCategoria').textContent = 
    `Galería de ${categoria.charAt(0).toUpperCase() + categoria.slice(1)}`;

// Objeto con las imágenes de cada categoría
const imagenesPorCategoria = {
    arquitectura: [
        "imagenes/trabajos/fotografia/arquitectura/arq1.jpg",
        "imagenes/trabajos/fotografia/arquitectura/arq2.jpg",
        // Más imágenes...
    ],
    paisaje: [
        "imagenes/trabajos/fotografia/paisaje/pai1.jpg",
        "imagenes/trabajos/fotografia/paisaje/pai2.jpg",
        // Más imágenes...
    ],
    // Añade más categorías aquí...
};

// Cargar las imágenes correspondientes (versión mobile first - una columna)
const galeria = document.getElementById('contenedorGaleria');
const imagenes = imagenesPorCategoria[categoria];

imagenes.forEach(imgSrc => {
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = `Foto de ${categoria}`;
    galeria.appendChild(img);
});