const checklistItems = [
  {
    id: "license",
    title: "Repository includes a clear open-source license",
    description: "Add a LICENSE file in the repository root, such as MIT, Apache-2.0, GPL-3.0, or another OSI-approved license."
  },
  {
    id: "code-of-conduct",
    title: "Repository includes a Code of Conduct",
    description: "Add CODE_OF_CONDUCT.md at the top level and link it from the site or documentation."
  },
  {
    id: "readme",
    title: "README explains the project clearly",
    description: "Explain what the software does, who it helps, how to use it, and how to contribute."
  },
  {
    id: "contributing",
    title: "Contributing guide is available",
    description: "Add CONTRIBUTING.md with beginner-friendly steps for issues, pull requests, and documentation fixes."
  },
  {
    id: "changelog",
    title: "Changelog tracks important updates",
    description: "Add CHANGELOG.md so users and contributors can follow project progress."
  },
  {
    id: "roadmap",
    title: "Roadmap shows planned improvements",
    description: "Publish a short roadmap so contributors know what kind of help is useful."
  },
  {
    id: "issues",
    title: "Issue tracker is linked",
    description: "Make it easy for users to report bugs, suggest features, or ask documentation questions."
  },
  {
    id: "security",
    title: "Security policy explains responsible reporting",
    description: "Add SECURITY.md with supported versions and a private way to report sensitive security concerns."
  },
  {
    id: "governance",
    title: "Decision-making and maintainer roles are documented",
    description: "Explain how project decisions are made, who maintains the software, and how responsibilities may grow."
  },
  {
    id: "community-docs",
    title: "Website supports the software community",
    description: "Include docs, changelog, roadmap, contributing links, or other information directly related to the software."
  }
];

const storageKey = "openready-checklist-v1";
const notesKey = "openready-notes-v1";
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

function getSavedState() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || {};
  } catch (error) {
    return {};
  }
}

function setStatus(message, isError = false) {
  toolStatus.textContent = message;
  toolStatus.dataset.status = isError ? "error" : "success";
}

function saveState() {
  const state = {};
  document.querySelectorAll("input[type='checkbox'][data-check]").forEach((input) => {
    state[input.id] = input.checked;
  });
  localStorage.setItem(storageKey, JSON.stringify(state));
  localStorage.setItem(notesKey, notes.value);
  updateProgress();
}

function renderChecklist() {
  const saved = getSavedState();

  checklistItems.forEach((item) => {
    const label = document.createElement("label");
    label.className = "check-item";
    label.setAttribute("for", item.id);

    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = item.id;
    input.dataset.check = "true";
    input.checked = Boolean(saved[item.id]);
    input.addEventListener("change", saveState);

    const text = document.createElement("span");
    text.innerHTML = `<strong>${item.title}</strong><span>${item.description}</span>`;

    label.append(input, text);
    form.appendChild(label);
  });

  notes.value = localStorage.getItem(notesKey) || "";
  notes.addEventListener("input", saveState);
  updateProgress();
}

function getProgress() {
  const inputs = Array.from(document.querySelectorAll("input[type='checkbox'][data-check]"));
  const completed = inputs.filter((input) => input.checked).length;
  const total = inputs.length;
  const percent = total ? Math.round((completed / total) * 100) : 0;
  return { completed, total, percent };
}

function updateProgress() {
  const { completed, total, percent } = getProgress();

  progressText.textContent = `${completed} of ${total} complete`;
  progressPercent.textContent = `${percent}%`;
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
    applicationVersion: "0.2.0",
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

    localStorage.setItem(storageKey, JSON.stringify(state));
    localStorage.setItem(notesKey, typeof payload.notes === "string" ? payload.notes : "");

    document.querySelectorAll("input[type='checkbox'][data-check]").forEach((input) => {
      input.checked = Boolean(state[input.id]);
    });
    notes.value = localStorage.getItem(notesKey) || "";
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

  localStorage.removeItem(storageKey);
  localStorage.removeItem(notesKey);
  document.querySelectorAll("input[type='checkbox'][data-check]").forEach((input) => {
    input.checked = false;
  });
  notes.value = "";
  updateProgress();
  setStatus("Checklist progress was reset.");
}

exportButton.addEventListener("click", exportChecklist);
importButton.addEventListener("click", () => importInput.click());
importInput.addEventListener("change", () => {
  const [file] = importInput.files;
  if (file) importChecklist(file);
});
printButton.addEventListener("click", printChecklist);
resetButton.addEventListener("click", resetChecklist);

renderChecklist();
