/* =========================================================
   RAFA MIRZA FIRDAUS — PORTFOLIO
   MAIN JAVASCRIPT
   Interactive / Parallax / Navigation / Reveal
========================================================= */

"use strict";

/* =========================================================
   01. DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initParallax();
  initMagneticElements();
  initCursor();
  initActiveNavigation();
  initSmoothScroll();
  initTiltCards();
  initThemeSwitch();
});

/* =========================================================
   02. PAGE LOADER
========================================================= */

function initLoader() {
  const loader = document.querySelector(".page-loader");

  if (!loader) return;

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("loaded");
    }, 1000);
  });
}

/* =========================================================
   03. NAVBAR SCROLL
========================================================= */

function initNavbar() {
  const header = document.querySelector(".site-header");

  if (!header) return;

  function updateNavbar() {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  updateNavbar();

  window.addEventListener("scroll", updateNavbar, { passive: true });
}

/* =========================================================
   04. MOBILE MENU
========================================================= */

function initMobileMenu() {
  const menuButton = document.querySelector(".menu-toggle");

  const navMenu = document.querySelector(".nav-menu");

  if (!menuButton || !navMenu) return;

  menuButton.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("active");

    menuButton.classList.toggle("active", isOpen);

    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  /* Close menu after clicking navigation */

  const navLinks = navMenu.querySelectorAll("a");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");

      menuButton.classList.remove("active");

      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

/* =========================================================
   05. SCROLL REVEAL
========================================================= */

function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger",
  );

  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("active");

        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,

      rootMargin: "0px 0px -60px 0px",
    },
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
}

/* =========================================================
   06. REAL SCROLL PARALLAX
========================================================= */

/*
    Elemen HTML:

    class="parallax"
    data-speed="0.15"

    Semakin kecil speed,
    semakin lambat gerakannya.

    Contoh:

    data-speed="0.10"
    data-speed="0.20"
    data-speed="0.35"
*/

function initParallax() {
  const elements = document.querySelectorAll("[data-speed]");

  if (!elements.length) return;

  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;

    elements.forEach((element) => {
      const speed = parseFloat(element.dataset.speed) || 0.1;

      const rect = element.getBoundingClientRect();

      const elementCenter = rect.top + rect.height / 2;

      const viewportCenter = window.innerHeight / 2;

      const distance = elementCenter - viewportCenter;

      const movement = distance * speed;

      element.style.setProperty("--parallax-y", `${movement}px`);
    });

    ticking = false;
  }

  function requestParallaxUpdate() {
    if (ticking) return;

    ticking = true;

    requestAnimationFrame(updateParallax);
  }

  updateParallax();

  window.addEventListener("scroll", requestParallaxUpdate, { passive: true });

  window.addEventListener("resize", requestParallaxUpdate, { passive: true });
}

/* =========================================================
   07. MOUSE PARALLAX
========================================================= */

/*
   Elemen dengan:

   data-mouse-x
   data-mouse-y

   akan bergerak mengikuti mouse.

   Contoh:

   data-mouse-x="15"
   data-mouse-y="10"
*/

function initMouseParallax() {
  const elements = document.querySelectorAll("[data-mouse-x], [data-mouse-y]");

  if (!elements.length) return;

  window.addEventListener(
    "mousemove",
    (event) => {
      const x = event.clientX / window.innerWidth - 0.5;

      const y = event.clientY / window.innerHeight - 0.5;

      elements.forEach((element) => {
        const intensityX = parseFloat(element.dataset.mouseX) || 0;

        const intensityY = parseFloat(element.dataset.mouseY) || 0;

        element.style.transform = `translate3d(
                        ${x * intensityX}px,
                        ${y * intensityY}px,
                        0
                    )`;
      });
    },
    { passive: true },
  );
}

/* =========================================================
   08. MAGNETIC ELEMENT
========================================================= */

function initMagneticElements() {
  const elements = document.querySelectorAll(".magnetic");

  if (!elements.length) return;

  elements.forEach((element) => {
    element.addEventListener("mousemove", (event) => {
      const rect = element.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;

      const centerY = rect.top + rect.height / 2;

      const x = (event.clientX - centerX) * 0.18;

      const y = (event.clientY - centerY) * 0.18;

      element.style.transform = `translate3d(
                        ${x}px,
                        ${y}px,
                        0
                    )`;
    });

    element.addEventListener("mouseleave", () => {
      element.style.transform = "translate3d(0, 0, 0)";
    });
  });
}

/* =========================================================
   09. CUSTOM CURSOR
========================================================= */

function initCursor() {
  const dot = document.querySelector(".cursor-dot");

  const outline = document.querySelector(".cursor-outline");

  if (!dot || !outline) return;

  /*
       Cursor tidak dijalankan pada perangkat
       touch karena tidak diperlukan.
    */

  if (window.matchMedia("(pointer: coarse)").matches) {
    return;
  }

  let mouseX = 0;
  let mouseY = 0;

  let outlineX = 0;
  let outlineY = 0;

  window.addEventListener(
    "mousemove",
    (event) => {
      mouseX = event.clientX;

      mouseY = event.clientY;

      dot.style.left = `${mouseX}px`;

      dot.style.top = `${mouseY}px`;
    },
    { passive: true },
  );

  function animateCursor() {
    outlineX += (mouseX - outlineX) * 0.15;

    outlineY += (mouseY - outlineY) * 0.15;

    outline.style.left = `${outlineX}px`;

    outline.style.top = `${outlineY}px`;

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  /*
       Interactive elements
    */

  const interactiveElements = document.querySelectorAll(
    "a, button, input, textarea, .glass-card, .orbit-logo",
  );

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      outline.classList.add("cursor-hover");
    });

    element.addEventListener("mouseleave", () => {
      outline.classList.remove("cursor-hover");
    });
  });
}

/* =========================================================
   10. ACTIVE NAVIGATION
========================================================= */

function initActiveNavigation() {
  const sections = document.querySelectorAll("section[id]");

  const links = document.querySelectorAll(".nav-link");

  if (!sections.length || !links.length) return;

  function updateActiveNavigation() {
    const scrollPosition = window.scrollY + window.innerHeight * 0.35;

    sections.forEach((section) => {
      const top = section.offsetTop;

      const height = section.offsetHeight;

      const id = section.getAttribute("id");

      if (scrollPosition >= top && scrollPosition < top + height) {
        links.forEach((link) => {
          link.classList.remove("active");

          const target = link.getAttribute("href");

          if (target === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  updateActiveNavigation();

  window.addEventListener("scroll", updateActiveNavigation, { passive: true });
}

/* =========================================================
   11. SMOOTH SCROLL
========================================================= */

function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
}

/* =========================================================
   12. CARD TILT
========================================================= */

function initTiltCards() {
  const cards = document.querySelectorAll("[data-tilt]");

  if (!cards.length) return;

  if (window.matchMedia("(pointer: coarse)").matches) {
    return;
  }

  cards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;

      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;

      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4;

      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `
                    perspective(900px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-6px)
                    `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

/* =========================================================
   13. ORBIT SAFETY
========================================================= */

/*
   Mencegah orbit menjadi terlalu besar
   pada layar kecil.
*/

function initOrbitSafety() {
  const orbits = document.querySelectorAll(".profile-orbit");

  if (!orbits.length) return;

  function updateOrbit() {
    const width = window.innerWidth;

    orbits.forEach((orbit) => {
      if (width <= 380) {
        orbit.style.animationDuration = "30s";
      } else if (width <= 640) {
        orbit.style.animationDuration = "26s";
      } else {
        orbit.style.animationDuration = "";
      }
    });
  }

  updateOrbit();

  window.addEventListener("resize", updateOrbit, { passive: true });
}

/* =========================================================
   14. INITIALIZE EXTRA SYSTEMS
========================================================= */

initMouseParallax();
initOrbitSafety();

/* =========================================================
   15. PERFORMANCE VISIBILITY
========================================================= */

/*
   Ketika tab tidak aktif,
   beberapa sistem animasi berat dihentikan
   oleh browser secara alami.

   Kita juga memberi class pada body.
*/

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    document.body.classList.add("page-hidden");
  } else {
    document.body.classList.remove("page-hidden");
  }
});
/* =========================================================
   THEME SWITCH
========================================================= */

function initThemeSwitch() {
  const themeToggle = document.querySelector("#themeToggle");

  if (!themeToggle) return;

  const savedTheme = localStorage.getItem("rafa-theme");

  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  } else {
    /*
           Mengikuti preferensi sistem
           apabila user belum pernah
           memilih theme.
        */

    const prefersLight = window.matchMedia(
      "(prefers-color-scheme: light)",
    ).matches;

    if (prefersLight) {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");

    const newTheme = currentTheme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", newTheme);

    localStorage.setItem("rafa-theme", newTheme);
  });
}
// =========================================
// PAGE LOADER
// =========================================

window.addEventListener("load", () => {
    const loader = document.getElementById("page-loader");

    if (!loader) return;

    setTimeout(() => {
        loader.classList.add("loaded");

        setTimeout(() => {
            loader.remove();
        }, 500);

    }, 500);
});
// =========================================
// THEME SWITCHER
// =========================================

document.addEventListener("DOMContentLoaded", () => {
    const themeToggle =
        document.querySelector("#theme-toggle") ||
        document.querySelector(".theme-toggle") ||
        document.querySelector("[data-theme-toggle]");

    if (!themeToggle) {
        console.warn("Theme toggle tidak ditemukan.");
        return;
    }

    const savedTheme = localStorage.getItem("rafa-theme");

    // Theme awal
    if (savedTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
    }

    themeToggle.addEventListener("click", () => {
        const currentTheme =
            document.documentElement.getAttribute("data-theme");

        const newTheme =
            currentTheme === "light" ? "dark" : "light";

        document.documentElement.setAttribute("data-theme", newTheme);

        localStorage.setItem("rafa-theme", newTheme);
    });
});
// =========================================
// FORMSPREE CONTACT FORM
// =========================================

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        const originalText = submitButton.textContent;

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        formStatus.textContent = "";
        formStatus.className = "form-status";

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json"
                }
            });

            if (response.ok) {
                formStatus.textContent =
                    "Message sent successfully. Thank you!";

                formStatus.classList.add("success");

                contactForm.reset();
            } else {
                const data = await response.json();

                if (data.errors) {
                    formStatus.textContent =
                        data.errors
                            .map(error => error.message)
                            .join(", ");
                } else {
                    formStatus.textContent =
                        "Something went wrong. Please try again.";
                }

                formStatus.classList.add("error");
            }
        } catch (error) {
            formStatus.textContent =
                "Unable to send message. Please check your connection.";

            formStatus.classList.add("error");
        }

        submitButton.disabled = false;
        submitButton.textContent = originalText;
    });
}