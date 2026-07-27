const PROFILE_STORAGE_KEY = "openready-project-profile-v1";
const MAX_IMPORT_BYTES = 2 * 1024 * 1024;

const PROFILE_FORM = document.querySelector("#projectProfileForm");
const PROFILE_FIELDS = {
  name: document.querySelector("#profileName"),
  repository: document.querySelector("#profileRepository"),
  maintainer: document.querySelector("#profileMaintainer"),
  reviewDate: document.querySelector("#profileReviewDate")
};

function emptyProjectProfile() {
  return {
    name: "",
    repository: "",
    maintainer: "",
    reviewDate: ""
  };
}

function normalizeProjectProfile(profile) {
  const normalized = emptyProjectProfile();
  if (!profile || typeof profile !== "object") return normalized;

  Object.keys(normalized).forEach((key) => {
    if (typeof profile[key] === "string") {
      normalized[key] = profile[key].trim();
    }
  });

  return normalized;
}

function readProjectProfile() {
  return normalizeProjectProfile(
    Object.fromEntries(
      Object.entries(PROFILE_FIELDS).map(([key, field]) => [key, field?.value || ""])
    )
  );
}

function applyProjectProfile(profile) {
  const normalized = normalizeProjectProfile(profile);
  Object.entries(PROFILE_FIELDS).forEach(([key, field]) => {
    if (field) field.value = normalized[key];
  });
}

function saveProjectProfile() {
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(readProjectProfile()));
  } catch (error) {
    setStatus("The project profile could not be saved in this browser.", true);
  }
}

function loadProjectProfile() {
  try {
    applyProjectProfile(JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY)));
  } catch (error) {
    applyProjectProfile(emptyProjectProfile());
  }
}

function projectFileSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

function ensureAssessmentStyles() {
  if (document.querySelector("link[data-assessment-styles]")) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "assessment.css";
  link.dataset.assessmentStyles = "true";
  document.head.append(link);
}

function ensureAssessmentChrome() {
  const checklistHeading = document.querySelector("#checklist-title");
  const checklistIntro = checklistHeading?.nextElementSibling;
  const form = document.querySelector("#checklistForm");
  const progressCopy = document.querySelector(".progress-copy");
  const checklistHeader = document.querySelector(".checklist-header");
  const toolPanel = document.querySelector(".tool-panel");
  const importField = document.querySelector("#importInput");

  if (checklistHeading) checklistHeading.textContent = "Open-source project health assessment";
  if (checklistIntro) {
    checklistIntro.textContent =
      "Assess core readiness and operational maturity. Statuses, evidence, and review details stay in this browser.";
  }
  if (form) form.setAttribute("aria-label", "Open-source project health assessment");
  if (toolPanel?.querySelector("h3")) toolPanel.querySelector("h3").textContent = "Assessment tools";
  if (importField) importField.setAttribute("aria-label", "Import OpenReady assessment JSON file");

  if (progressCopy && !document.querySelector(".score-breakdown")) {
    const breakdown = document.createElement("div");
    breakdown.className = "score-breakdown";
    breakdown.setAttribute("aria-label", "Assessment score breakdown");

    const core = document.createElement("span");
    const coreValue = createTextElement("strong", "0%");
    coreValue.id = "coreScore";
    core.append(createTextElement("small", "Core readiness"), coreValue);

    const maturity = document.createElement("span");
    const maturityValue = createTextElement("strong", "0%");
    maturityValue.id = "maturityScore";
    maturity.append(createTextElement("small", "Operational maturity"), maturityValue);

    breakdown.append(core, maturity);
    progressCopy.append(breakdown);
  }

  if (checklistHeader && !document.querySelector("#assessmentDisclaimer")) {
    const disclaimer = document.createElement("p");
    disclaimer.id = "assessmentDisclaimer";
    disclaimer.className = "assessment-disclaimer";
    disclaimer.textContent =
      "OpenReady scores are planning indicators, not legal, security, accessibility, compliance, certification, or hosting-program decisions.";
    checklistHeader.insertAdjacentElement("afterend", disclaimer);
  }
}

function downloadChecklistWithProfile(event) {
  event.stopImmediatePropagation();

  if (checklistItems.length === 0) {
    setStatus("The assessment is still loading.", true);
    return;
  }

  const project = readProjectProfile();
  const payload = {
    ...createExportPayload(),
    applicationVersion: siteConfig?.application?.version || "0.3.0",
    project
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const slug = projectFileSlug(project.name);

  link.href = url;
  link.download = slug ? `openready-${slug}-checklist.json` : "openready-checklist.json";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  setStatus("Assessment and project profile exported successfully.");
}

function describeImportResult(report) {
  const messages = [];

  if (report.legacy) {
    messages.push("Legacy checklist migrated to assessment schema v2.");
  } else {
    messages.push("Assessment imported successfully.");
  }

  if (report.preservedCount > 0) {
    messages.push(
      `${report.preservedCount} unsupported field${report.preservedCount === 1 ? " was" : "s were"} preserved for re-export.`
    );
  }

  messages.push("Project profile restored.");
  return messages.join(" ");
}

async function importChecklistWithProfile(event) {
  event.stopImmediatePropagation();
  const [file] = importInput.files;
  if (!file) return;

  try {
    if (file.size > MAX_IMPORT_BYTES) {
      throw new Error("This file is larger than the 2 MB OpenReady import limit.");
    }

    const text = await file.text();
    if (text.length > MAX_IMPORT_BYTES) {
      throw new Error("This file is larger than the 2 MB OpenReady import limit.");
    }

    const payload = JSON.parse(text);
    const { state, report } = normalizeImportedAssessment(payload);
    const project = normalizeProjectProfile(payload.project || payload.projectProfile);

    persistAssessmentState(state);
    localStorage.setItem(STORAGE_KEYS.notes, typeof payload.notes === "string" ? payload.notes : "");
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(project));

    applyAssessmentState(state);
    notes.value = localStorage.getItem(STORAGE_KEYS.notes) || "";
    applyProjectProfile(project);
    updateProgress();
    setStatus(describeImportResult(report));
  } catch (error) {
    const message = error instanceof Error ? error.message : "The assessment could not be imported.";
    setStatus(message, true);
  } finally {
    importInput.value = "";
  }
}

function resetChecklistWithProfile(event) {
  event.stopImmediatePropagation();
  const confirmed = window.confirm(
    "Reset your project profile, assessment statuses, evidence, review details, and notes?"
  );
  if (!confirmed) return;

  try {
    localStorage.removeItem(STORAGE_KEYS.checklist);
    localStorage.removeItem(STORAGE_KEYS.notes);
    localStorage.removeItem(PROFILE_STORAGE_KEY);
  } catch (error) {
    // Continue resetting the visible interface.
  }

  resetAssessmentControls();
  notes.value = "";
  applyProjectProfile(emptyProjectProfile());
  updateProgress();
  setStatus("Project profile and assessment workspace were reset.");
}

function loadGuidanceLayer() {
  if (document.querySelector("script[data-guidance-engine]")) return;
  const script = document.createElement("script");
  script.src = "guidance.js";
  script.async = true;
  script.dataset.guidanceEngine = "true";
  script.addEventListener("error", () => {
    setStatus("The guided project materials could not be loaded. Reload the page and try again.", true);
  });
  document.head.append(script);
}

function setupProjectProfile() {
  ensureAssessmentChrome();

  if (checklistItems.length > 0 && !document.querySelector("[data-assessment-status]")) {
    renderChecklist(checklistItems);
  }

  loadProjectProfile();
  loadGuidanceLayer();
  PROFILE_FORM?.addEventListener("submit", (event) => event.preventDefault());

  Object.values(PROFILE_FIELDS).forEach((field) => {
    field?.addEventListener("input", saveProjectProfile);
    field?.addEventListener("change", saveProjectProfile);
  });

  exportButton.addEventListener("click", downloadChecklistWithProfile, { capture: true });
  importInput.addEventListener("change", importChecklistWithProfile, { capture: true });
  resetButton.addEventListener("click", resetChecklistWithProfile, { capture: true });
}

function loadAssessmentEngine() {
  ensureAssessmentStyles();

  if (typeof normalizeImportedAssessment === "function") {
    setupProjectProfile();
    return;
  }

  const script = document.createElement("script");
  script.src = "assessment.js";
  script.async = true;
  script.addEventListener("load", setupProjectProfile);
  script.addEventListener("error", () => {
    setStatus("The assessment engine could not be loaded. Reload the page and try again.", true);
  });
  document.head.append(script);
}

loadAssessmentEngine();
