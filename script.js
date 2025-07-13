document.addEventListener("DOMContentLoaded", () => {
    // —— Testimonial Carousel ——
    const cards = document.querySelectorAll(".card");
    let current = 0;

    function updateActiveCard(idx, dir) {
        cards.forEach((c, i) => {
            c.classList.remove("active", "flip-left", "flip-right");
            if (i === idx) {
                c.classList.add("active", dir === "next" ? "flip-right" : "flip-left");
            }
        });
    }

    if (cards.length > 0) {
        updateActiveCard(current, "next");
        document.getElementById("nextBtn")?.addEventListener("click", () => {
            current = (current + 1) % cards.length;
            updateActiveCard(current, "next");
        });
        document.getElementById("prevBtn")?.addEventListener("click", () => {
            current = (current - 1 + cards.length) % cards.length;
            updateActiveCard(current, "prev");
        });
    }

    // —— Scroll-header and Scroll-Spy ——
    const header = document.querySelector("header");
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        header?.classList.toggle("scrolled", window.scrollY > 10);
    }, { passive: true });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(l => l.classList.remove("active"));
                const targetLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                targetLink?.classList.add("active");
            }
        });
    }, { threshold: 0.6 });

    sections.forEach(section => observer.observe(section));

    // —— Mobile menu & modal ——
    const menuBtn = document.querySelector(".menu");
    const modal = document.querySelector(".modal");
    const closeBtn = document.querySelector(".modal .close-btn");

    if (menuBtn && modal && closeBtn) {
        menuBtn.addEventListener("click", () => {
            modal.classList.toggle("active");
        });

        closeBtn.addEventListener("click", () => {
            modal.classList.remove("active");
        });

        window.addEventListener("click", e => {
            if (
                modal.classList.contains("active") &&
                !modal.contains(e.target) &&
                !menuBtn.contains(e.target)
            ) {
                modal.classList.remove("active");
            }
        });

        modal.querySelectorAll(".nav-link").forEach(link =>
            link.addEventListener("click", () => {
                modal.classList.remove("active");
            })
        );
    } else {
        console.error("Modal/menu elements not found – check your selectors!");
    }

    // —— Optional WhatsApp ——
    const whatsappIcon = document.getElementById("whatsapp-icon");
    if (whatsappIcon) {
        whatsappIcon.addEventListener("click", () => {
            const num = "7303938001";
            const msg = "Hello, I need assistance.";
            window.open(`https://wa.me/${num}?text=${encodeURIComponent(msg)}`, "_blank");
        });
    }

    const toggleButton = document.getElementById("theme-toggle");
    const toggleButtonModal = document.getElementById("theme-toggle-modal");
    const logoImg = document.getElementById("logo-img");
    const favicon = document.getElementById("favicon");
    const body = document.body;

    // Function to toggle theme and update favicon
    function toggleTheme(source) {
        body.classList.toggle("light-mode");
        source.classList.toggle("rotated");
        const lightLogo = "images/Logo-light.png";
        const darkLogo = "images/Logo-dark.png";
        const isLight = body.classList.contains("light-mode");

        // Update favicon (force refresh)
        favicon.href = (isLight ? lightLogo : darkLogo) + "?v=" + new Date().getTime();

        // Update header logo
        logoImg.src = isLight ? lightLogo : darkLogo;
    }

    // Main toggle button event
    if (toggleButton) {
        toggleButton.addEventListener("click", () => toggleTheme(toggleButton));
    }

    // Modal toggle button event
    if (toggleButtonModal) {
        toggleButtonModal.addEventListener("click", () => toggleTheme(toggleButtonModal));
    }


    // —— Globe resize ——
    const cover = document.querySelector('.cover');
    const robot3d = document.querySelector('.robot-3d');
    const editControls = document.querySelector('.edit-controls');

    document.getElementById('edit-yes').addEventListener('click', () => {
        cover.style.zIndex = '-2';
        robot3d.style.pointerEvents = 'auto'; // allow interaction
        editControls.style.display = 'block';
    });

    document.getElementById('edit-no').addEventListener('click', () => {
        cover.classList.remove('hovered');
        setTimeout(() => {
            cover.classList.add('hovered');
        }, 5000);

    });

    document.getElementById('done-editing').addEventListener('click', () => {
        cover.style.zIndex = '1';
        robot3d.style.pointerEvents = 'none';
        editControls.style.display = 'none';
    });


    // —— Footer Year Update ——
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // —— Scroll on globe ——
    let isHoveringGlobe = false;

    robot3d.addEventListener('mouseenter', () => isHoveringGlobe = true);
    robot3d.addEventListener('mouseleave', () => isHoveringGlobe = false);

    window.addEventListener('wheel', (e) => {
        if (isHoveringGlobe && robot3d.style.pointerEvents === 'auto') {
            e.preventDefault();
        }
    }, { passive: false });


    // —— AOS Init ——
    AOS.init();

});