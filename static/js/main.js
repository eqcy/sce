const navLinks = [...document.querySelectorAll(".site-nav a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setActiveNav = () => {
  const offset = window.scrollY + 140;
  let current = sections[0]?.id;

  sections.forEach((section) => {
    if (section.offsetTop <= offset) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
};

window.addEventListener("scroll", setActiveNav, { passive: true });
setActiveNav();

const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.hidden = true;
lightbox.innerHTML = '<button type="button" aria-label="Close image preview">&times;</button><img alt="">';
document.body.appendChild(lightbox);

const lightboxImage = lightbox.querySelector("img");
const closeButton = lightbox.querySelector("button");

document.querySelectorAll("figure img").forEach((image) => {
  image.addEventListener("click", () => {
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.hidden = false;
  });
});

const closeLightbox = () => {
  lightbox.hidden = true;
  lightboxImage.removeAttribute("src");
};

closeButton.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lightbox.hidden) {
    closeLightbox();
  }
});
