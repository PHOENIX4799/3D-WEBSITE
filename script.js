document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card');
    let current = 0;

    function updateActiveCard(index, direction) {
        cards.forEach((card, i) => {
            card.classList.remove('active', 'flip-left', 'flip-right');
            if (i === index) {
                card.classList.add('active');
                // Trigger animation
                card.classList.add(direction === 'next' ? 'flip-right' : 'flip-left');
            }
        });
    }

    // Initial state
    updateActiveCard(current, 'next');

    document.getElementById('nextBtn').addEventListener('click', () => {
        current = (current + 1) % cards.length;
        updateActiveCard(current, 'next');
    });

    document.getElementById('prevBtn').addEventListener('click', () => {
        current = (current - 1 + cards.length) % cards.length;
        updateActiveCard(current, 'prev');
    });
});


window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 10) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target.getAttribute("id");
        const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove("active"));
            navLink.classList.add("active");
        }
    });
}, {
    threshold: 0.6
});

sections.forEach(section => observer.observe(section));

document.getElementById("whatsapp-icon").addEventListener("click", function () {
    const whatsappNumber = "7303938001"; // Replace with your actual number
    const message = "Hello, I need assistance.";
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp link in a new tab
    window.open(whatsappLink, "_blank");
});

document.addEventListener("DOMContentLoaded", function() {
    const menuButton = document.querySelector(".menu"); // Select menu icon
    const modal = document.querySelector(".modal"); // Select modal
    const closeButton = document.querySelector(".close-btn"); // Select close button

    // Ensure menuButton exists before attaching event listener
    if (menuButton) {
        menuButton.addEventListener("click", function() {
            modal.classList.add("active"); // Show modal
        });
    }

    if (closeButton) {
        closeButton.addEventListener("click", function() {
            modal.classList.remove("active"); // Hide modal
        });
    }

    // Close modal when clicking outside of it
    window.addEventListener("click", function(event) {
        if (modal.classList.contains("active") && !modal.contains(event.target) && event.target !== menuButton) {
            modal.classList.remove("active");
        }
    });
});

