const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");
const navOverlay = document.querySelector("[data-nav-overlay]");

const closeNav = () => {
  document.body.classList.remove("nav-open");
  if (navToggle) {
    navToggle.setAttribute("aria-expanded", "false");
  }
};

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  navMenu.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      closeNav();
    }
  });

  if (navOverlay) {
    navOverlay.addEventListener("click", closeNav);
  }

  document.addEventListener("click", (event) => {
    if (!document.body.classList.contains("nav-open")) {
      return;
    }
    const isClickInside = navMenu.contains(event.target) || navToggle.contains(event.target);
    if (!isClickInside) {
      closeNav();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNav();
    }
  });
}

const form = document.querySelector("#contact-form");

if (form) {
  const statusMessage = document.querySelector("#form-message");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const fields = [
      { id: "name", message: "Veuillez indiquer votre nom." },
      { id: "email", message: "Veuillez indiquer une adresse email valide." },
      { id: "message", message: "Veuillez écrire votre message." },
    ];

    let hasErrors = false;

    fields.forEach((field) => {
      const input = document.querySelector(`#${field.id}`);
      const error = document.querySelector(`[data-error-for="${field.id}"]`);
      const value = input.value.trim();

      if (!value) {
        error.textContent = field.message;
        hasErrors = true;
      } else if (field.id === "email" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
        error.textContent = field.message;
        hasErrors = true;
      } else {
        error.textContent = "";
      }
    });

    if (hasErrors) {
      if (statusMessage) {
        statusMessage.classList.remove("show");
        statusMessage.textContent = "";
      }
      return;
    }

    if (statusMessage) {
      statusMessage.textContent = "Merci ! Votre message a bien été envoyé.";
      statusMessage.classList.add("show");
    }

    form.reset();
  });
}
