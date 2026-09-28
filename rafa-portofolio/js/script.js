/* =========================================================
   RAFA PORTFOLIO
   JAVASCRIPT V1
========================================================= */

/* =========================================================
   01. ELEMENT SELECTORS
========================================================= */

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

const navbar = document.querySelector(".navbar");

const navLinks = document.querySelectorAll(".nav-link");

const sections = document.querySelectorAll("section");

/* =========================================================
   02. MOBILE NAVIGATION
========================================================= */

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");

    menuToggle.classList.toggle("active");
  });
}

/* =========================================================
   03. CLOSE MOBILE MENU
========================================================= */

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");

    menuToggle.classList.remove("active");
  });
});

/* =========================================================
   04. NAVBAR SCROLL EFFECT
========================================================= */

window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;

  if (scrollPosition > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

/* =========================================================
   05. ACTIVE NAVIGATION
========================================================= */

const updateActiveNavigation = () => {
  const scrollPosition = window.scrollY + 150;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;

    const sectionHeight = section.offsetHeight;

    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
      });

      const activeLink = document.querySelector(
        `.nav-link[href="#${sectionId}"]`,
      );

      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  });
};

window.addEventListener("scroll", updateActiveNavigation);

/* =========================================================
   06. SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
  ".section-heading, .skill-card, .project-card, .service-card, .timeline-item, .case-study-placeholder, .contact-wrapper",
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");

        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  },
);

revealElements.forEach((element) => {
  element.classList.add("reveal");

  revealObserver.observe(element);
});

/* =========================================================
   07. PAGE READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("page-loaded");
});

/* =========================================================
   08. CURSOR AMBIENT GLOW
========================================================= */

const cursorGlow = document.createElement("div");

cursorGlow.classList.add("cursor-glow");

document.body.appendChild(cursorGlow);

window.addEventListener("mousemove", (event) => {
  cursorGlow.style.left = `${event.clientX}px`;

  cursorGlow.style.top = `${event.clientY}px`;

  document.body.classList.add("cursor-active");
});

window.addEventListener("mouseleave", () => {
  document.body.classList.remove("cursor-active");
});
/* =========================================================
   09. CARD SPOTLIGHT
========================================================= */

const interactiveCards = document.querySelectorAll(
  ".skill-card, .project-card, .service-card",
);

interactiveCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width) * 100;

    const y = ((event.clientY - rect.top) / rect.height) * 100;

    card.style.setProperty("--mouse-x", `${x}%`);

    card.style.setProperty("--mouse-y", `${y}%`);
  });
});

/* =========================================================
   10. MAGNETIC BUTTON
========================================================= */

const magneticButtons = document.querySelectorAll(".button");

magneticButtons.forEach((button) => {
  button.addEventListener("mousemove", (event) => {
    const rect = button.getBoundingClientRect();

    const x = event.clientX - rect.left - rect.width / 2;

    const y = event.clientY - rect.top - rect.height / 2;

    button.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "translate(0, 0)";
  });
});

/* =========================================================
   11. HERO PARALLAX AND 3D TILT
========================================================= */

const profileScene = document.getElementById("profile-scene");

if (profileScene) {
  let targetX = 0;
  let targetY = 0;
  let targetRotateX = 0;
  let targetRotateY = 0;

  let currentX = 0;
  let currentY = 0;
  let currentRotateX = 0;
  let currentRotateY = 0;

  window.addEventListener("pointermove", (event) => {
    const rect = profileScene.getBoundingClientRect();
    const normalizedX = event.clientX / window.innerWidth - 0.5;
    const normalizedY = event.clientY / window.innerHeight - 0.5;
    const sceneX = (event.clientX - rect.left) / rect.width - 0.5;
    const sceneY = (event.clientY - rect.top) / rect.height - 0.5;

    targetX = normalizedX * 18;
    targetY = normalizedY * 18;
    targetRotateX = sceneY * -10;
    targetRotateY = sceneX * 10;
  });

  window.addEventListener("pointerleave", () => {
    targetX = 0;
    targetY = 0;
    targetRotateX = 0;
    targetRotateY = 0;
  });

  function animateProfileScene() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    currentRotateX += (targetRotateX - currentRotateX) * 0.08;
    currentRotateY += (targetRotateY - currentRotateY) * 0.08;

    profileScene.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`;

    requestAnimationFrame(animateProfileScene);
  }

  animateProfileScene();
}
