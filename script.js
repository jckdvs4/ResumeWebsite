document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animations using Intersection Observer
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Fade in elements on scroll
    // Fade in elements on scroll
    const fadeElements = document.querySelectorAll('.fade-in-section');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // Also observe sections that might not have the class yet (or stick to the class based approach)
    document.querySelectorAll('.section').forEach(section => {
        if (!section.classList.contains('fade-in-section')) {
            section.classList.add('fade-in-section');
        }
        observer.observe(section);
    });

    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.nav-links li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const id = section.getAttribute('id');
            if (!id) return;
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = id;
            }
        });

        if (current) {
            navLi.forEach(a => {
                a.classList.remove('active');
                const href = a.getAttribute('href');
                if (href && href.startsWith('#') && href.includes(current)) {
                    a.classList.add('active');
                }
            });
        }
    });

    // Handle Video Placeholders (YouTube & Instagram)
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    videoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', () => {
            const videoId = placeholder.getAttribute('data-video-id');
            const instagramId = placeholder.getAttribute('data-instagram-id');
            const iframe = document.createElement('iframe');

            if (instagramId) {
                const cleanId = instagramId.replace(/^\/(reel|p)\//, '').replace(/\/$/, '');
                iframe.setAttribute('src', `https://www.instagram.com/p/${cleanId}/embed`);
                iframe.setAttribute('title', 'Instagram video player');
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('scrolling', 'no');
                iframe.setAttribute('allowtransparency', 'true');
                iframe.setAttribute('allowfullscreen', '');
            } else if (videoId) {
                iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1`);
                iframe.setAttribute('title', 'YouTube video player');
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
                iframe.setAttribute('allowfullscreen', '');
            }

            placeholder.innerHTML = '';
            placeholder.appendChild(iframe);
        });
    });

    // Handle Profile Avatar Lightbox Modal
    const avatarSm = document.querySelector('.profile-avatar-sm');
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    if (avatarSm && lightbox && lightboxImg) {
        avatarSm.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            lightboxImg.src = avatarSm.src;
        });

        lightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    }
});
