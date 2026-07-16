/* Hafil portfolio — light interactions (mobile + desktop safe) */
(function () {
  "use strict";

  const qs = (s, r = document) => r.querySelector(s);
  const qsa = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setActiveNav() {
    const file = (location.pathname.split("/").pop() || "index.html").toLowerCase() || "index.html";
    qsa("[data-nav]").forEach((a) => {
      const href = (a.getAttribute("href") || "").toLowerCase();
      a.classList.toggle("active", href === file);
    });
  }

  function initNav() {
    const toggle = qs("#nav-toggle");
    const nav = qs("#site-nav");
    if (!toggle || !nav) return;

    let scrim = qs(".nav-scrim");
    if (!scrim) {
      scrim = document.createElement("div");
      scrim.className = "nav-scrim";
      document.body.appendChild(scrim);
    }

    let lockY = 0;
    const setOpen = (open) => {
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) {
        lockY = window.scrollY || 0;
        document.body.style.top = `-${lockY}px`;
      } else {
        document.body.style.top = "";
        window.scrollTo(0, lockY);
      }
    };

    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      setOpen(!document.body.classList.contains("nav-open"));
    });
    scrim.addEventListener("click", () => setOpen(false));
    qsa("#site-nav a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });
  }

  function initReveals() {
    const nodes = qsa(".reveal");
    if (!nodes.length) return;
    if (reduce() || window.matchMedia("(max-width: 760px)").matches) {
      nodes.forEach((n) => n.classList.add("in"));
      qsa(".skill-fill").forEach((f) => {
        f.style.width = (f.dataset.value || 0) + "%";
      });
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          e.target.querySelectorAll(".skill-fill").forEach((f) => {
            f.style.width = (f.dataset.value || 0) + "%";
          });
          io.unobserve(e.target);
        });
      },
      { threshold: 0.12 }
    );
    nodes.forEach((n) => io.observe(n));
  }

  function initChoices() {
    qsa(".choices[data-pick]").forEach((group) => {
      group.addEventListener("click", (e) => {
        const chip = e.target.closest(".choice");
        if (!chip || !group.contains(chip)) return;
        const multi = group.dataset.pick === "multi";
        if (!multi) {
          qsa(".choice", group).forEach((c) => c.classList.remove("is-on"));
          chip.classList.add("is-on");
        } else {
          chip.classList.toggle("is-on");
        }
      });
    });
  }

  function initYear() {
    const y = qs("#year");
    if (y) y.textContent = new Date().getFullYear();
  }

  function init() {
    setActiveNav();
    initNav();
    initReveals();
    initChoices();
    initYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
