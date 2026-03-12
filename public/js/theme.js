    (function () {
  const STORAGE_KEY = "frbk-theme"; // "light" | "dark" | null
  const root = document.documentElement;

  function apply(theme) {
    if (theme === "light" || theme === "dark") {
      root.setAttribute("data-theme", theme);
    } else {
      root.removeAttribute("data-theme"); // fall back til system
    }
  }

  const saved = localStorage.getItem(STORAGE_KEY);
  apply(saved);
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialDark = saved === "dark" || (!saved && systemDark);

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".theme-toggle");
    if (!btn) return;

    const current = root.getAttribute("data-theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = current === "dark" || (!current && systemDark);
    const next = isDark ? "light" : "dark";

    root.setAttribute("data-theme", next);
    localStorage.setItem(STORAGE_KEY, next);

    btn.setAttribute("aria-pressed", String(next === "dark"));
    btn.classList.remove("is-toggling");
    void btn.offsetWidth;
    btn.classList.add("is-toggling");
  });

  const nav = document.querySelector(".site-nav");
  const menuBtn = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const themeBtn = document.querySelector(".theme-toggle");
  const CHAT_REVEAL_SCROLL = 220;
  const MOBILE_CHAT_REVEAL_SCROLL = 280;

  function updateChatVisibility() {
    const menuOpen = document.body.classList.contains("nav-menu-open");
    const shouldReveal = menuOpen && window.scrollY > CHAT_REVEAL_SCROLL;
    const mobileCanShow = window.scrollY > MOBILE_CHAT_REVEAL_SCROLL;
    document.body.classList.toggle("nav-menu-scrolled", shouldReveal);
    document.body.classList.toggle("mobile-chat-visible", mobileCanShow);
  }

  if (themeBtn) {
    themeBtn.setAttribute("aria-pressed", String(initialDark));
  }

  if (nav && menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("nav-menu-open", isOpen);
      if (!isOpen) {
        document.body.classList.remove("nav-menu-scrolled");
      }
      updateChatVisibility();
    });

    navLinks.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        nav.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-menu-open");
        document.body.classList.remove("nav-menu-scrolled");
      }
    });
  }

  window.addEventListener("scroll", updateChatVisibility, { passive: true });
  updateChatVisibility();
})();
