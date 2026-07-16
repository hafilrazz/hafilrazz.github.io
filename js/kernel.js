/* ============================================================
   HAFIL KERNEL — interactive UI (performance-tuned)
   Smooth on Windows desktop + mobile browsers
   ============================================================ */

(function () {
  "use strict";

  const BOOT_LINES = [
    { text: "HAFIL KERNEL v2.0.0  (build 2026.07)", cls: "info", delay: 0 },
    { text: "Initializing memory map ..............", cls: "ok", delay: 40 },
    { text: "Loading module: identity.ko ..........", cls: "ok", delay: 80 },
    { text: "Loading module: skills.ko ............", cls: "ok", delay: 120 },
    { text: "Loading module: projects.ko ..........", cls: "ok", delay: 160 },
    { text: "Mounting filesystem /home/hafil ......", cls: "ok", delay: 200 },
    { text: "Starting tty1 on virtual console .....", cls: "ok", delay: 240 },
    { text: "Network stack online .................", cls: "ok", delay: 280 },
    { text: "UI compositor ready ..................", cls: "ok", delay: 320 },
    { text: "Welcome, operator.", cls: "info", delay: 360 },
  ];

  const ROUTES = [
    { id: "home", label: "Home", hint: "cd ~", href: "index.html", keywords: "home root start" },
    { id: "about", label: "About", hint: "cd about", href: "about.html", keywords: "about bio identity" },
    { id: "skills", label: "Skills", hint: "cd skills", href: "skills.html", keywords: "skills stack tech" },
    { id: "projects", label: "Projects", hint: "cd projects", href: "projects.html", keywords: "projects work repos" },
    { id: "contact", label: "Contact", hint: "cd contact", href: "contact.html", keywords: "contact social connect" },
    { id: "github", label: "Open GitHub", hint: "external", href: "https://github.com/hafilrazz", keywords: "github code", external: true },
    { id: "linkedin", label: "Open LinkedIn", hint: "external", href: "https://www.linkedin.com/in/hafilrazz", keywords: "linkedin", external: true },
  ];

  /* ---------- capability profile ---------- */
  const mq = (q) => window.matchMedia(q).matches;
  const CAPS = {
    reduceMotion: mq("(prefers-reduced-motion: reduce)"),
    finePointer: mq("(hover: hover) and (pointer: fine)"),
    mobile: mq("(max-width: 900px)") || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent || ""),
    saveData: !!(navigator.connection && navigator.connection.saveData),
    lowEnd: (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4,
  };
  CAPS.lite = CAPS.reduceMotion || CAPS.mobile || CAPS.saveData || CAPS.lowEnd;
  CAPS.fx = !CAPS.lite && !CAPS.reduceMotion;
  CAPS.cursor = CAPS.finePointer && !CAPS.lite && !CAPS.reduceMotion;
  CAPS.pointerFX = CAPS.finePointer && !CAPS.mobile && !CAPS.reduceMotion;

  document.documentElement.classList.toggle("is-mobile", CAPS.mobile);
  document.documentElement.classList.toggle("is-lite", CAPS.lite);
  document.documentElement.classList.toggle("is-desktop", !CAPS.mobile);

  const qs = (s, r = document) => r.querySelector(s);
  const qsa = (s, r = document) => [...r.querySelectorAll(s)];

  function pageKey() {
    const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    return file || "index.html";
  }

  function toast(msg, ms = 1100) {
    let el = qs(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove("show"), ms);
  }

  function rafThrottle(fn) {
    let scheduled = false;
    let lastArgs;
    return function throttled(...args) {
      lastArgs = args;
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        fn.apply(this, lastArgs);
      });
    };
  }

  /* ---------- nav ---------- */
  function setActiveNav() {
    const current = pageKey();
    qsa("[data-nav]").forEach((el) => {
      const href = (el.getAttribute("href") || "").toLowerCase();
      el.classList.toggle(
        "active",
        href === current || (current === "" && href === "index.html")
      );
    });
  }

  function initMobileNav() {
    const toggle = qs("#nav-toggle");
    const nav = qs(".nav");
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
      // iOS-friendly scroll lock
      if (open) {
        lockY = window.scrollY || 0;
        document.body.style.top = `-${lockY}px`;
        document.body.classList.add("scroll-lock");
      } else {
        document.body.classList.remove("scroll-lock");
        document.body.style.top = "";
        window.scrollTo(0, lockY);
      }
    };

    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      setOpen(!document.body.classList.contains("nav-open"));
    });
    scrim.addEventListener("click", () => setOpen(false));
    qsa(".nav a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });
    const desk = window.matchMedia("(min-width: 901px)");
    const onChange = () => desk.matches && setOpen(false);
    desk.addEventListener ? desk.addEventListener("change", onChange) : desk.addListener(onChange);
  }

  /* ---------- clocks / scroll ---------- */
  function updateClock() {
    const el = qs("#sys-time");
    if (!el) return;
    const tick = () => {
      el.textContent = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
    };
    tick();
    // 1s is fine; pause when tab hidden
    let id = setInterval(tick, 1000);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        clearInterval(id);
      } else {
        tick();
        id = setInterval(tick, 1000);
      }
    });
  }

  function updateUptime() {
    const el = qs("#sys-uptime");
    if (!el) return;
    if (!sessionStorage.getItem("hk_boot_ts")) {
      sessionStorage.setItem("hk_boot_ts", String(Date.now()));
    }
    const start = Number(sessionStorage.getItem("hk_boot_ts"));
    const tick = () => {
      const sec = Math.floor((Date.now() - start) / 1000);
      el.textContent =
        String(Math.floor(sec / 60)).padStart(2, "0") +
        ":" +
        String(sec % 60).padStart(2, "0");
    };
    tick();
    setInterval(tick, 1000);
  }

  function initScrollProgress() {
    let bar = qs(".scroll-progress");
    if (!bar) {
      bar = document.createElement("div");
      bar.className = "scroll-progress";
      document.body.appendChild(bar);
    }
    const scrollEl = qs("#sys-scroll");
    const onScroll = rafThrottle(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      // use transform scaleX — cheaper than width
      bar.style.transform = `scaleX(${p})`;
      if (scrollEl) scrollEl.textContent = Math.round(p * 100) + "%";
    });
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- boot ---------- */
  function runBoot() {
    return new Promise((resolve) => {
      const screen = qs("#boot-screen");
      const shell = qs("#shell");
      const done = () => {
        if (shell) shell.classList.add("ready");
        resolve();
      };

      if (!screen) return done();

      if (sessionStorage.getItem("hk_booted") === "1" || CAPS.reduceMotion || CAPS.mobile) {
        // skip long boot on mobile / return visits
        screen.classList.add("done");
        return done();
      }

      const brand = document.createElement("div");
      brand.className = "boot-brand";
      brand.textContent = "hafilrazz@kernel — tap to skip · Ctrl+K palette";
      const bar = document.createElement("div");
      bar.className = "boot-bar";
      bar.innerHTML = "<i></i>";
      screen.appendChild(bar);
      screen.appendChild(brand);

      let finished = false;
      const finish = () => {
        if (finished) return;
        finished = true;
        sessionStorage.setItem("hk_booted", "1");
        if (!sessionStorage.getItem("hk_boot_ts")) {
          sessionStorage.setItem("hk_boot_ts", String(Date.now()));
        }
        screen.classList.add("done");
        setTimeout(done, 100);
      };

      BOOT_LINES.forEach((line) => {
        setTimeout(() => {
          if (finished) return;
          const row = document.createElement("div");
          row.className = `boot-line ${line.cls || ""}`;
          row.textContent = line.text;
          screen.insertBefore(row, bar);
        }, line.delay);
      });

      window.addEventListener("keydown", finish, { once: true });
      window.addEventListener("pointerdown", finish, { once: true });
      setTimeout(finish, 480);
    });
  }

  /* ---------- transitions ---------- */
  function ensureVeil() {
    let veil = qs("#page-veil");
    if (!veil) {
      veil = document.createElement("div");
      veil.id = "page-veil";
      document.body.appendChild(veil);
    }
    return veil;
  }

  function navigateTo(url) {
    const shell = qs("#shell");
    const veil = ensureVeil();
    document.body.classList.remove("nav-open", "scroll-lock");
    document.body.style.top = "";
    if (shell) shell.classList.add("leaving");
    veil.classList.add("active");
    const delay = CAPS.reduceMotion || CAPS.mobile ? 0 : 100;
    setTimeout(() => {
      location.href = url;
    }, delay);
  }

  function bindNavTransitions() {
    qsa("a[data-nav]").forEach((a) => {
      a.addEventListener("click", (e) => {
        const href = a.getAttribute("href");
        if (!href || href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto:")) return;
        if (href.toLowerCase() === pageKey()) {
          e.preventDefault();
          return;
        }
        e.preventDefault();
        navigateTo(href);
      });
    });
  }

  /* ---------- custom cursor (desktop only) ---------- */
  function initCursor() {
    if (!CAPS.cursor) return;

    const dot = document.createElement("div");
    const ring = document.createElement("div");
    dot.className = "cursor-dot";
    ring.className = "cursor-ring";
    document.body.append(dot, ring);
    document.body.classList.add("has-cursor");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let running = true;
    let raf = 0;

    const loop = () => {
      if (!running) return;
      rx += (x - rx) * 0.4;
      ry += (y - ry) * 0.4;
      // single transform property (GPU)
      dot.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;
      ring.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener(
      "pointermove",
      (e) => {
        x = e.clientX;
        y = e.clientY;
      },
      { passive: true }
    );

    const hoverSel =
      "a,button,.cmd-btn,.chip,.panel,.nav a,.tree a,input,.social a,.palette-list button";
    document.addEventListener(
      "pointerover",
      (e) => {
        if (e.target.closest && e.target.closest(hoverSel)) {
          document.body.classList.add("cursor-hover");
        }
      },
      { passive: true }
    );
    document.addEventListener(
      "pointerout",
      (e) => {
        if (e.target.closest && e.target.closest(hoverSel)) {
          document.body.classList.remove("cursor-hover");
        }
      },
      { passive: true }
    );
    window.addEventListener("pointerdown", () => document.body.classList.add("cursor-click"), {
      passive: true,
    });
    window.addEventListener("pointerup", () => document.body.classList.remove("cursor-click"), {
      passive: true,
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else {
        running = true;
        loop();
      }
    });
  }

  /* ---------- pointer FX (desktop only, throttled) ---------- */
  function initPointerFX() {
    if (!CAPS.pointerFX) return;

    // spotlight only on panels (not every button every move)
    const onMove = rafThrottle((e) => {
      const t = e.target.closest(".panel");
      if (!t) return;
      const r = t.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width) * 100;
      const my = ((e.clientY - r.top) / r.height) * 100;
      t.style.setProperty("--mx", mx + "%");
      t.style.setProperty("--my", my + "%");
      // lighter tilt
      t.style.setProperty("--ry", (mx / 100 - 0.5) * 6 + "deg");
      t.style.setProperty("--rx", -(my / 100 - 0.5) * 6 + "deg");
    });

    document.addEventListener(
      "pointermove",
      (e) => {
        if (e.target.closest && e.target.closest(".panel")) onMove(e);
      },
      { passive: true }
    );

    qsa(".panel").forEach((panel) => {
      panel.addEventListener(
        "pointerleave",
        () => {
          panel.style.setProperty("--rx", "0deg");
          panel.style.setProperty("--ry", "0deg");
        },
        { passive: true }
      );
    });

    // magnetic only for primary cmd-btns in view, lighter strength
    qsa(".cmd-btn").forEach((btn) => {
      btn.addEventListener(
        "pointermove",
        rafThrottle((e) => {
          const r = btn.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          btn.style.setProperty("--tx", dx * 0.12 + "px");
          btn.style.setProperty("--ty", dy * 0.14 + "px");
        }),
        { passive: true }
      );
      btn.addEventListener(
        "pointerleave",
        () => {
          btn.style.setProperty("--tx", "0px");
          btn.style.setProperty("--ty", "0px");
        },
        { passive: true }
      );
    });
  }

  /* ---------- particles (desktop full power only) ---------- */
  function initFx() {
    if (!CAPS.fx) return;

    let canvas = qs("#fx-canvas");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.id = "fx-canvas";
      canvas.setAttribute("aria-hidden", "true");
      document.body.prepend(canvas);
    }

    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    let w = 0;
    let h = 0;
    let particles = [];
    let running = true;
    let raf = 0;
    const count = 22; // low count, no link lines (O(n) only)

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: -0.1 - Math.random() * 0.25,
        r: 0.6 + Math.random() * 1.2,
        a: 0.12 + Math.random() * 0.3,
      }));
    };

    const frame = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -4) {
          p.y = h + 4;
          p.x = Math.random() * w;
        }
        if (p.x < -4) p.x = w + 4;
        if (p.x > w + 4) p.x = -4;
        ctx.beginPath();
        ctx.fillStyle = `rgba(61,214,140,${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };

    resize();
    frame();
    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else {
        running = true;
        frame();
      }
    });
  }

  /* ---------- reveals ---------- */
  function initReveals() {
    const nodes = qsa(
      ".panel, .chip, .cmd-row, .social, .term, .log-block, .stat, .meter, .stats"
    );

    if (CAPS.reduceMotion || CAPS.mobile) {
      // instant on mobile — no scroll jank from staggered opacity
      nodes.forEach((el) => {
        el.classList.add("reveal", "in");
      });
      qsa(".meter-fill").forEach((el) => {
        el.style.width = (el.dataset.value || 0) + "%";
      });
      qsa("[data-count]").forEach((el) => {
        el.textContent = (el.dataset.count || "0") + (el.dataset.suffix || "");
        el.dataset.done = "1";
      });
      return;
    }

    nodes.forEach((el, i) => {
      el.classList.add("reveal");
      el.style.setProperty("--d", `${(i % 5) * 12}ms`);
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const root = entry.target;
          root.classList.add("in");
          root.querySelectorAll(".meter-fill").forEach((fill) => {
            fill.style.width = (fill.dataset.value || 0) + "%";
          });
          root.querySelectorAll("[data-count]").forEach(animateCount);
          if (root.hasAttribute("data-count")) animateCount(root);
          io.unobserve(root);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" }
    );
    nodes.forEach((el) => io.observe(el));
  }

  function animateCount(el) {
    if (el.dataset.done) return;
    el.dataset.done = "1";
    const target = Number(el.dataset.count || 0);
    const suffix = el.dataset.suffix || "";
    if (CAPS.lite) {
      el.textContent = target + suffix;
      return;
    }
    const dur = 320;
    const t0 = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - t0) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3))) + suffix;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---------- typewriter ---------- */
  function initTypeTitle() {
    const el = qs("[data-type]");
    if (!el) return;
    const text = el.getAttribute("data-type") || "";
    if (CAPS.reduceMotion || CAPS.mobile) {
      el.textContent = text;
      return;
    }
    el.textContent = "";
    const caret = document.createElement("span");
    caret.className = "caret";
    el.appendChild(caret);
    let i = 0;
    const tick = () => {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        el.appendChild(caret);
        i++;
        setTimeout(tick, 6 + Math.random() * 10);
      } else {
        setTimeout(() => caret.remove(), 400);
      }
    };
    setTimeout(tick, 40);
  }

  /* ---------- command palette ---------- */
  function initPalette() {
    let root = qs(".palette");
    if (!root) {
      root = document.createElement("div");
      root.className = "palette";
      root.innerHTML = `
        <div class="palette-box" role="dialog" aria-modal="true" aria-label="Command palette">
          <input class="palette-input" type="text" placeholder="Type a command or jump to…" autocomplete="off" spellcheck="false" enterkeyhint="go" />
          <ul class="palette-list"></ul>
          <div class="palette-foot">
            <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
            <span><kbd>Enter</kbd> open</span>
            <span><kbd>Esc</kbd> close</span>
          </div>
        </div>`;
      document.body.appendChild(root);
    }

    const input = qs(".palette-input", root);
    const list = qs(".palette-list", root);
    let items = [];
    let active = 0;

    const render = (q = "") => {
      const query = q.trim().toLowerCase();
      items = ROUTES.filter((r) => {
        if (!query) return true;
        return (
          r.label.toLowerCase().includes(query) ||
          r.hint.toLowerCase().includes(query) ||
          r.keywords.includes(query)
        );
      });
      list.innerHTML = items
        .map(
          (r, i) => `
        <li>
          <button type="button" data-i="${i}" class="${i === active ? "active" : ""}">
            <span>${r.label}</span>
            <span class="hint">${r.hint}</span>
          </button>
        </li>`
        )
        .join("");
      if (!items.length) {
        list.innerHTML = `<li><button type="button" disabled>No matches</button></li>`;
      }
    };

    const open = () => {
      root.classList.add("open");
      active = 0;
      input.value = "";
      render();
      // prevent body scroll under palette on mobile
      document.body.classList.add("palette-open");
      setTimeout(() => input.focus(), 10);
    };
    const close = () => {
      root.classList.remove("open");
      document.body.classList.remove("palette-open");
      input.blur();
    };
    const run = (item) => {
      if (!item) return;
      close();
      if (item.external) {
        window.open(item.href, "_blank", "noopener");
        toast("opening " + item.label.toLowerCase());
        return;
      }
      if (item.href.toLowerCase() === pageKey()) {
        toast("already here");
        return;
      }
      navigateTo(item.href);
    };

    input.addEventListener("input", () => {
      active = 0;
      render(input.value);
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        active = Math.min(items.length - 1, active + 1);
        render(input.value);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        active = Math.max(0, active - 1);
        render(input.value);
      } else if (e.key === "Enter") {
        e.preventDefault();
        run(items[active]);
      } else if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    });
    list.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-i]");
      if (!btn) return;
      run(items[Number(btn.dataset.i)]);
    });
    root.addEventListener("click", (e) => {
      if (e.target === root) close();
    });

    window.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        root.classList.contains("open") ? close() : open();
      }
      if (e.key === "/" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const tag = (e.target && e.target.tagName) || "";
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        const term = qs("#term-input");
        if (term) {
          e.preventDefault();
          term.focus();
        }
      }
    });

    window.HK = window.HK || {};
    window.HK.openPalette = open;

    qsa("[data-palette]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        open();
      });
    });
  }

  /* ---------- terminal ---------- */
  function initTerminal() {
    const input = qs("#term-input");
    const body = qs("#term-body");
    if (!input || !body) return;

    const history = [];
    let histIdx = -1;
    const commands = [
      "help",
      "whoami",
      "uname",
      "ls",
      "pwd",
      "date",
      "neofetch",
      "clear",
      "cd about",
      "cd skills",
      "cd projects",
      "cd contact",
      "open github",
      "open linkedin",
      "open instagram",
      "palette",
    ];

    const print = (text, cls = "out") => {
      const line = document.createElement("div");
      line.className = `line ${cls}`;
      line.textContent = text;
      body.appendChild(line);
      // keep terminal log bounded (perf on long sessions)
      while (body.childNodes.length > 200) body.removeChild(body.firstChild);
      body.scrollTop = body.scrollHeight;
    };

    print("hksh 2.0 — interactive shell", "sys");
    print("help · Tab · ↑ history · / focus · Ctrl+K", "info");
    print("Session ready.", "ok");

    const run = (raw) => {
      const cmd = raw.trim();
      const low = cmd.toLowerCase();
      if (!cmd) return;

      if (low === "help" || low === "man") {
        print("commands:", "sys");
        print("  help, whoami, uname -a, ls, pwd, date, neofetch, clear");
        print("  cd <about|skills|projects|contact|~>   navigate");
        print("  open <github|linkedin|instagram>       external");
        print("  palette                                command palette");
        return;
      }
      if (low === "clear" || low === "cls") {
        body.innerHTML = "";
        return;
      }
      if (low === "whoami") return print("hafil — Computer Science student · systems tinkerer");
      if (low === "uname" || low === "uname -a") {
        return print("HafilKernel 2.0.0 tty1 portfolio x86_64 GNU/Web");
      }
      if (low === "ls" || low === "ls ~" || low === "ls -la") {
        return print("about/  skills/  projects/  contact/  README.md");
      }
      if (low === "pwd") return print("/home/hafil");
      if (low === "date") return print(new Date().toString());
      if (low === "neofetch" || low === "fetch") {
        print("          hafil@kernel", "ok");
        print("OS:       Hafil Kernel 2.0");
        print("Shell:    hksh 2.0");
        print("CPU:      Computer Science student");
        print("Uptime:   always compiling");
        return;
      }
      if (low === "palette" || low === "cmdk") {
        window.HK?.openPalette?.();
        return print("opening command palette…", "ok");
      }
      if (low === "cd" || low === "cd ~" || low === "cd /" || low === "cd home") {
        return print("Already at ~", "sys");
      }
      if (low.startsWith("cd ")) {
        const target = low.slice(3).trim().replace(/^\//, "").replace(/\/$/, "");
        const map = {
          about: "about.html",
          skills: "skills.html",
          projects: "projects.html",
          contact: "contact.html",
          home: "index.html",
          "~": "index.html",
        };
        if (map[target]) {
          print(`mounting /${target} …`, "ok");
          setTimeout(() => navigateTo(map[target]), CAPS.mobile ? 0 : 60);
          return;
        }
        return print(`cd: no such directory: ${target}`, "err");
      }
      if (low.startsWith("open ") || low.startsWith("xdg-open ")) {
        const t = low.replace(/^xdg-open\s+/, "").replace(/^open\s+/, "").trim();
        const links = {
          github: "https://github.com/hafilrazz",
          linkedin: "https://www.linkedin.com/in/hafilrazz",
          instagram: "https://www.instagram.com/hafilrazz",
        };
        if (links[t]) {
          print(`opening ${t} …`, "ok");
          window.open(links[t], "_blank", "noopener");
          return;
        }
        return print(`open: unknown target '${t}'`, "err");
      }
      if (low === "exit" || low === "logout") {
        print("There is no exit. Only deeper into the stack.", "sys");
        return;
      }
      print(`hksh: command not found: ${cmd}`, "err");
    };

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const raw = input.value;
        print(`hafil@kernel:~$ ${raw}`, "sys");
        if (raw.trim()) {
          history.push(raw);
          if (history.length > 50) history.shift();
          histIdx = history.length;
        }
        input.value = "";
        run(raw);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (!history.length) return;
        histIdx = Math.max(0, histIdx - 1);
        input.value = history[histIdx] || "";
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        histIdx = Math.min(history.length, histIdx + 1);
        input.value = history[histIdx] || "";
        return;
      }
      if (e.key === "Tab") {
        e.preventDefault();
        const v = input.value.trim().toLowerCase();
        if (!v) return;
        const hit = commands.find((c) => c.startsWith(v));
        if (hit) input.value = hit;
      }
    });

    qs(".term")?.addEventListener("click", () => input.focus());
  }

  function initNoise() {
    if (CAPS.lite || qs(".noise")) return;
    const n = document.createElement("div");
    n.className = "noise";
    n.setAttribute("aria-hidden", "true");
    document.body.appendChild(n);
  }

  function initYear() {
    const y = qs("#year");
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ---------- init ---------- */
  async function init() {
    setActiveNav();
    ensureVeil();
    initNoise();
    initMobileNav();
    bindNavTransitions();
    updateClock();
    updateUptime();
    initScrollProgress();
    initPalette();
    initYear();

    // heavy effects only when profile allows
    initCursor();
    initFx();

    await runBoot();

    initTerminal();
    initTypeTitle();
    initPointerFX();
    initReveals();

    const veil = qs("#page-veil");
    if (veil) requestAnimationFrame(() => veil.classList.remove("active"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
