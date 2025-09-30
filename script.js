document.addEventListener("DOMContentLoaded", () => {
  fetch("header.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("header").innerHTML = data;

      initHeader();
    });

  fetch("footer.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("footer").innerHTML = data;
      initFooter();
    });

  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.3s ease";
    document.body.style.opacity = "1";
  }, 50);
});

const labels = document.querySelectorAll(".lables p");
const forms = {
  "lable-text1": document.querySelector(".form-general"),
  "lable-text2": document.querySelector(".form-orders"),
  "lable-text3": document.querySelector(".form-support"),
  "lable-text4": document.querySelector(".form-info"),
};

labels.forEach((label) => {
  label.addEventListener("click", () => {
    labels.forEach((l) => l.classList.remove("active"));
    label.classList.add("active");
    Object.values(forms).forEach((f) => (f.style.display = "none"));
    const className = label.classList[0];
    forms[className].style.display = "block";
  });
});

const customSelects = document.querySelectorAll(".custom-select");

customSelects.forEach((select) => {
  const selected = select.querySelector(".selected");
  const optionsContainer = select.querySelector(".options");
  const options = optionsContainer.querySelectorAll("div");

  // Toggle dropdown
  selected.addEventListener("click", () => {
    optionsContainer.style.display =
      optionsContainer.style.display === "block" ? "none" : "block";
  });

  // Select option
  options.forEach((option) => {
    option.addEventListener("click", () => {
      selected.textContent = option.dataset.value;
      selected.style.color = "#0b1b22";
      optionsContainer.style.display = "none";
    });
  });
});

// Close dropdown if clicked outside
document.addEventListener("click", (e) => {
  customSelects.forEach((select) => {
    if (!select.contains(e.target)) {
      select.querySelector(".options").style.display = "none";
    }
  });
});

function initHeader() {
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.getElementById("mobileNav");
  const navLinks = document.querySelectorAll(".mobile-navbar .nav-link");

  // Toggle mobile menu
  menuToggle.addEventListener("click", () => {
    mobileNav.classList.toggle("show");
    menuToggle.querySelector("i").classList.toggle("bx-menu");
    menuToggle.querySelector("i").classList.toggle("bx-x");
  });

  // Close menu when clicking outside
  mobileNav.addEventListener("click", (e) => {
    if (e.target === mobileNav) {
      mobileNav.classList.remove("show");
      menuToggle.querySelector("i").classList.add("bx-menu");
      menuToggle.querySelector("i").classList.remove("bx-x");
    }
  });

  // Highlight clicked nav link
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // ✅ Auto-highlight current page based on URL
  const currentPage = window.location.pathname.split("/").pop(); // e.g. "about.html"
  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage || (href === "index.html" && currentPage === "")) {
      link.classList.add("active");
    }
  });
}

// ==========================
// Footer Functionality
// ==========================
function initFooter() {
  const footer = document.getElementById("siteFooter");
  const toggle = document.getElementById("footerToggle");

  if (footer && toggle) {
    toggle.addEventListener("click", () => {
      footer.classList.toggle("expanded");
    });
  }
}
