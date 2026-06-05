const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.9;

  reveals.forEach((item) => {
    const itemTop = item.getBoundingClientRect().top;

    if (itemTop < triggerBottom) {
      item.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  });
}

document.querySelectorAll("#navLinks a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks) {
      navLinks.classList.remove("active");
    }
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

const scrollTopBtn = document.getElementById("scrollTopBtn");

if (scrollTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 120) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// Image viewer: stop artwork images opening as separate files
document.addEventListener("DOMContentLoaded", () => {
  const viewer = document.createElement("div");
  viewer.className = "image-viewer";
  viewer.innerHTML = `
    <button class="image-viewer-close" type="button" aria-label="Close image">×</button>
    <img src="" alt="Artwork preview">
  `;

  document.body.appendChild(viewer);

  const viewerImage = viewer.querySelector("img");
  const closeButton = viewer.querySelector(".image-viewer-close");

  function openViewer(imageUrl, imageAlt) {
    viewerImage.src = imageUrl;
    viewerImage.alt = imageAlt || "Artwork preview";
    viewer.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeViewer() {
    viewer.classList.remove("active");
    viewerImage.src = "";
    document.body.style.overflow = "";
  }

  document.addEventListener("click", (event) => {
    const imageLink = event.target.closest(
      'a[href$=".jpg"], a[href$=".jpeg"], a[href$=".png"], a[href$=".webp"]'
    );

    if (!imageLink) return;

    event.preventDefault();

    const imageUrl = imageLink.getAttribute("href");
    const imageAlt =
      imageLink.querySelector("img")?.getAttribute("alt") || "Artwork preview";

    openViewer(imageUrl, imageAlt);
  });

  closeButton.addEventListener("click", closeViewer);

  viewer.addEventListener("click", (event) => {
    if (event.target === viewer) {
      closeViewer();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && viewer.classList.contains("active")) {
      closeViewer();
    }
  });
});