/**
 * Hafil Razak — Portfolio Script
 * BabaSwift style interactive features:
 * - Dynamic typing animation
 * - 3D physics & tilt on hanging lanyard ID card
 * - Pill tab switching (Projects vs Tech Stack)
 * - Dynamic project cards with image preview and details modal
 * - 125x125px glass tech stack cards with radial blur glow
 * - Contact form and interactive guestbook with persistent likes
 */

const GITHUB_USER = "hafilrazz";

// Fallback & Curated Projects
const fallbackProjects = [
  {
    name: "NeuroLens",
    description: "Explainable AI system for Alzheimer's MRI analysis featuring Grad-CAM visualization, clinical insights, and deep learning classification.",
    language: "Python",
    category: "AI / COMPUTER VISION",
    topics: ["Python", "PyTorch", "Grad-CAM", "Streamlit"],
    html_url: "https://github.com/hafilrazz",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&auto=format&fit=crop&q=80",
    icon: "🧠"
  },
  {
    name: "Pet AI",
    description: "Intelligent companion care platform combining modern web architecture with AI-driven veterinary risk evaluation and guidance.",
    language: "JavaScript",
    category: "FULL STACK & AI",
    topics: ["React", "Node.js", "AI", "MongoDB"],
    html_url: "https://github.com/hafilrazz",
    image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&auto=format&fit=crop&q=80",
    icon: "🐾"
  },
  {
    name: "AquaFlow Management",
    description: "Full-stack platform for municipal water consumption tracking, automated billing, conservation alerts, and administrative analytics.",
    language: "JavaScript",
    category: "WEB PLATFORM",
    topics: ["React", "Express", "Oracle SQL", "REST APIs"],
    html_url: "https://github.com/hafilrazz",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb1861563?w=600&auto=format&fit=crop&q=80",
    icon: "💧"
  },
  {
    name: "Cloud Java Sentinel",
    description: "Cloud-native infrastructure monitor tracking JVM heap health, CPU thread pools, and live metrics on AWS infrastructure.",
    language: "Java",
    category: "DEVOPS & CLOUD",
    topics: ["AWS", "Java", "Monitoring", "CloudWatch"],
    html_url: "https://github.com/hafilrazz",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
    icon: "☁"
  },
  {
    name: "ATS Resume Lens",
    description: "NLP-driven resume evaluator analyzing ATS keyword scores, grammar structure, missing technical skills, and improvement suggestions.",
    language: "Python",
    category: "NLP & AI",
    topics: ["Python", "Streamlit", "NLP", "scikit-learn"],
    html_url: "https://github.com/hafilrazz",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&auto=format&fit=crop&q=80",
    icon: "📄"
  },
  {
    name: "ECG Arrhythmia Classifier",
    description: "Deep learning neural network workflow for ECG arrhythmia classification with waveform preprocessing and saved inference models.",
    language: "Python",
    category: "HEALTHCARE AI",
    topics: ["TensorFlow", "Healthcare", "Deep Learning"],
    html_url: "https://github.com/hafilrazz",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80",
    icon: "💓"
  }
];

// Tech Stack List with SVG Icons matching BabaSwift layout
const techStackData = [
  { name: "React", svg: `<svg viewBox="0 0 24 24" fill="none" stroke="#00d8ff" stroke-width="2"><ellipse cx="12" cy="12" rx="10" ry="4.5"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="2" fill="#00d8ff"/></svg>` },
  { name: "Next.js", svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.1 17.5l-6.8-9.4H8v7.8H6.5V6.5H8.7l6.7 9.3v-9.3H17.1v11z"/></svg>` },
  { name: "TypeScript", svg: `<svg viewBox="0 0 24 24" fill="#3178c6"><rect width="24" height="24" rx="4" fill="#3178c6"/><path d="M11.5 8h-6v2h2v7h2.5v-7h1.5zm6.5 3.5c-.5-.6-1.3-1-2.3-1-1.6 0-2.4 1-2.4 2.2 0 1.9 2.7 1.8 2.7 3.3 0 .4-.4.7-1 .7-.7 0-1.4-.4-1.8-.9l-1.4 1.3c.7.9 1.9 1.5 3.2 1.5 2.1 0 3.3-1.1 3.3-2.6 0-2-2.8-2-2.8-3.4 0-.3.3-.6.8-.6.6 0 1.1.3 1.4.7z" fill="#fff"/></svg>` },
  { name: "JavaScript", svg: `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#f7df1e"/><path d="M11 17.5c0 .7-.3 1.2-.8 1.5-.6.3-1.4.3-2 .1l-.3-1.5c.4.2.8.2 1.1.2.4 0 .6-.2.6-.6v-5.2h1.4zm6.8-.4c-.5.8-1.4 1.3-2.5 1.3-2 0-3.1-1.3-3.1-3.2 0-2 1.2-3.3 3.1-3.3 1.1 0 1.9.4 2.3 1l-1.1 1c-.3-.4-.7-.6-1.2-.6-1 0-1.6.7-1.6 1.9 0 1.1.6 1.8 1.6 1.8.6 0 1-.2 1.3-.5z" fill="#000"/></svg>` },
  { name: "Python", svg: `<svg viewBox="0 0 24 24"><path d="M11.9 2C8.7 2 8.9 3.4 8.9 3.4l.01 1.4h3.1v.5H4.8S2 5 2 8.3c0 3.2 1.8 3.3 1.8 3.3H5v-1.6c0-1.8 1.6-1.8 1.6-1.8h4.8s1.6.1 1.6-1.6V3.8c0-1.8-1.1-1.8-1.1-1.8zm-1.8 1.4c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7zm1.9 18.6c3.2 0 3-.1.4 3-.1.4l-.01-1.4h-3.1v-.5h7.2s2.8.3 2.8-3c0-3.2-1.8-3.3-1.8-3.3H19v1.6c0 1.8-1.6 1.8-1.6 1.8h-4.8s-1.6-.1-1.6 1.6v2.8c0 1.8 1.1 1.8 1.1 1.8zm1.8-1.4c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z" fill="#4b8bbe"/></svg>` },
  { name: "PyTorch", svg: `<svg viewBox="0 0 24 24" fill="none" stroke="#ee4c2c" stroke-width="2"><path d="M13.5 2.5a6 6 0 1 1-5 10.3l1.8-1.8a3.5 3.5 0 1 0 3.2-8.5zm-5 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>` },
  { name: "TensorFlow", svg: `<svg viewBox="0 0 24 24" fill="#ff6f00"><path d="M12 2l8 4.6v9.2L12 20.4l-8-4.6V6.6L12 2zm0 2.3L5.7 7.9v7.2L12 18.7l6.3-3.6V7.9L12 4.3z"/></svg>` },
  { name: "Node.js", svg: `<svg viewBox="0 0 24 24" fill="#68a063"><path d="M12 2l9 5.2v10.4L12 23l-9-5.4V7.2L12 2zm0 2.5L5 8.5v7l7 4 7-4v-7l-7-4z"/></svg>` },
  { name: "MongoDB", svg: `<svg viewBox="0 0 24 24" fill="#13aa52"><path d="M12 1.5s5 5.5 5 10.5c0 4.2-3.1 7.8-5 9.5-1.9-1.7-5-5.3-5-9.5 0-5 5-10.5 5-10.5zm0 17.5c1-1.2 3.5-4.3 3.5-7 0-3.5-2.5-6.5-3.5-7.5-1 1-3.5 4-3.5 7.5 0 2.7 2.5 5.8 3.5 7z"/></svg>` },
  { name: "AWS", svg: `<svg viewBox="0 0 24 24" fill="#ff9900"><path d="M7 13.5c-.8 0-1.5-.7-1.5-1.5S6.2 10.5 7 10.5s1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm10 0c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm-5 6c4 0 7.5-2 9.5-5.2-.3-.2-.7-.3-1-.1-1.7 2.6-4.6 4.3-8.5 4.3s-6.8-1.7-8.5-4.3c-.3-.2-.7-.1-1 .1 2 3.2 5.5 5.2 9.5 5.2z"/></svg>` },
  { name: "Git", svg: `<svg viewBox="0 0 24 24" fill="#f05032"><path d="M21.7 10.6L13.4 2.3c-.4-.4-1-.4-1.4 0l-1.9 1.9 2.5 2.5c.4-.1.9 0 1.2.3.4.4.5 1 .3 1.5l2.4 2.4c.5-.2 1.1-.1 1.5.3.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0-.4-.4-.5-1-.3-1.5l-2.3-2.3v5.4c.2.1.4.3.5.5.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0-.6-.6-.6-1.5 0-2.1.2-.2.4-.4.7-.5V9.4c-.3-.1-.5-.3-.7-.5-.4-.4-.5-1-.3-1.5L7.4 4.9 2.3 10c-.4.4-.4 1 0 1.4l8.3 8.3c.4.4 1 .4 1.4 0l9.7-9.7c.4-.4.4-1 0-1.4z"/></svg>` },
  { name: "Tailwind", svg: `<svg viewBox="0 0 24 24" fill="#38bdf8"><path d="M12 6c-3.6 0-5.8 1.8-6.6 5.4 1.3-1.8 2.9-2.5 4.7-2 1.1.3 1.9 1.1 2.7 2 1.4 1.4 3 3.1 7.2 3.1 3.6 0 5.8-1.8 6.6-5.4-1.3 1.8-2.9 2.5-4.7 2-1.1-.3-1.9-1.1-2.7-2-1.4-1.4-3-3.1-7.2-3.1zm-8 7.5C.4 13.5-1.8 15.3-2.6 18.9c1.3-1.8 2.9-2.5 4.7-2 1.1.3 1.9 1.1 2.7 2 1.4 1.4 3 3.1 7.2 3.1 3.6 0 5.8-1.8 6.6-5.4-1.3 1.8-2.9 2.5-4.7 2-1.1-.3-1.9-1.1-2.7-2-1.4-1.4-3-3.1-7.2-3.1z"/></svg>` },
  { name: "OpenCV", svg: `<svg viewBox="0 0 24 24"><circle cx="12" cy="7" r="4" fill="#ff0000"/><circle cx="7" cy="16" r="4" fill="#00ff00"/><circle cx="17" cy="16" r="4" fill="#0000ff"/></svg>` },
  { name: "Docker", svg: `<svg viewBox="0 0 24 24" fill="#2496ed"><path d="M13 10h2V8h-2v2zm-3 0h2V8h-2v2zm-3 0h2V8H7v2zm9-3h2V5h-2v2zm-3 0h2V5h-2v2zm-3 0h2V5h-2v2zm-3 0h2V5H7v2zm14.7 4.7c-.4-.3-1.5-.4-2.3-.2-.1-.8-.6-1.5-1.3-2l-.6-.4-.4.6c-.5.8-.6 1.7-.5 2.5-.7.4-1.5.7-2.4.8H2.2c-.3 1.3-.1 2.6.5 3.8 1 2 2.8 3.5 5 4.2 5.5 1.7 11.2-.6 13.6-5.4.9-.1 1.7-.5 2.4-1.1l.5-.5-.5-.4z"/></svg>` },
  { name: "Express", svg: `<svg viewBox="0 0 24 24" fill="#ffffff"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-5h2v5zm0-7h-2V7h2v2.5z"/></svg>` }
];

let projectData = [...fallbackProjects];
let showingAll = false;

// HTML Escaping Helper
function escapeHTML(str = "") {
  return String(str).replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[c]));
}

// Generate BabaSwift style project card
function renderProjectCard(repo, index) {
  const imageTag = repo.image 
    ? `<img src="${escapeHTML(repo.image)}" alt="${escapeHTML(repo.name)}" loading="lazy" />`
    : `<div class="project-icon-large">${repo.icon || "✦"}</div>`;

  return `
    <article class="project-card" style="transition-delay: ${(index % 6) * 50}ms">
      <div class="project-card-image">
        ${imageTag}
        <span class="project-visual-badge">${escapeHTML(repo.category || repo.language || "PROJECT")}</span>
      </div>
      <h3>${escapeHTML(repo.name.replaceAll("-", " "))}</h3>
      <p>${escapeHTML(repo.description || "Building modern web apps and developer utilities.")}</p>
      <div class="project-card-bottom">
        <a class="project-live-link" href="${repo.homepage || repo.html_url}" target="_blank" rel="noopener noreferrer">
          <span>Live Demo</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
        </a>
        <button class="project-details-btn" data-index="${index}">
          <span>Details</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
    </article>`;
}

// Render Projects List
function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;
  const visible = showingAll ? projectData : projectData.slice(0, 3);
  grid.innerHTML = visible.map((r, i) => renderProjectCard(r, i)).join("");

  const seeMoreBtn = document.getElementById("seeMoreBtn");
  const seeMoreText = document.getElementById("seeMoreText");
  if (seeMoreBtn && seeMoreText) {
    seeMoreBtn.style.display = projectData.length > 3 ? "flex" : "none";
    seeMoreText.textContent = showingAll ? "See Less" : "See More";
  }
}

// Render Tech Stack Grid
function renderTechStack() {
  const grid = document.getElementById("techGrid");
  if (!grid) return;
  grid.innerHTML = techStackData.map(t => `
    <div class="tech-card">
      <div class="tech-blur-spot"></div>
      <div class="tech-logo">${t.svg}</div>
      <span class="tech-name">${escapeHTML(t.name)}</span>
    </div>
  `).join("");
}

// Fetch GitHub Repositories (Graceful Fallback)
async function loadGitHubRepos() {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`);
    if (!res.ok) throw new Error("API rate limited");
    const repos = await res.json();

    const allowed = ['bitconnect', 'newmajor', 'petai', 'fullstackchatapp', 'youtubeadfree', 'net2bot'];
    const normalize = s => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');

    const filtered = repos
      .filter(r => !r.fork && allowed.includes(normalize(r.name)))
      .map(r => ({
        name: r.name,
        description: r.description || "A clean, modern software project on GitHub.",
        language: r.language || "Code",
        category: (r.language || "SOFTWARE").toUpperCase(),
        topics: (r.topics && r.topics.length) ? r.topics : [r.language || "Web"],
        html_url: r.html_url,
        homepage: r.homepage,
        icon: "⚡"
      }));

    if (filtered.length > 0) {
      const seen = new Set(filtered.map(r => normalize(r.name)));
      const extras = fallbackProjects.filter(p => !seen.has(normalize(p.name)));
      projectData = [...filtered, ...extras];
    }
  } catch (_) {
    projectData = fallbackProjects;
  }
  renderProjects();
}

// See More Toggle
const seeMoreBtn = document.getElementById("seeMoreBtn");
if (seeMoreBtn) {
  seeMoreBtn.addEventListener("click", () => {
    showingAll = !showingAll;
    renderProjects();
    if (!showingAll) {
      const portfolioSec = document.getElementById("portfolio");
      if (portfolioSec) portfolioSec.scrollIntoView({ behavior: "smooth" });
    }
  });
}

// Tabs Pill Switcher
const tabProjects = document.getElementById("tabProjects");
const tabTech = document.getElementById("tabTech");
const paneProjects = document.getElementById("paneProjects");
const paneTech = document.getElementById("paneTech");

if (tabProjects && tabTech) {
  tabProjects.addEventListener("click", () => {
    tabProjects.classList.add("active");
    tabProjects.setAttribute("aria-selected", "true");
    tabTech.classList.remove("active");
    tabTech.setAttribute("aria-selected", "false");

    if (paneProjects) paneProjects.classList.add("active");
    if (paneTech) paneTech.classList.remove("active");
  });

  tabTech.addEventListener("click", () => {
    tabTech.classList.add("active");
    tabTech.setAttribute("aria-selected", "true");
    tabProjects.classList.remove("active");
    tabProjects.setAttribute("aria-selected", "false");

    if (paneTech) paneTech.classList.add("active");
    if (paneProjects) paneProjects.classList.remove("active");
  });
}

// Project Details Modal Dialog
const modalBackdrop = document.getElementById("modalBackdrop");
document.addEventListener("click", e => {
  const btn = e.target.closest(".project-details-btn");
  if (!btn) return;
  const repo = projectData[Number(btn.dataset.index)];
  if (!repo) return;

  const categoryEl = document.getElementById("modalCategory");
  const titleEl = document.getElementById("modalTitle");
  const descEl = document.getElementById("modalDescription");
  const tagsEl = document.getElementById("modalTags");
  const linkEl = document.getElementById("modalLink");

  if (categoryEl) categoryEl.textContent = (repo.category || repo.language || "PROJECT").toUpperCase();
  if (titleEl) titleEl.textContent = repo.name.replaceAll("-", " ");
  if (descEl) descEl.textContent = repo.description || "Explore this project repository on GitHub.";
  if (tagsEl) {
    tagsEl.innerHTML = (repo.topics || [repo.language || "Development", "Open Source"])
      .map(t => `<span>${escapeHTML(t)}</span>`)
      .join("");
  }
  if (linkEl) linkEl.href = repo.homepage || repo.html_url;

  if (modalBackdrop) {
    modalBackdrop.classList.add("open");
    modalBackdrop.setAttribute("aria-hidden", "false");
    const close = document.getElementById("modalClose");
    if (close) close.focus();
  }
});

function closeModal() {
  if (modalBackdrop) {
    modalBackdrop.classList.remove("open");
    modalBackdrop.setAttribute("aria-hidden", "true");
  }
}

const modalClose = document.getElementById("modalClose");
if (modalClose) modalClose.addEventListener("click", closeModal);
if (modalBackdrop) {
  modalBackdrop.addEventListener("click", e => {
    if (e.target === modalBackdrop) closeModal();
  });
}
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modalBackdrop && modalBackdrop.classList.contains("open")) {
    closeModal();
  }
});

// Dynamic Typing Effect (Babaswift style)
(() => {
  const el = document.getElementById("typed");
  if (!el) return;
  const phrases = [
    "tools & web apps.",
    "AI & machine learning.",
    "full-stack engineering.",
    "clean digital experiences.",
    "open-source utilities."
  ];
  let phraseIndex = 0, charIndex = 0, deleting = false;

  const typeSpeed = 65;
  const deleteSpeed = 35;
  const pauseAfter = 1500;

  function tick() {
    const current = phrases[phraseIndex];
    if (!deleting) {
      el.textContent = current.slice(0, ++charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, pauseAfter);
        return;
      }
      setTimeout(tick, typeSpeed + Math.random() * 20);
    } else {
      el.textContent = current.slice(0, --charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, 350);
        return;
      }
      setTimeout(tick, deleteSpeed + Math.random() * 15);
    }
  }
  tick();
})();

// ============================================================================
// 3D WebGL Physics Lanyard Model (Three.js) — Exact Reference Recreation
// ============================================================================
(() => {
  const canvas = document.getElementById("lanyardCanvas3d");
  const fallbackWrap = document.getElementById("lanyardFallback");
  const container = document.getElementById("heroLanyardWrap");
  if (!canvas || !container) return;

  // Fallback check: if WebGL is unavailable or Three.js fails to load
  if (typeof THREE === "undefined") {
    if (fallbackWrap) fallbackWrap.style.display = "block";
    canvas.style.display = "none";
    return;
  }

  // Detect WebGL capability
  try {
    const testCanvas = document.createElement("canvas");
    const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
    if (!gl) throw new Error("No WebGL");
  } catch (_) {
    if (fallbackWrap) fallbackWrap.style.display = "block";
    canvas.style.display = "none";
    return;
  }

  // 1. Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const width = container.clientWidth || 400;
  const height = container.clientHeight || 580;

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 0.2, 7.5);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance"
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  if (renderer.toneMapping !== undefined) {
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
  }

  // 2. Lighting (Dynamic studio illumination)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
  keyLight.position.set(4, 6, 5);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xa0b0ff, 0.7);
  fillLight.position.set(-5, -2, 4);
  scene.add(fillLight);

  const rimLight = new THREE.PointLight(0xffffff, 1.3, 25);
  rimLight.position.set(0, 4, -4);
  scene.add(rimLight);

  // 3. High-Resolution Procedural Texture Generation for Front & Back
  let avatarLoadedImg = null;
  const avatarImg = new Image();
  avatarImg.crossOrigin = "anonymous";
  avatarImg.src = "https://github.com/hafilrazz.png";
  avatarImg.onload = () => {
    avatarLoadedImg = avatarImg;
    renderFrontTexture(frontCtx);
    frontTexture.needsUpdate = true;
  };

  const frontCanvas = document.createElement("canvas");
  frontCanvas.width = 1024;
  frontCanvas.height = 1600;
  const frontCtx = frontCanvas.getContext("2d");

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  function renderFrontTexture(ctx) {
    const W = 1024, H = 1600;
    ctx.clearRect(0, 0, W, H);

    // Card Body Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, "#161618");
    bgGrad.addColorStop(0.5, "#101012");
    bgGrad.addColorStop(1, "#18181c");
    ctx.fillStyle = bgGrad;
    roundRect(ctx, 16, 16, W - 32, H - 32, 64);
    ctx.fill();

    // Border
    ctx.strokeStyle = "rgba(255, 255, 255, 0.14)";
    ctx.lineWidth = 10;
    roundRect(ctx, 20, 20, W - 40, H - 40, 60);
    ctx.stroke();

    // Inner glow border
    ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
    ctx.lineWidth = 20;
    roundRect(ctx, 35, 35, W - 70, H - 70, 50);
    ctx.stroke();

    // Top Header: Chip badge & DEV.2026
    ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
    roundRect(ctx, 60, 70, 220, 56, 28);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Green chip dot
    ctx.fillStyle = "#10b981";
    ctx.beginPath();
    ctx.arc(88, 98, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#f0f0f0";
    ctx.font = "bold 22px 'DM Mono', monospace";
    ctx.fillText("HR // DEV", 112, 105);

    ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
    ctx.font = "bold 24px 'DM Mono', monospace";
    ctx.textAlign = "right";
    ctx.fillText("DEV.2026", W - 64, 105);
    ctx.textAlign = "left";

    // Avatar Center Box (Y: 180 to 760)
    const avX = W / 2, avY = 460, avR = 210;
    ctx.save();
    ctx.beginPath();
    ctx.arc(avX, avY, avR, 0, Math.PI * 2);
    ctx.clip();

    if (avatarLoadedImg) {
      ctx.drawImage(avatarLoadedImg, avX - avR, avY - avR, avR * 2, avR * 2);
    } else {
      ctx.fillStyle = "#222228";
      ctx.fillRect(avX - avR, avY - avR, avR * 2, avR * 2);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 140px 'Syne', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("HR", avX, avY);
    }
    ctx.restore();

    // Avatar border ring
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(avX, avY, avR, 0, Math.PI * 2);
    ctx.stroke();

    // Green Online Badge on Avatar
    const statusX = avX + avR * 0.65, statusY = avY + avR * 0.65;
    ctx.fillStyle = "#22c55e";
    ctx.beginPath();
    ctx.arc(statusX, statusY, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#101012";
    ctx.lineWidth = 6;
    ctx.stroke();

    // Name & Role (Y: 760 to 920)
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 68px 'Syne', sans-serif";
    ctx.fillText("HAFIL RAZAK", W / 2, 790);

    ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
    ctx.font = "500 26px 'DM Mono', monospace";
    ctx.fillText("SOFTWARE DEVELOPER • CSE", W / 2, 840);

    // Separator line
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(80, 890);
    ctx.lineTo(W - 80, 890);
    ctx.stroke();

    // Tech Tags row (Y: 930 to 1020)
    const pills = ["AI / ML", "FULL STACK", "OPEN SOURCE"];
    const pillW = 260, pillH = 64, gap = 30;
    const startPillX = (W - (pills.length * pillW + (pills.length - 1) * gap)) / 2;
    pills.forEach((p, i) => {
      const px = startPillX + i * (pillW + gap);
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      roundRect(ctx, px, 940, pillW, pillH, 32);
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      ctx.font = "600 24px 'DM Mono', monospace";
      ctx.textAlign = "center";
      ctx.fillText(p, px + pillW / 2, 980);
    });

    // Bio / Description block (Y: 1040 to 1240)
    ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
    roundRect(ctx, 70, 1040, W - 140, 200, 32);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
    ctx.font = "400 26px 'Syne', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Crafting modern web apps & tools with high", W / 2, 1110);
    ctx.fillText("reliability, clean code, and intuitive UX.", W / 2, 1160);
    ctx.fillText("Open to full-time & freelance projects.", W / 2, 1210);

    // Bottom Meta Bar (Y: 1300 to 1520)
    ctx.textAlign = "left";
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.font = "bold 28px 'DM Mono', monospace";
    ctx.fillText("#8842-ACTIVE", 80, 1400);

    // Verified badge
    ctx.fillStyle = "rgba(16, 185, 129, 0.15)";
    roundRect(ctx, 80, 1430, 190, 52, 26);
    ctx.fill();
    ctx.strokeStyle = "rgba(16, 185, 129, 0.35)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "#10b981";
    ctx.font = "bold 22px 'DM Mono', monospace";
    ctx.fillText("✓ VERIFIED", 106, 1464);

    // Stylized Barcode on bottom right
    const barX = W - 280, barY = 1380, barH = 100;
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    const barWidths = [4, 12, 6, 16, 8, 4, 14, 8, 18, 4, 8, 12, 6, 14, 4, 10, 16, 8];
    let curBx = barX;
    barWidths.forEach(bw => {
      ctx.fillRect(curBx, barY, bw, barH);
      curBx += bw + 6;
    });
  }

  // Back Texture Canvas
  const backCanvas = document.createElement("canvas");
  backCanvas.width = 1024;
  backCanvas.height = 1600;
  const backCtx = backCanvas.getContext("2d");

  function renderBackTexture(ctx) {
    const W = 1024, H = 1600;
    ctx.clearRect(0, 0, W, H);

    // Carbon / Obsidian Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, "#111113");
    bgGrad.addColorStop(0.5, "#0b0b0d");
    bgGrad.addColorStop(1, "#141418");
    ctx.fillStyle = bgGrad;
    roundRect(ctx, 16, 16, W - 32, H - 32, 64);
    ctx.fill();

    // Border
    ctx.strokeStyle = "rgba(255, 255, 255, 0.14)";
    ctx.lineWidth = 10;
    roundRect(ctx, 20, 20, W - 40, H - 40, 60);
    ctx.stroke();

    // Dot grid texture
    ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
    for (let x = 60; x < W - 60; x += 36) {
      for (let y = 60; y < H - 60; y += 36) {
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Holographic horizontal security ribbon
    const holoGrad = ctx.createLinearGradient(0, 680, W, 780);
    holoGrad.addColorStop(0, "rgba(236, 72, 153, 0.25)");
    holoGrad.addColorStop(0.25, "rgba(168, 85, 247, 0.25)");
    holoGrad.addColorStop(0.5, "rgba(59, 130, 246, 0.25)");
    holoGrad.addColorStop(0.75, "rgba(16, 185, 129, 0.25)");
    holoGrad.addColorStop(1, "rgba(234, 179, 8, 0.25)");
    ctx.fillStyle = holoGrad;
    ctx.fillRect(20, 680, W - 40, 140);

    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.font = "bold 32px 'DM Mono', monospace";
    ctx.textAlign = "center";
    ctx.fillText("✦ HAFIL RAZAK // VERIFIED DEV SPECIFICATION ✦", W / 2, 762);

    // Large Monogram "HR" in center
    ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
    ctx.font = "800 240px 'Syne', sans-serif";
    ctx.fillText("HR", W / 2, 520);

    // NFC Wireless Icon
    ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
    ctx.lineWidth = 6;
    for (let r = 30; r <= 90; r += 24) {
      ctx.beginPath();
      ctx.arc(W / 2, 1100, r, -Math.PI * 0.75, -Math.PI * 0.25);
      ctx.stroke();
    }
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.font = "600 22px 'DM Mono', monospace";
    ctx.fillText("CONTACTLESS DEV ID", W / 2, 1180);

    ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
    ctx.font = "400 20px 'DM Mono', monospace";
    ctx.fillText("PROPERTY OF HAFIL RAZAK // GITHUB.COM/HAFILRAZZ", W / 2, 1480);
  }

  renderFrontTexture(frontCtx);
  renderBackTexture(backCtx);

  const frontTexture = new THREE.CanvasTexture(frontCanvas);
  const backTexture = new THREE.CanvasTexture(backCanvas);
  frontTexture.anisotropy = renderer.capabilities.getMaxAnisotropy ? renderer.capabilities.getMaxAnisotropy() : 8;
  backTexture.anisotropy = frontTexture.anisotropy;

  // 4. Build 3D Card Mesh
  const cardW = 2.4, cardH = 3.75, cardD = 0.04;
  const edgeMat = new THREE.MeshStandardMaterial({
    color: 0x1f1f23,
    metalness: 0.8,
    roughness: 0.3
  });
  const frontMat = new THREE.MeshStandardMaterial({
    map: frontTexture,
    roughness: 0.25,
    metalness: 0.12
  });
  const backMat = new THREE.MeshStandardMaterial({
    map: backTexture,
    roughness: 0.28,
    metalness: 0.18
  });

  const cardGeo = new THREE.BoxGeometry(cardW, cardH, cardD);
  const cardMesh = new THREE.Mesh(cardGeo, [
    edgeMat, edgeMat, edgeMat, edgeMat, frontMat, backMat
  ]);
  cardMesh.position.set(0, -cardH / 2, 0); // pivot at top center

  // Chrome Clip & Swivel Ring
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xd8d8de,
    metalness: 0.95,
    roughness: 0.12
  });
  const clipGeo = new THREE.BoxGeometry(0.32, 0.22, 0.08);
  const clipMesh = new THREE.Mesh(clipGeo, chromeMat);
  clipMesh.position.set(0, 0, 0);

  const ringGeo = new THREE.TorusGeometry(0.12, 0.03, 16, 24);
  const ringMesh = new THREE.Mesh(ringGeo, chromeMat);
  ringMesh.position.set(0, 0.14, 0);

  // Group containing the hanging card
  const cardGroup = new THREE.Group();
  cardGroup.add(cardMesh);
  cardGroup.add(clipMesh);
  cardGroup.add(ringMesh);
  scene.add(cardGroup);

  // 5. Dynamic Verlet Physics Rope (Lanyard Strap)
  const ropeSegments = 12;
  const ropeLength = 2.4;
  const segmentLength = ropeLength / ropeSegments;
  const anchorPos = new THREE.Vector3(0, 3.4, 0);

  const ropeParticles = [];
  for (let i = 0; i <= ropeSegments; i++) {
    const p = new THREE.Vector3(
      anchorPos.x,
      anchorPos.y - i * segmentLength,
      anchorPos.z
    );
    ropeParticles.push({
      pos: p.clone(),
      oldPos: p.clone(),
      pinned: i === 0
    });
  }

  // Rope Tube Geometry & Mesh
  const strapMat = new THREE.MeshStandardMaterial({
    color: 0x1e1e24,
    roughness: 0.8,
    metalness: 0.05
  });

  let ropeCurve = new THREE.CatmullRomCurve3(ropeParticles.map(p => p.pos));
  let ropeGeo = new THREE.TubeGeometry(ropeCurve, 32, 0.038, 8, false);
  const ropeMesh = new THREE.Mesh(ropeGeo, strapMat);
  scene.add(ropeMesh);

  // 6. Physics Simulation State
  let cardPos = ropeParticles[ropeSegments].pos.clone();
  let cardVel = new THREE.Vector3(0, 0, 0);
  let cardRot = new THREE.Euler(0, 0, 0, "YXZ");
  let cardRotVel = new THREE.Vector3(0, 0, 0);

  let isDragging = false;
  let targetPoint = new THREE.Vector3();
  const raycaster = new THREE.Raycaster();
  const mouseNdc = new THREE.Vector2();
  const dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  let grabOffset = new THREE.Vector3();

  // 7. Event Handlers
  function updatePointerNdc(e) {
    const rect = canvas.getBoundingClientRect();
    mouseNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  }

  function onPointerDown(e) {
    updatePointerNdc(e);
    raycaster.setFromCamera(mouseNdc, camera);
    const intersects = raycaster.intersectObjects([cardMesh, clipMesh, ringMesh], true);

    if (intersects.length > 0) {
      isDragging = true;
      canvas.classList.add("grabbing");
      canvas.setPointerCapture(e.pointerId);

      // Intersection plane at current card depth
      dragPlane.setFromNormalAndCoplanarPoint(
        camera.getWorldDirection(new THREE.Vector3()).negate(),
        cardGroup.position
      );

      const hitPoint = new THREE.Vector3();
      raycaster.ray.intersectPlane(dragPlane, hitPoint);
      grabOffset.copy(cardGroup.position).sub(hitPoint);
    }
  }

  const targetParallax = new THREE.Vector2(0, 0);
  const currentParallax = new THREE.Vector2(0, 0);

  function onPointerMove(e) {
    updatePointerNdc(e);
    if (!isDragging) {
      // Gentle hover parallax tilt
      targetParallax.x = mouseNdc.x * 0.35;
      targetParallax.y = mouseNdc.y * 0.25;
      return;
    }

    raycaster.setFromCamera(mouseNdc, camera);
    const hitPoint = new THREE.Vector3();
    if (raycaster.ray.intersectPlane(dragPlane, hitPoint)) {
      targetPoint.copy(hitPoint).add(grabOffset);
      // Constrain dragging bounds
      targetPoint.x = Math.max(-3.5, Math.min(3.5, targetPoint.x));
      targetPoint.y = Math.max(-2.5, Math.min(2.5, targetPoint.y));
      targetPoint.z = Math.max(-1.5, Math.min(2.0, targetPoint.z));
    }
  }

  function onPointerUp(e) {
    if (isDragging) {
      isDragging = false;
      canvas.classList.remove("grabbing");
      try { canvas.releasePointerCapture(e.pointerId); } catch (_) {}
      
      // Impart rotation twist impulse based on velocity
      cardRotVel.y += (cardVel.x * 1.5);
      cardRotVel.x -= (cardVel.y * 1.2);
    }
  }

  canvas.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
  canvas.addEventListener("pointercancel", onPointerUp);

  // 8. Animation & Physics Loop
  let lastTime = performance.now();
  let animId = null;
  let isVisible = true;

  function updatePhysics(dt) {
    dt = Math.min(dt, 0.033); // clamp dt

    // Card movement
    if (isDragging) {
      const prevPos = cardPos.clone();
      cardPos.lerp(targetPoint, 0.3);
      cardVel.copy(cardPos).sub(prevPos).divideScalar(dt || 0.016);

      // Tilt while dragging
      const targetRotZ = -cardVel.x * 0.08;
      const targetRotX = cardVel.y * 0.06;
      cardRot.z += (targetRotZ - cardRot.z) * 0.2;
      cardRot.x += (targetRotX - cardRot.x) * 0.2;
    } else {
      // Natural pendulum & spring physics
      const gravity = new THREE.Vector3(0, -9.8, 0);
      cardVel.addScaledVector(gravity, dt);

      // Spring / string tension pulling toward anchor
      const toAnchor = anchorPos.clone().sub(cardPos);
      const dist = toAnchor.length();
      if (dist > ropeLength) {
        const stretch = dist - ropeLength;
        const springForce = toAnchor.normalize().multiplyScalar(stretch * 45);
        cardVel.addScaledVector(springForce, dt);
      }

      // Air resistance / damping
      cardVel.multiplyScalar(0.975);
      cardPos.addScaledVector(cardVel, dt);

      // Angular physics
      currentParallax.lerp(targetParallax, 0.05);

      // Restoring torque (align upright)
      const targetZ = currentParallax.x * 0.2;
      const targetX = currentParallax.y * 0.2;
      cardRotVel.z += (targetZ - cardRot.z) * 20 * dt;
      cardRotVel.x += (targetX - cardRot.x) * 20 * dt;
      cardRotVel.y += (0 - cardRot.y) * 8 * dt;

      cardRotVel.multiplyScalar(0.96);
      cardRot.x += cardRotVel.x * dt;
      cardRot.y += cardRotVel.y * dt;
      cardRot.z += cardRotVel.z * dt;

      // Subtle breathing float when at rest
      const time = performance.now() * 0.002;
      cardPos.y += Math.sin(time) * 0.0008;
    }

    // Attach cardGroup
    cardGroup.position.copy(cardPos);
    cardGroup.rotation.set(cardRot.x, cardRot.y, cardRot.z);

    // Verlet integration for Rope
    ropeParticles[0].pos.copy(anchorPos);
    ropeParticles[ropeSegments].pos.copy(cardPos);

    for (let i = 1; i < ropeSegments; i++) {
      const p = ropeParticles[i];
      const vel = p.pos.clone().sub(p.oldPos).multiplyScalar(0.94);
      p.oldPos.copy(p.pos);
      p.pos.add(vel);
      p.pos.y -= 9.8 * 0.5 * dt * dt;
    }

    // Relax rope distance constraints (6 iterations)
    for (let iter = 0; iter < 6; iter++) {
      for (let i = 0; i < ropeSegments; i++) {
        const p1 = ropeParticles[i];
        const p2 = ropeParticles[i + 1];
        const delta = p2.pos.clone().sub(p1.pos);
        const curDist = delta.length() || 0.0001;
        const diff = (curDist - segmentLength) / curDist;
        const adjust = delta.multiplyScalar(0.5 * diff);

        if (!p1.pinned) p1.pos.add(adjust);
        if (i + 1 !== ropeSegments) p2.pos.sub(adjust);
      }
    }

    // Update Rope Mesh
    ropeCurve = new THREE.CatmullRomCurve3(ropeParticles.map(p => p.pos));
    ropeGeo.dispose();
    ropeGeo = new THREE.TubeGeometry(ropeCurve, 32, 0.038, 8, false);
    ropeMesh.geometry = ropeGeo;
  }

  function animate(now) {
    if (!isVisible) return;
    const dt = (now - lastTime) / 1000;
    lastTime = now;

    updatePhysics(dt);
    renderer.render(scene, camera);
    animId = requestAnimationFrame(animate);
  }

  animId = requestAnimationFrame(animate);

  // 9. Resize Handling
  function onResize() {
    const newW = container.clientWidth || 380;
    const newH = container.clientHeight || 560;
    camera.aspect = newW / newH;
    camera.updateProjectionMatrix();
    renderer.setSize(newW, newH);
  }
  window.addEventListener("resize", onResize);

  // 10. Pause rendering when not visible
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!isVisible) {
            isVisible = true;
            lastTime = performance.now();
            animId = requestAnimationFrame(animate);
          }
        } else {
          isVisible = false;
          if (animId) cancelAnimationFrame(animId);
        }
      });
    }, { threshold: 0.05 });
    observer.observe(canvas);
  }
})();

// Contact Form Submission (Mailto Handler)
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    const btn = document.getElementById("submitBtn");
    const originalText = btn ? btn.innerHTML : "";

    if (btn) {
      btn.innerHTML = `<span>Opening Email...</span>`;
      btn.disabled = true;
    }

    const fd = new FormData(contactForm);
    const name = fd.get("name");
    const email = fd.get("email");
    const message = fd.get("message");

    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Hi Hafil,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`);

    setTimeout(() => {
      window.location.href = `mailto:hafilrazak@gmail.com?subject=${subject}&body=${body}`;
      if (btn) {
        btn.innerHTML = originalText;
        btn.disabled = false;
      }
      contactForm.reset();
    }, 400);
  });
}

// Guestbook / Comments Wall (with BabaSwift pinned card style)
const commentsList = document.getElementById("commentsList");
const defaultComments = [
  {
    id: "pinned-1",
    name: "Hafil Razak",
    initial: "H",
    text: "Thanks for stopping by! Feel free to leave a comment or reach out through the contact section. 🚀",
    pinned: true,
    likes: 7
  },
  {
    id: "visitor-1",
    name: "Visitor",
    initial: "V",
    text: "Clean portfolio and the projects look really useful. Nice work!",
    likes: 3
  }
];

function getLikedSet() {
  return new Set(JSON.parse(localStorage.getItem("hafil_liked_comments") || "[]"));
}

function toggleLike(id, countEl, btn) {
  const stored = JSON.parse(localStorage.getItem("hafil_user_comments") || "[]");
  const liked = getLikedSet();
  const isDefault = defaultComments.some(c => c.id === id);
  let entry = isDefault ? defaultComments.find(c => c.id === id) : stored.find(c => c.id === id);
  if (!entry) return;

  if (liked.has(id)) {
    liked.delete(id);
    entry.likes = Math.max(0, (entry.likes || 0) - 1);
  } else {
    liked.add(id);
    entry.likes = (entry.likes || 0) + 1;
  }

  localStorage.setItem("hafil_liked_comments", JSON.stringify([...liked]));
  if (!isDefault) localStorage.setItem("hafil_user_comments", JSON.stringify(stored));

  if (countEl) countEl.textContent = entry.likes;
  btn.classList.toggle("liked", liked.has(id));
}

function renderCommentItem(c) {
  if (!commentsList) return;
  const liked = getLikedSet().has(c.id);
  const el = document.createElement("div");
  el.className = "comment-item" + (c.pinned ? " pinned" : "");
  el.innerHTML = `
    <div class="comment-avatar">${escapeHTML(c.initial || c.name.slice(0, 1).toUpperCase())}</div>
    <div class="comment-content">
      <div class="comment-header">
        <span class="comment-author">${escapeHTML(c.name)}</span>
        ${c.pinned ? `
          <div class="pinned-badge">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 17v5"></path><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"></path>
            </svg>
            PINNED
          </div>` : ""
        }
      </div>
      <p class="comment-text">${escapeHTML(c.text)}</p>
    </div>
    <button class="like-button${liked ? ' liked' : ''}" type="button" aria-label="Like comment">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="${liked ? '#ec4899' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
      </svg>
      <span>${c.likes || 0}</span>
    </button>
  `;

  const likeBtn = el.querySelector(".like-button");
  if (likeBtn) {
    likeBtn.addEventListener("click", () => toggleLike(c.id, likeBtn.querySelector("span"), likeBtn));
  }
  commentsList.appendChild(el);
}

function loadComments() {
  if (!commentsList) return;
  commentsList.innerHTML = "";
  const stored = JSON.parse(localStorage.getItem("hafil_user_comments") || "[]");
  [...defaultComments, ...stored].forEach(renderCommentItem);
}

const commentForm = document.getElementById("commentForm");
if (commentForm) {
  commentForm.addEventListener("submit", e => {
    e.preventDefault();
    const nameInput = document.getElementById("commentName");
    const textInput = document.getElementById("commentText");
    const name = nameInput ? nameInput.value.trim() : "";
    const text = textInput ? textInput.value.trim() : "";
    if (!name || !text) return;

    const stored = JSON.parse(localStorage.getItem("hafil_user_comments") || "[]");
    const newComment = {
      id: `user-${Date.now()}`,
      name,
      initial: name.slice(0, 1).toUpperCase(),
      text,
      likes: 0
    };
    stored.push(newComment);
    localStorage.setItem("hafil_user_comments", JSON.stringify(stored));
    renderCommentItem(newComment);
    commentForm.reset();
  });
}

// Initial Boot
renderProjects();
renderTechStack();
loadComments();
loadGitHubRepos();
