    (function () {
  const STORAGE_KEY = "frbk-theme"; // "light" | "dark" | null
  const root = document.documentElement;

  function apply(theme) {
    if (theme === "light" || theme === "dark") {
      root.setAttribute("data-theme", theme);
    } else {
      root.removeAttribute("data-theme"); // fall back to system
    }
  }

  const saved = localStorage.getItem(STORAGE_KEY);
  apply(saved);

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".theme-toggle");
    if (!btn) return;

    const current = root.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";

    root.setAttribute("data-theme", next);
    localStorage.setItem(STORAGE_KEY, next);
  });
})();
