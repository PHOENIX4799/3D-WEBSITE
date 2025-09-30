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

function initHeader() {
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.getElementById("mobileNav");

  menuToggle.addEventListener("click", () => {
    mobileNav.classList.toggle("show");
    menuToggle.querySelector("i").classList.toggle("bx-menu");
    menuToggle.querySelector("i").classList.toggle("bx-x");
  });

  mobileNav.addEventListener("click", (e) => {
    if (e.target === mobileNav) {
      mobileNav.classList.remove("show");
      menuToggle.querySelector("i").classList.add("bx-menu");
      menuToggle.querySelector("i").classList.remove("bx-x");
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
