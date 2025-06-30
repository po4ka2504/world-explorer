
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('fractal-canvas');
    if (!canvas) {
        console.error('Canvas element not found!');
        return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x00001a, 1); // Dark blue background

    // --- Procedural Texture Generation ---
    function createProceduralTexture() {
        const asciiArt = [
            "................................",
            "............****................",
            "...........*####*...............",
            "..........##########............",
            ".........###########............",
            "........###~~#####..............",
            ".......####~#######.............",
            "......#####~~~#####.............",
            ".....##################.........",
            "....####################........",
            "...#####################........",
            "..######################........",
            ".........###########............",
            "..........*#####*...............",
            "............****................",
            "................................"
        ];

        const canvasSize = 512;
        const artCanvas = document.createElement('canvas');
        artCanvas.width = canvasSize;
        artCanvas.height = canvasSize;
        const context = artCanvas.getContext('2d');

        context.fillStyle = '#001f3f'; // Deep blue for water
        context.fillRect(0, 0, canvasSize, canvasSize);

        const biomeColors = {
            '#': ['#2ECC40', '#008f39', '#006442'], // Greens
            '~': ['#FFDC00', '#F0E68C', '#D2B48C'], // Yellows/tans
            '*': ['#FFFFFF', '#F5F5F5', '#E8E8E8']  // Whites
        };

        const charHeight = canvasSize / asciiArt.length;
        const charWidth = canvasSize / asciiArt[0].length;

        for (let i = 0; i < asciiArt.length; i++) {
            for (let j = 0; j < asciiArt[i].length; j++) {
                const biomeSymbol = asciiArt[i][j];
                if (biomeColors[biomeSymbol]) {
                    const colors = biomeColors[biomeSymbol];
                    const x = j * charWidth;
                    const y = i * charHeight;
                    
                    // OPTIMIZED: Draw in small blocks instead of pixel-by-pixel
                    const blockSize = 4;
                    for (let px = 0; px < charWidth; px += blockSize) {
                        for (let py = 0; py < charHeight; py += blockSize) {
                            const randomColor = colors[Math.floor(Math.random() * colors.length)];
                            context.fillStyle = randomColor;
                            context.fillRect(x + px, y + py, blockSize, blockSize);
                        }
                    }
                }
            }
        }

        return new THREE.CanvasTexture(artCanvas);
    }

    const proceduralTexture = createProceduralTexture();
    proceduralTexture.magFilter = THREE.NearestFilter;

    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.MeshStandardMaterial({ 
        map: proceduralTexture,
        metalness: 0.1,
        roughness: 0.9
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.9);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 0.7);
    pointLight.position.set(5, 3, 5);
    scene.add(pointLight);

    camera.position.z = 2.2;

    function animate() {
        requestAnimationFrame(animate);
        sphere.rotation.y += 0.003;
        renderer.render(scene, camera);
    }

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    animate();
});
