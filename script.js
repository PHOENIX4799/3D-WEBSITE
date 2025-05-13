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
    updateActiveCard(current, "next");
    document.getElementById("nextBtn")
        .addEventListener("click", () => {
            current = (current + 1) % cards.length;
            updateActiveCard(current, "next");
        });
    document.getElementById("prevBtn")
        .addEventListener("click", () => {
            current = (current - 1 + cards.length) % cards.length;
            updateActiveCard(current, "prev");
        });

    // —— Scroll-header and Scroll-Spy ——
    const header = document.querySelector("header");
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 10);
    });

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

    if (!menuBtn || !modal || !closeBtn) {
        console.error("Modal/menu elements not found – check your selectors!");
    } else {
        // Toggle modal open/close
        menuBtn.addEventListener("click", () => {
            modal.classList.toggle("active");
        });

        // Close btn
        closeBtn.addEventListener("click", () => {
            modal.classList.remove("active");
        });

        // Click outside
        window.addEventListener("click", e => {
            if (
                modal.classList.contains("active") &&
                !modal.contains(e.target) &&
                !menuBtn.contains(e.target)
            ) {
                modal.classList.remove("active");
            }
        });

        // —— NEW: close modal when clicking any link inside it ——
        modal
            .querySelectorAll(".nav-link")
            .forEach(link =>
                link.addEventListener("click", () => {
                    modal.classList.remove("active");
                })
            );
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

    // —— Auto-play audio ——
    document.getElementById("pageAudio")?.play();

    // —— footer ——
    document.getElementById('current-year')
          .textContent = new Date().getFullYear();
});

