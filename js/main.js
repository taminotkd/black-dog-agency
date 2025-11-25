document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MENU MOBILE ---
    const menuBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        mobileMenu.classList.toggle('mobile-open');
        document.body.classList.toggle('overflow-hidden'); // Previne scroll no body
    }

    if (menuBtn) menuBtn.addEventListener('click', toggleMenu);
    if (closeBtn) closeBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // --- 2. HEADER SCROLL EFFECT ---
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            // Ao rolar: Fundo preto sólido (#050505) e sombra
            header.classList.remove('bg-transparent');
            header.classList.add('bg-[#050505]', 'shadow-lg', 'border-b', 'border-white/5');
        } else {
            // No topo: Totalmente transparente, sem borda
            header.classList.remove('bg-[#050505]', 'shadow-lg', 'border-b', 'border-white/5');
            header.classList.add('bg-transparent');
        }
    });
    // --- 3. SWIPER (CARROSSEL PORTFÓLIO) ---
    // Inicializa apenas se a classe existir
    if (document.querySelector('.mySwiper')) {
        const swiper = new Swiper(".mySwiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            },
        });
    }

    // --- 4. SCROLL ANIMATION (INTERSECTION OBSERVER) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-section');
    fadeElements.forEach(el => observer.observe(el));

    // --- 5. THREE.JS BACKGROUND ---
    initThreeJS();
});

function initThreeJS() {
    const canvasContainer = document.getElementById('hero-canvas');
    if (!canvasContainer) return;

    // Verificar suporte WebGL
    try {
        const scene = new THREE.Scene();
        // Cor do fundo da cena (preto profundo)
        scene.background = new THREE.Color(0x050505);

        // Camera
        const camera = new THREE.PerspectiveCamera(75, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 1000);
        camera.position.z = 5;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        canvasContainer.appendChild(renderer.domElement);

        // --- CRIAR PARTÍCULAS (STARFIELD / NEBULA VIBE) ---
        const geometry = new THREE.BufferGeometry();
        const count = 1500; // Quantidade de partículas
        const posArray = new Float32Array(count * 3);

        for(let i = 0; i < count * 3; i++) {
            // Espalhar partículas aleatoriamente
            posArray[i] = (Math.random() - 0.5) * 15; 
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        // Material das partículas
        const material = new THREE.PointsMaterial({
            size: 0.02,
            color: 0xF5B400, // Cor Primary
            transparent: true,
            opacity: 0.8,
        });

        // Mesh
        const particlesMesh = new THREE.Points(geometry, material);
        scene.add(particlesMesh);

        // Interação com Mouse (opcional e sutil)
        let mouseX = 0;
        let mouseY = 0;

        // Animação Loop
        const animate = () => {
            requestAnimationFrame(animate);

            // Rotação lenta constante
            particlesMesh.rotation.y += 0.0005;
            particlesMesh.rotation.x += 0.0002;

            renderer.render(scene, camera);
        };

        animate();

        // Responsividade
        window.addEventListener('resize', () => {
            camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
        });

    } catch (e) {
        console.warn("WebGL não suportado ou erro no Three.js. Usando fallback.");
        const fallback = document.getElementById('hero-fallback');
        if(fallback) fallback.classList.remove('hidden');
    }
}