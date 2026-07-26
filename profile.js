const PROFILE_STORAGE_KEY = "openready-project-profile-v1";

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

function downloadChecklistWithProfile(event) {
  event.stopImmediatePropagation();

  if (checklistItems.length === 0) {
    setStatus("The checklist is still loading.", true);
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
  setStatus("Checklist and project profile exported successfully.");
}

async function importChecklistWithProfile(event) {
  event.stopImmediatePropagation();
  const [file] = importInput.files;
  if (!file) return;

  try {
    const text = await file.text();
    const payload = JSON.parse(text);
    const state = normalizeImportedState(payload);
    const project = normalizeProjectProfile(payload.project || payload.projectProfile);

    localStorage.setItem(STORAGE_KEYS.checklist, JSON.stringify(state));
    localStorage.setItem(STORAGE_KEYS.notes, typeof payload.notes === "string" ? payload.notes : "");
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(project));

    document.querySelectorAll("input[data-check]").forEach((input) => {
      input.checked = Boolean(state[input.dataset.itemId]);
    });
    notes.value = localStorage.getItem(STORAGE_KEYS.notes) || "";
    applyProjectProfile(project);
    updateProgress();
    setStatus("Checklist and project profile imported successfully.");
  } catch (error) {
    const message = error instanceof Error ? error.message : "The checklist could not be imported.";
    setStatus(message, true);
  } finally {
    importInput.value = "";
  }
}

function resetChecklistWithProfile(event) {
  event.stopImmediatePropagation();
  const confirmed = window.confirm("Reset your project profile, checklist progress, and notes?");
  if (!confirmed) return;

  try {
    localStorage.removeItem(STORAGE_KEYS.checklist);
    localStorage.removeItem(STORAGE_KEYS.notes);
    localStorage.removeItem(PROFILE_STORAGE_KEY);
  } catch (error) {
    // Continue resetting the visible interface.
  }

  document.querySelectorAll("input[data-check]").forEach((input) => {
    input.checked = false;
  });
  notes.value = "";
  applyProjectProfile(emptyProjectProfile());
  updateProgress();
  setStatus("Project profile and checklist progress were reset.");
}

function setupProjectProfile() {
  loadProjectProfile();

  Object.values(PROFILE_FIELDS).forEach((field) => {
    field?.addEventListener("input", saveProjectProfile);
    field?.addEventListener("change", saveProjectProfile);
  });

  exportButton.addEventListener("click", downloadChecklistWithProfile, { capture: true });
  importInput.addEventListener("change", importChecklistWithProfile, { capture: true });
  resetButton.addEventListener("click", resetChecklistWithProfile, { capture: true });
}

setupProjectProfile();
