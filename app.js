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
    id: "non-commercial",
    title: "Project is clearly non-commercial",
    description: "Avoid pricing pages, paid support, commercial hosting, affiliate pages, and sales funnels."
  },
  {
    id: "netlify-attribution",
    title: "Netlify attribution is visible",
    description: "If hosted under Netlify's Open Source plan, include the required 'This site is powered by Netlify' link."
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
const resetButton = document.querySelector("#resetButton");

function getSavedState() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || {};
  } catch (error) {
    return {};
  }
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

function updateProgress() {
  const inputs = Array.from(document.querySelectorAll("input[type='checkbox'][data-check]"));
  const completed = inputs.filter((input) => input.checked).length;
  const total = inputs.length;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  progressText.textContent = `${completed} of ${total} complete`;
  progressPercent.textContent = `${percent}%`;

  if (percent === 100) {
    progressMessage.textContent = "Great. Your project has the core public-readiness signals in place.";
  } else if (percent >= 70) {
    progressMessage.textContent = "Strong progress. Review the remaining items before publishing or applying.";
  } else if (percent >= 40) {
    progressMessage.textContent = "Good start. Focus next on license, Code of Conduct, and contributing docs.";
  } else {
    progressMessage.textContent = "Start with the basics: license, README, Code of Conduct, and non-commercial statement.";
  }
}

function exportChecklist() {
  const state = getSavedState();
  const payload = {
    project: "OpenReady checklist export",
    exportedAt: new Date().toISOString(),
    completed: checklistItems.map((item) => ({
      id: item.id,
      title: item.title,
      complete: Boolean(state[item.id])
    })),
    notes: notes.value
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "openready-checklist.json";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
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
}

exportButton.addEventListener("click", exportChecklist);
resetButton.addEventListener("click", resetChecklist);

renderChecklist();
