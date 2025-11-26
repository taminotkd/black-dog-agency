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


    // --- 4. SCROLL ANIMATION  ---
    const fadeElements = document.querySelectorAll('.fade-in-section');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {
        fadeElements.forEach(el => el.classList.add('is-visible'));
    } else if (fadeElements.length) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
    
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observerInstance.unobserve(entry.target); // Anima apenas uma vez
                }
            });
        }, observerOptions);
    
        fadeElements.forEach(el => observer.observe(el));
    }

    // --- 5. VIDEO BACKGROUND ---
    initVideoBackground();
});

function initVideoBackground() {
    const video = document.getElementById('hero-video');
    if (!video) return;

    // Garantir que o vídeo toque (alguns navegadores bloqueiam autoplay)
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                // Vídeo iniciou com sucesso
                console.log('Vídeo de fundo iniciado');
            })
            .catch(error => {
                // Autoplay foi bloqueado, tentar novamente após interação do usuário
                console.warn('Autoplay bloqueado, aguardando interação do usuário');
                
                // Tentar reproduzir após primeiro scroll ou clique
                const tryPlay = () => {
                    video.play().catch(() => {});
                    document.removeEventListener('scroll', tryPlay, { once: true });
                    document.removeEventListener('click', tryPlay, { once: true });
                    document.removeEventListener('touchstart', tryPlay, { once: true });
                };
                
                document.addEventListener('scroll', tryPlay, { once: true, passive: true });
                document.addEventListener('click', tryPlay, { once: true });
                document.addEventListener('touchstart', tryPlay, { once: true });
            });
    }

    // Pausar vídeo quando a aba não está visível (economia de recursos)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            video.pause();
        } else {
            video.play().catch(() => {});
        }
    });
}