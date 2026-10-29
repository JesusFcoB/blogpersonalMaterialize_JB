document.addEventListener("DOMContentLoaded", function () {
  const themeButtons = document.querySelectorAll("[data-theme-toggle]");
  const savedTheme = localStorage.getItem("blog-theme");
  const initialTheme = savedTheme === "dark" ? "dark" : "light";

  function applyTheme(theme) {
    const isDark = theme === "dark";
    document.body.dataset.theme = theme;

    themeButtons.forEach(function (button) {
      button.setAttribute("aria-pressed", String(isDark));
      button.setAttribute("aria-label", isDark ? "Activar modo claro" : "Activar modo oscuro");
      button.querySelector(".material-icons").textContent = isDark ? "light_mode" : "dark_mode";

      const label = button.querySelector("span");
      if (label) {
        label.textContent = isDark ? "Modo claro" : "Modo oscuro";
      }
    });
  }

  applyTheme(initialTheme);

  themeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
      localStorage.setItem("blog-theme", nextTheme);
      applyTheme(nextTheme);
    });
  });

  M.Sidenav.init(document.querySelectorAll(".sidenav"));
  M.Parallax.init(document.querySelectorAll(".parallax"));
  M.Modal.init(document.querySelectorAll(".modal"));

  const form = document.getElementById("formulario-contacto");
  const status = document.getElementById("estado-formulario");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    status.textContent = "Los datos son válidos. Este formulario de demostración no envía mensajes.";
    M.toast({ html: "Formulario validado correctamente" });
    form.reset();
    M.updateTextFields();
  });
});
