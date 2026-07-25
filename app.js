const STORAGE_KEYS = {
  checklist: "openready-checklist-v1",
  notes: "openready-notes-v1",
  theme: "openready-theme"
};

const TOKEN_MAP = {
  background: "--bg",
  surface: "--surface",
  surfaceSoft: "--surface-soft",
  surfaceElevated: "--surface-elevated",
  surfaceDark: "--surface-dark",
  text: "--text",
  muted: "--muted",
  border: "--border",
  primary: "--primary",
  primaryHover: "--primary-dark",
  primarySoft: "--primary-soft",
  success: "--success",
  successSoft: "--success-soft",
  danger: "--danger"
};

let checklistItems = [];
let siteConfig = null;

const form = document.querySelector("#checklistForm");
const progressText = document.querySelector("#progressText");
const progressMessage = document.querySelector("#progressMessage");
const progressPercent = document.querySelector("#progressPercent");
const notes = document.querySelector("#projectNotes");
const exportButton = document.querySelector("#exportButton");
const importButton = document.querySelector("#importButton");
const importInput = document.querySelector("#importInput");
const printButton = document.querySelector("#printButton");
const resetButton = document.querySelector("#resetButton");
const toolStatus = document.querySelector("#toolStatus");
const themeToggle = document.querySelector("#themeToggle");
const themeIcon = document.querySelector("#themeIcon");
const themeLabel = document.querySelector("#themeLabel");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const systemThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

async function loadJson(path) {
  const response = await fetch(path, { cache: "no-cache" });
  if (!response.ok) {
    throw new Error(`Could not load ${path} (${response.status}).`);
  }
  return response.json();
}

function getSavedState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.checklist)) || {};
  } catch (error) {
    return {};
  }
}

function setStatus(message, isError = false) {
  toolStatus.textContent = message;
  toolStatus.dataset.status = isError ? "error" : "success";
}

function createTextElement(tagName, text, className = "") {
  const element = document.createElement(tagName);
  element.textContent = text;
  if (className) element.className = className;
  return element;
}

function renderPrinciples(principles) {
  const container = document.querySelector("#principlesGrid");
  if (!container || !Array.isArray(principles)) return;

  container.replaceChildren(
    ...principles.map((principle) => {
      const item = document.createElement("div");
      item.append(
        createTextElement("strong", principle.title || "Project principle"),
        createTextElement("span", principle.description || "")
      );
      return item;
    })
  );
}

function renderFeatures(features) {
  const container = document.querySelector("#featureGrid");
  if (!container || !Array.isArray(features)) return;

  container.replaceChildren(
    ...features.map((feature, index) => {
      const card = document.createElement("article");
      card.className = "feature-card";
      card.dataset.reveal = "";
      card.dataset.revealDelay = String(index % 3);
      card.append(
        createTextElement("span", feature.number || String(index + 1).padStart(2, "0"), "feature-number"),
        createTextElement("h3", feature.title || "Feature"),
        createTextElement("p", feature.description || "")
      );
      return card;
    })
  );
}

function renderDocuments(documents) {
  const container = document.querySelector("#docsGrid");
  if (!container || !Array.isArray(documents)) return;

  container.replaceChildren(
    ...documents.map((documentItem, index) => {
      const card = document.createElement("a");
      card.className = "doc-card";
      card.href = documentItem.url || "#";
      card.dataset.reveal = "";
      card.dataset.revealDelay = String(index % 4);
      card.append(
        createTextElement("span", documentItem.label || "Documentation"),
        createTextElement("h3", documentItem.title || "Project document"),
        createTextElement("p", documentItem.description || "")
      );
      return card;
    })
  );
}

function renderRoadmap(roadmap) {
  const container = document.querySelector("#roadmapTimeline");
  if (!container || !Array.isArray(roadmap)) return;

  container.replaceChildren(
    ...roadmap.map((release) => {
      const item = document.createElement("li");
      if (["done", "current", "planned"].includes(release.state)) {
        item.className = release.state;
      }
      const copy = document.createElement("div");
      copy.append(
        createTextElement("strong", release.version || "Upcoming"),
        createTextElement("p", release.description || "")
      );
      item.append(createTextElement("span", release.label || "Planned"), copy);
      return item;
    })
  );
}

function applyConfiguredLinks(links) {
  if (!links || typeof links !== "object") return;
  document.querySelectorAll("[data-link]").forEach((element) => {
    const key = element.dataset.link;
    if (typeof links[key] === "string" && links[key]) {
      element.href = links[key];
    }
  });
}

function applyThemeTokens(themeName) {
  const tokens = siteConfig?.themes?.[themeName];
  if (!tokens || typeof tokens !== "object") return;

  Object.entries(TOKEN_MAP).forEach(([configKey, cssVariable]) => {
    const value = tokens[configKey];
    if (typeof value === "string" && value) {
      document.documentElement.style.setProperty(cssVariable, value);
    }
  });

  if (themeColorMeta && typeof tokens.themeColor === "string") {
    themeColorMeta.content = tokens.themeColor;
  }
}

function getCurrentTheme() {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function updateThemeControl(themeName) {
  const isDark = themeName === "dark";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  themeIcon.textContent = isDark ? "☀" : "☾";
  themeLabel.textContent = isDark ? "Light" : "Dark";
}

function applyTheme(themeName, persist = false) {
  const normalizedTheme = themeName === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = normalizedTheme;
  applyThemeTokens(normalizedTheme);
  updateThemeControl(normalizedTheme);

  if (persist) {
    try {
      localStorage.setItem(STORAGE_KEYS.theme, normalizedTheme);
    } catch (error) {
      // The selected theme still works for the current page session.
    }
  }
}

function setupTheme() {
  applyTheme(getCurrentTheme());

  themeToggle.addEventListener("click", () => {
    applyTheme(getCurrentTheme() === "dark" ? "light" : "dark", true);
  });

  systemThemeQuery.addEventListener("change", (event) => {
    try {
      if (localStorage.getItem(STORAGE_KEYS.theme)) return;
    } catch (error) {
      // Follow the system theme when storage is unavailable.
    }
    applyTheme(event.matches ? "dark" : "light");
  });
}

function applySiteConfig(config) {
  siteConfig = config;
  const version = config?.application?.version;
  const projectStatus = document.querySelector("#projectStatus");
  if (projectStatus && version) {
    projectStatus.textContent = `Open source · MIT licensed · v${version}`;
  }

  applyConfiguredLinks(config.links);
  renderPrinciples(config.principles);
  renderFeatures(config.features);
  renderDocuments(config.documents);
  renderRoadmap(config.roadmap);
  applyTheme(getCurrentTheme());
}

function saveState() {
  const state = {};
  document.querySelectorAll("input[data-check]").forEach((input) => {
    state[input.dataset.itemId] = input.checked;
  });

  try {
    localStorage.setItem(STORAGE_KEYS.checklist, JSON.stringify(state));
    localStorage.setItem(STORAGE_KEYS.notes, notes.value);
  } catch (error) {
    setStatus("Progress could not be saved in this browser.", true);
  }

  updateProgress();
}

function renderChecklist(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("The checklist data does not contain any items.");
  }

  checklistItems = items;
  const saved = getSavedState();
  form.replaceChildren();

  items.forEach((item, index) => {
    if (!item.id || !item.title) return;

    const card = document.createElement("article");
    card.className = "check-item";
    card.dataset.reveal = "";
    card.dataset.revealDelay = String(index % 2);

    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = `check-${item.id}`;
    input.dataset.check = "true";
    input.dataset.itemId = item.id;
    input.checked = Boolean(saved[item.id]);
    input.addEventListener("change", saveState);

    const content = document.createElement("div");
    content.className = "check-content";

    const category = createTextElement("span", item.category || "Project health", "check-category");
    const title = document.createElement("label");
    title.className = "check-title";
    title.htmlFor = input.id;
    title.textContent = item.title;
    const description = createTextElement("p", item.description || "", "check-description");

    content.append(category, title, description);

    if (item.resourceUrl && item.resourceLabel) {
      const resource = document.createElement("a");
      resource.className = "check-resource";
      resource.href = item.resourceUrl;
      resource.textContent = `${item.resourceLabel} →`;
      content.append(resource);
    }

    card.append(input, content);
    form.append(card);
  });

  try {
    notes.value = localStorage.getItem(STORAGE_KEYS.notes) || "";
  } catch (error) {
    notes.value = "";
  }
  notes.addEventListener("input", saveState);
  updateProgress();
}

function getProgress() {
  const inputs = Array.from(document.querySelectorAll("input[data-check]"));
  const completed = inputs.filter((input) => input.checked).length;
  const total = inputs.length;
  const percent = total ? Math.round((completed / total) * 100) : 0;
  return { completed, total, percent };
}

function updateProgress() {
  const { completed, total, percent } = getProgress();
  progressText.textContent = `${completed} of ${total} complete`;
  progressPercent.textContent = `${percent}%`;
  progressPercent.style.setProperty("--progress", percent);
  progressPercent.setAttribute("aria-label", `Readiness score: ${percent}%`);

  if (percent === 100) {
    progressMessage.textContent = "Excellent. Your repository shows strong public project health signals.";
  } else if (percent >= 70) {
    progressMessage.textContent = "Strong progress. Review the remaining gaps before your next release.";
  } else if (percent >= 40) {
    progressMessage.textContent = "Good foundation. Prioritize security, governance, and contributor guidance.";
  } else {
    progressMessage.textContent = "Start with the essentials: license, README, Code of Conduct, and security policy.";
  }
}

function createExportPayload() {
  const state = getSavedState();
  const { completed, total, percent } = getProgress();

  return {
    format: "openready-checklist",
    formatVersion: 1,
    applicationVersion: siteConfig?.application?.version || "0.2.1",
    exportedAt: new Date().toISOString(),
    summary: { completed, total, percent },
    completedItems: checklistItems.map((item) => ({
      id: item.id,
      title: item.title,
      complete: Boolean(state[item.id])
    })),
    notes: notes.value
  };
}

function exportChecklist() {
  if (checklistItems.length === 0) {
    setStatus("The checklist is still loading.", true);
    return;
  }

  const payload = createExportPayload();
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "openready-checklist.json";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  setStatus("Checklist exported successfully.");
}

function normalizeImportedState(payload) {
  const importedItems = payload.completedItems || payload.completed;
  if (!Array.isArray(importedItems)) {
    throw new Error("This file does not contain an OpenReady checklist.");
  }

  const knownIds = new Set(checklistItems.map((item) => item.id));
  const state = {};

  importedItems.forEach((item) => {
    if (item && knownIds.has(item.id)) {
      state[item.id] = Boolean(item.complete);
    }
  });

  return state;
}

async function importChecklist(file) {
  try {
    const text = await file.text();
    const payload = JSON.parse(text);
    const state = normalizeImportedState(payload);

    localStorage.setItem(STORAGE_KEYS.checklist, JSON.stringify(state));
    localStorage.setItem(STORAGE_KEYS.notes, typeof payload.notes === "string" ? payload.notes : "");

    document.querySelectorAll("input[data-check]").forEach((input) => {
      input.checked = Boolean(state[input.dataset.itemId]);
    });
    notes.value = localStorage.getItem(STORAGE_KEYS.notes) || "";
    updateProgress();
    setStatus("Checklist imported successfully.");
  } catch (error) {
    const message = error instanceof Error ? error.message : "The checklist could not be imported.";
    setStatus(message, true);
  } finally {
    importInput.value = "";
  }
}

function printChecklist() {
  setStatus("Opening the print dialog. Choose ‘Save as PDF’ to create a report.");
  window.print();
}

function resetChecklist() {
  const confirmed = window.confirm("Reset your checklist progress and notes?");
  if (!confirmed) return;

  try {
    localStorage.removeItem(STORAGE_KEYS.checklist);
    localStorage.removeItem(STORAGE_KEYS.notes);
  } catch (error) {
    // Continue resetting the visible interface.
  }

  document.querySelectorAll("input[data-check]").forEach((input) => {
    input.checked = false;
  });
  notes.value = "";
  updateProgress();
  setStatus("Checklist progress was reset.");
}

function setupToolActions() {
  exportButton.addEventListener("click", exportChecklist);
  importButton.addEventListener("click", () => importInput.click());
  importInput.addEventListener("change", () => {
    const [file] = importInput.files;
    if (file) importChecklist(file);
  });
  printButton.addEventListener("click", printChecklist);
  resetButton.addEventListener("click", resetChecklist);
}

function setupRevealAnimations() {
  const elements = document.querySelectorAll("[data-reveal]:not([data-reveal-ready])");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  elements.forEach((element) => {
    element.dataset.revealReady = "true";
    const delay = Number(element.dataset.revealDelay || 0);
    element.style.setProperty("--reveal-delay", `${Math.max(0, delay) * 90}ms`);
  });

  if (reduceMotion || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.12 }
  );

  elements.forEach((element) => observer.observe(element));
}

async function initialize() {
  setupTheme();
  setupToolActions();

  const [siteResult, checklistResult] = await Promise.allSettled([
    loadJson("data/site.json"),
    loadJson("data/checklist.json")
  ]);

  if (siteResult.status === "fulfilled") {
    applySiteConfig(siteResult.value);
  } else {
    console.warn(siteResult.reason);
  }

  if (checklistResult.status === "fulfilled") {
    try {
      renderChecklist(checklistResult.value.items);
    } catch (error) {
      form.innerHTML = `<p class="load-error">${error.message}</p>`;
      progressText.textContent = "Checklist unavailable";
      progressMessage.textContent = "Review data/checklist.json and reload the page.";
    }
  } else {
    console.error(checklistResult.reason);
    form.innerHTML = '<p class="load-error">The checklist could not be loaded. Run OpenReady through a local web server or use the hosted site.</p>';
    progressText.textContent = "Checklist unavailable";
    progressMessage.textContent = "The JSON content file could not be reached.";
  }

  setupRevealAnimations();
}

initialize();
