document.addEventListener('DOMContentLoaded', function() {
    const scrollColors = [
        ['#ff9a9e', '#fad0c4'],
        ['#a18cd1', '#fbc2eb'],
        ['#fbc2eb', '#a6c1ee'],
        ['#a6c1ee', '#f6d365'],
        ['#f6d365', '#fda085']
    ];
    
    let mouseX = 0.5;
    let mouseY = 0.5;
    
    function handleScroll() {
        requestAnimationFrame(updateBackground);
    }
    
    function handleMouseMove(e) {
        mouseX = e.clientX / window.innerWidth;
        mouseY = (e.clientY + window.scrollY) / document.body.scrollHeight;
        requestAnimationFrame(updateBackground);
    }
    
    function updateBackground() {
        const scrollHeight = document.body.scrollHeight - window.innerHeight;
        const scrollProgress = Math.min(window.scrollY / scrollHeight, 0.999);
        
        const colorIndex = Math.min(
            Math.floor(scrollProgress * scrollColors.length),
            scrollColors.length - 2
        );
        
        const localProgress = (scrollProgress * scrollColors.length) % 1;
        const [start1, start2] = scrollColors[colorIndex];
        const [end1, end2] = scrollColors[colorIndex + 1];
        
        const color1 = interpolateColor(start1, end1, localProgress);
        const color2 = interpolateColor(start2, end2, localProgress);
        
        document.body.style.background = `
            radial-gradient(
                circle at ${mouseX * 100}% ${mouseY * 100}%,
                ${lightenColor(color1, 30)} 0%,
                ${color1} 5%,
                ${color2} 25%,
                ${darkenColor(color2, 30)} 100%
            )
        `;
    }
    
    function hexToRgb(hex) {
        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5, 7), 16);
        return [r, g, b];
    }
    
    function interpolateColor(hex1, hex2, factor) {
        const [r1, g1, b1] = hexToRgb(hex1);
        const [r2, g2, b2] = hexToRgb(hex2);
        
        const r = Math.round(r1 + factor * (r2 - r1));
        const g = Math.round(g1 + factor * (g2 - g1));
        const b = Math.round(b1 + factor * (b2 - b1));
        
        return `rgb(${r}, ${g}, ${b})`;
    }
    
    function adjustColor(color, amount) {
        return color.replace(/rgb\((\d+), (\d+), (\d+)\)/, (_, r, g, b) => {
            return `rgb(${
                Math.min(255, Math.max(0, parseInt(r) + amount))
            }, ${
                Math.min(255, Math.max(0, parseInt(g) + amount))
            }, ${
                Math.min(255, Math.max(0, parseInt(b) + amount))
            })`;
        });
    }
    
    function lightenColor(color, amount) {
        return adjustColor(color, amount);
    }
    
    function darkenColor(color, amount) {
        return adjustColor(color, -amount);
    }
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    updateBackground();
});