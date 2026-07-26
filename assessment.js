const ASSESSMENT_SCHEMA_VERSION = 2;
const ASSESSMENT_STATUSES = ["complete", "in-progress", "not-started", "not-applicable"];
const STATUS_WEIGHTS = {
  complete: 1,
  "in-progress": 0.5,
  "not-started": 0,
  "not-applicable": null
};
const STATUS_LABELS = {
  complete: "Complete",
  "in-progress": "In progress",
  "not-started": "Not started",
  "not-applicable": "Not applicable"
};
const LEVEL_LABELS = {
  core: "Core readiness",
  maturity: "Operational maturity"
};
const LEVEL_DESCRIPTIONS = {
  core: "Essential public project foundations that most open-source repositories should address.",
  maturity: "Deeper practices that help a project operate safely, accessibly, transparently, and sustainably."
};
const KNOWN_EXPORT_KEYS = new Set([
  "format",
  "formatVersion",
  "applicationVersion",
  "exportedAt",
  "summary",
  "items",
  "completedItems",
  "completed",
  "notes",
  "project",
  "projectProfile",
  "preservedImportData"
]);
const KNOWN_ITEM_KEYS = new Set([
  "id",
  "title",
  "level",
  "status",
  "evidenceUrl",
  "note",
  "reviewedAt",
  "responsible",
  "complete"
]);

let assessmentPreservedImportData = emptyPreservedImportData();
let assessmentPrintOpenStates = [];

function emptyItemAssessment() {
  return {
    status: "not-started",
    evidenceUrl: "",
    note: "",
    reviewedAt: "",
    responsible: ""
  };
}

function emptyPreservedImportData() {
  return {
    topLevel: {},
    unknownItems: [],
    itemFields: {},
    invalidStatuses: []
  };
}

function cloneJsonValue(value) {
  try {
    return JSON.parse(JSON.stringify(value));
  } catch (error) {
    return null;
  }
}

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeStatus(value) {
  return ASSESSMENT_STATUSES.includes(value) ? value : "not-started";
}

function normalizeItemAssessment(value) {
  const source = value && typeof value === "object" ? value : {};
  return {
    status: normalizeStatus(source.status),
    evidenceUrl: normalizeText(source.evidenceUrl),
    note: typeof source.note === "string" ? source.note : "",
    reviewedAt: normalizeText(source.reviewedAt),
    responsible: normalizeText(source.responsible)
  };
}

function mergeObject(target, source) {
  if (!source || typeof source !== "object" || Array.isArray(source)) return target;
  Object.entries(source).forEach(([key, value]) => {
    target[key] = cloneJsonValue(value);
  });
  return target;
}

function normalizePreservedImportData(value) {
  const normalized = emptyPreservedImportData();
  if (!value || typeof value !== "object" || Array.isArray(value)) return normalized;

  mergeObject(normalized.topLevel, value.topLevel);

  if (Array.isArray(value.unknownItems)) {
    normalized.unknownItems = value.unknownItems
      .map(cloneJsonValue)
      .filter((item) => item !== null);
  }

  if (value.itemFields && typeof value.itemFields === "object" && !Array.isArray(value.itemFields)) {
    Object.entries(value.itemFields).forEach(([id, fields]) => {
      if (fields && typeof fields === "object" && !Array.isArray(fields)) {
        normalized.itemFields[id] = {};
        mergeObject(normalized.itemFields[id], fields);
      }
    });
  }

  if (Array.isArray(value.invalidStatuses)) {
    normalized.invalidStatuses = value.invalidStatuses
      .map(cloneJsonValue)
      .filter((item) => item !== null);
  }

  return normalized;
}

function countPreservedImportData(value) {
  const normalized = normalizePreservedImportData(value);
  const itemFieldCount = Object.values(normalized.itemFields)
    .reduce((total, fields) => total + Object.keys(fields).length, 0);
  return (
    Object.keys(normalized.topLevel).length +
    normalized.unknownItems.length +
    normalized.invalidStatuses.length +
    itemFieldCount
  );
}

function createEmptyAssessmentState() {
  const items = {};
  checklistItems.forEach((item) => {
    items[item.id] = emptyItemAssessment();
  });
  return {
    schemaVersion: ASSESSMENT_SCHEMA_VERSION,
    items,
    preservedImportData: emptyPreservedImportData()
  };
}

function normalizeStoredAssessment(raw) {
  const state = createEmptyAssessmentState();
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return state;

  if (raw.schemaVersion === ASSESSMENT_SCHEMA_VERSION && raw.items && typeof raw.items === "object") {
    checklistItems.forEach((item) => {
      state.items[item.id] = normalizeItemAssessment(raw.items[item.id]);
    });
    state.preservedImportData = normalizePreservedImportData(raw.preservedImportData);
    return state;
  }

  // v0.1-v0.3 stored a plain object of item IDs to booleans.
  checklistItems.forEach((item) => {
    if (Object.prototype.hasOwnProperty.call(raw, item.id)) {
      state.items[item.id].status = Boolean(raw[item.id]) ? "complete" : "not-started";
    }
  });
  return state;
}

getSavedState = function getSavedAssessmentState() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEYS.checklist));
    const state = normalizeStoredAssessment(raw);
    assessmentPreservedImportData = state.preservedImportData;
    return state;
  } catch (error) {
    const state = createEmptyAssessmentState();
    assessmentPreservedImportData = state.preservedImportData;
    return state;
  }
};

function getAssessmentField(itemId, field) {
  return form.querySelector(`[data-item-id="${CSS.escape(itemId)}"][data-assessment-field="${field}"]`);
}

function updateAssessmentCardStatus(itemId, status) {
  const card = form.querySelector(`.check-item[data-item-id="${CSS.escape(itemId)}"]`);
  if (card) card.dataset.status = normalizeStatus(status);
}

function getAssessmentStateFromDom() {
  const state = createEmptyAssessmentState();

  checklistItems.forEach((item) => {
    const status = getAssessmentField(item.id, "status");
    const evidenceUrl = getAssessmentField(item.id, "evidenceUrl");
    const noteField = getAssessmentField(item.id, "note");
    const reviewedAt = getAssessmentField(item.id, "reviewedAt");
    const responsible = getAssessmentField(item.id, "responsible");

    state.items[item.id] = {
      status: normalizeStatus(status?.value),
      evidenceUrl: normalizeText(evidenceUrl?.value),
      note: typeof noteField?.value === "string" ? noteField.value : "",
      reviewedAt: normalizeText(reviewedAt?.value),
      responsible: normalizeText(responsible?.value)
    };
  });

  state.preservedImportData = normalizePreservedImportData(assessmentPreservedImportData);
  return state;
}

function persistAssessmentState(state) {
  const normalized = normalizeStoredAssessment(state);
  assessmentPreservedImportData = normalized.preservedImportData;
  localStorage.setItem(STORAGE_KEYS.checklist, JSON.stringify(normalized));
  return normalized;
}

function applyAssessmentState(state) {
  const normalized = normalizeStoredAssessment(state);
  assessmentPreservedImportData = normalized.preservedImportData;

  checklistItems.forEach((item) => {
    const itemState = normalized.items[item.id] || emptyItemAssessment();
    const status = getAssessmentField(item.id, "status");
    const evidenceUrl = getAssessmentField(item.id, "evidenceUrl");
    const noteField = getAssessmentField(item.id, "note");
    const reviewedAt = getAssessmentField(item.id, "reviewedAt");
    const responsible = getAssessmentField(item.id, "responsible");

    if (status) status.value = itemState.status;
    if (evidenceUrl) evidenceUrl.value = itemState.evidenceUrl;
    if (noteField) noteField.value = itemState.note;
    if (reviewedAt) reviewedAt.value = itemState.reviewedAt;
    if (responsible) responsible.value = itemState.responsible;

    const details = form.querySelector(`.assessment-evidence[data-item-id="${CSS.escape(item.id)}"]`);
    if (details) {
      details.open = Boolean(
        itemState.evidenceUrl ||
        itemState.note ||
        itemState.reviewedAt ||
        itemState.responsible
      );
    }
    updateAssessmentCardStatus(item.id, itemState.status);
  });

  updateProgress();
}

saveState = function saveAssessmentState() {
  const state = getAssessmentStateFromDom();

  try {
    persistAssessmentState(state);
    localStorage.setItem(STORAGE_KEYS.notes, notes.value);
  } catch (error) {
    setStatus("Progress could not be saved in this browser.", true);
  }

  updateProgress();
};

function createAssessmentField(item, field, labelText, type = "text") {
  const label = document.createElement("label");
  label.className = `assessment-field assessment-field-${field}`;

  const labelCopy = createTextElement("span", labelText);
  const control = type === "textarea"
    ? document.createElement("textarea")
    : document.createElement("input");

  control.id = `${field}-${item.id}`;
  control.dataset.itemId = item.id;
  control.dataset.assessmentField = field;

  if (type === "textarea") {
    control.rows = 3;
  } else {
    control.type = type;
  }

  if (field === "evidenceUrl") {
    control.inputMode = "url";
    control.placeholder = "https://example.org/project-evidence";
  } else if (field === "note") {
    control.placeholder = "Record context, missing work, or the next action.";
  } else if (field === "responsible") {
    control.placeholder = "Person, maintainer, or team";
  }

  control.addEventListener("input", saveState);
  control.addEventListener("change", saveState);
  label.append(labelCopy, control);
  return label;
}

function createStatusControl(item, itemState) {
  const wrapper = document.createElement("label");
  wrapper.className = "assessment-status";

  const copy = createTextElement("span", "Assessment status");
  const select = document.createElement("select");
  select.id = `status-${item.id}`;
  select.dataset.itemId = item.id;
  select.dataset.assessmentField = "status";
  select.dataset.assessmentStatus = "true";

  ASSESSMENT_STATUSES.forEach((status) => {
    const option = document.createElement("option");
    option.value = status;
    option.textContent = STATUS_LABELS[status];
    select.append(option);
  });

  select.value = normalizeStatus(itemState.status);
  select.addEventListener("change", () => {
    updateAssessmentCardStatus(item.id, select.value);
    saveState();
  });

  wrapper.append(copy, select);
  return wrapper;
}

function createAssessmentCard(item, itemState, index) {
  const card = document.createElement("article");
  card.className = "check-item";
  card.dataset.itemId = item.id;
  card.dataset.level = item.level;
  card.dataset.status = itemState.status;
  card.dataset.reveal = "";
  card.dataset.revealDelay = String(index % 2);

  const heading = document.createElement("div");
  heading.className = "check-heading";

  const badges = document.createElement("div");
  badges.className = "check-badges";
  badges.append(
    createTextElement("span", LEVEL_LABELS[item.level] || "Project health", "check-level"),
    createTextElement("span", item.category || "Project health", "check-category")
  );

  const title = createTextElement("h4", item.title, "check-title");
  const description = createTextElement("p", item.description || "", "check-description");
  heading.append(badges, title, description);

  if (item.resourceUrl && item.resourceLabel) {
    const resource = document.createElement("a");
    resource.className = "check-resource";
    resource.href = item.resourceUrl;
    resource.textContent = `${item.resourceLabel} →`;
    heading.append(resource);
  }

  const statusControl = createStatusControl(item, itemState);

  const details = document.createElement("details");
  details.className = "assessment-evidence";
  details.dataset.itemId = item.id;
  details.open = Boolean(
    itemState.evidenceUrl ||
    itemState.note ||
    itemState.reviewedAt ||
    itemState.responsible
  );

  const summary = createTextElement("summary", "Evidence and review details");
  const fields = document.createElement("div");
  fields.className = "assessment-fields";
  fields.append(
    createAssessmentField(item, "evidenceUrl", "Evidence URL", "url"),
    createAssessmentField(item, "note", "Item note", "textarea"),
    createAssessmentField(item, "reviewedAt", "Last reviewed", "date"),
    createAssessmentField(item, "responsible", "Responsible person or team")
  );
  details.append(summary, fields);

  card.append(heading, statusControl, details);
  return card;
}

function createLevelSection(level, items, savedItems) {
  const section = document.createElement("section");
  section.className = "checklist-level";
  section.dataset.assessmentLevel = level;

  const headingId = `assessment-level-${level}`;
  section.setAttribute("aria-labelledby", headingId);

  const header = document.createElement("div");
  header.className = "level-heading";

  const copy = document.createElement("div");
  const levelTitle = createTextElement("h3", LEVEL_LABELS[level], "level-title");
  levelTitle.id = headingId;
  copy.append(
    createTextElement("p", level === "core" ? "Essential foundation" : "Advanced practice", "eyebrow"),
    levelTitle,
    createTextElement("p", LEVEL_DESCRIPTIONS[level], "level-description")
  );

  const score = createTextElement("strong", "0%", "level-score");
  score.id = level === "core" ? "coreLevelScore" : "maturityLevelScore";
  score.setAttribute("aria-label", `${LEVEL_LABELS[level]} score: 0%`);
  header.append(copy, score);

  const grid = document.createElement("div");
  grid.className = "checklist checklist-level-grid";

  items.forEach((item, index) => {
    grid.append(createAssessmentCard(item, savedItems[item.id] || emptyItemAssessment(), index));
  });

  section.append(header, grid);
  return section;
}

renderChecklist = function renderAssessmentChecklist(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("The checklist data does not contain any items.");
  }

  const validItems = items.filter(
    (item) =>
      item &&
      typeof item.id === "string" &&
      item.id &&
      typeof item.title === "string" &&
      item.title &&
      ["core", "maturity"].includes(item.level)
  );

  if (validItems.length === 0) {
    throw new Error("The checklist does not contain valid schema v2 items.");
  }

  checklistItems = validItems;
  const saved = getSavedState();
  form.replaceChildren();
  form.setAttribute("aria-describedby", "assessmentDisclaimer");

  ["core", "maturity"].forEach((level) => {
    const levelItems = checklistItems.filter((item) => item.level === level);
    if (levelItems.length) {
      form.append(createLevelSection(level, levelItems, saved.items));
    }
  });

  applyAssessmentState(saved);

  try {
    notes.value = localStorage.getItem(STORAGE_KEYS.notes) || "";
  } catch (error) {
    notes.value = "";
  }

  if (!notes.dataset.assessmentSaveBound) {
    notes.dataset.assessmentSaveBound = "true";
    notes.addEventListener("input", saveState);
  }

  if (!form.dataset.assessmentSubmitBound) {
    form.dataset.assessmentSubmitBound = "true";
    form.addEventListener("submit", (event) => event.preventDefault());
  }

  setupRevealAnimations();
  updateProgress();
};

function calculateAssessmentGroup(items, state) {
  const counts = {
    complete: 0,
    inProgress: 0,
    notStarted: 0,
    notApplicable: 0,
    total: items.length,
    applicable: 0,
    earned: 0,
    percent: 0
  };

  items.forEach((item) => {
    const status = normalizeStatus(state.items[item.id]?.status);
    if (status === "not-applicable") {
      counts.notApplicable += 1;
      return;
    }

    counts.applicable += 1;
    counts.earned += STATUS_WEIGHTS[status];

    if (status === "complete") counts.complete += 1;
    if (status === "in-progress") counts.inProgress += 1;
    if (status === "not-started") counts.notStarted += 1;
  });

  counts.percent = counts.applicable
    ? Math.round((counts.earned / counts.applicable) * 100)
    : 0;
  counts.earned = Number(counts.earned.toFixed(1));
  return counts;
}

function getAssessmentSummary(state = getAssessmentStateFromDom()) {
  const coreItems = checklistItems.filter((item) => item.level === "core");
  const maturityItems = checklistItems.filter((item) => item.level === "maturity");
  return {
    core: calculateAssessmentGroup(coreItems, state),
    maturity: calculateAssessmentGroup(maturityItems, state),
    overall: calculateAssessmentGroup(checklistItems, state)
  };
}

getProgress = function getAssessmentProgress() {
  const summary = getAssessmentSummary();
  return {
    completed: summary.overall.complete,
    total: summary.overall.total,
    percent: summary.overall.percent,
    summary
  };
};

function updateScoreElement(id, group, label) {
  const element = document.querySelector(`#${id}`);
  if (!element) return;
  element.textContent = `${group.percent}%`;
  element.setAttribute(
    "aria-label",
    `${label} score: ${group.percent}%. ${group.notApplicable} not applicable.`
  );
}

updateProgress = function updateAssessmentProgress() {
  if (checklistItems.length === 0) return;
  const summary = getAssessmentSummary();
  const overall = summary.overall;

  progressText.textContent =
    `${overall.complete} complete · ${overall.inProgress} in progress · ${overall.notStarted} not started`;
  progressPercent.textContent = `${overall.percent}%`;
  progressPercent.style.setProperty("--progress", overall.percent);
  progressPercent.setAttribute(
    "aria-label",
    `Overall project health score: ${overall.percent}%. ${overall.notApplicable} items are not applicable.`
  );

  updateScoreElement("coreScore", summary.core, "Core readiness");
  updateScoreElement("maturityScore", summary.maturity, "Operational maturity");
  updateScoreElement("coreLevelScore", summary.core, "Core readiness");
  updateScoreElement("maturityLevelScore", summary.maturity, "Operational maturity");

  if (overall.percent === 100) {
    progressMessage.textContent = "Every applicable item is complete. Review evidence and dates before sharing the report.";
  } else if (overall.percent >= 70) {
    progressMessage.textContent = "Strong progress. Finish the remaining applicable gaps and confirm the supporting evidence.";
  } else if (overall.percent >= 40) {
    progressMessage.textContent = "Good foundation. Prioritize unfinished core items before advanced maturity work.";
  } else {
    progressMessage.textContent = "Start with core licensing, documentation, conduct, security, and governance foundations.";
  }
};

function collectUnknownTopLevel(payload) {
  const unknown = {};
  Object.entries(payload || {}).forEach(([key, value]) => {
    if (!KNOWN_EXPORT_KEYS.has(key)) {
      unknown[key] = cloneJsonValue(value);
    }
  });
  return unknown;
}

function collectUnknownItemFields(item) {
  const unknown = {};
  Object.entries(item || {}).forEach(([key, value]) => {
    if (!KNOWN_ITEM_KEYS.has(key)) {
      unknown[key] = cloneJsonValue(value);
    }
  });
  return unknown;
}

function normalizeImportedAssessment(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new Error("This file does not contain an OpenReady assessment.");
  }

  const knownIds = new Set(checklistItems.map((item) => item.id));
  const state = createEmptyAssessmentState();
  const preserved = normalizePreservedImportData(payload.preservedImportData);
  mergeObject(preserved.topLevel, collectUnknownTopLevel(payload));

  let legacy = false;
  let importedCount = 0;

  if (Array.isArray(payload.items)) {
    payload.items.forEach((item) => {
      if (!item || typeof item !== "object") return;
      const id = normalizeText(item.id);
      if (!id || !knownIds.has(id)) {
        preserved.unknownItems.push(cloneJsonValue(item));
        return;
      }

      const rawStatus = item.status;
      const status = normalizeStatus(rawStatus);
      if (!ASSESSMENT_STATUSES.includes(rawStatus)) {
        preserved.invalidStatuses.push({ id, status: cloneJsonValue(rawStatus) });
      }

      state.items[id] = normalizeItemAssessment({ ...item, status });
      const unknownFields = collectUnknownItemFields(item);
      if (Object.keys(unknownFields).length) {
        preserved.itemFields[id] ||= {};
        mergeObject(preserved.itemFields[id], unknownFields);
      }
      importedCount += 1;
    });
  } else {
    const legacyItems = payload.completedItems || payload.completed;
    if (!Array.isArray(legacyItems)) {
      throw new Error("This file does not contain an OpenReady checklist or assessment.");
    }

    legacy = true;
    legacyItems.forEach((item) => {
      if (!item || typeof item !== "object") return;
      const id = normalizeText(item.id);
      if (!id || !knownIds.has(id)) {
        preserved.unknownItems.push(cloneJsonValue(item));
        return;
      }
      state.items[id].status = Boolean(item.complete) ? "complete" : "not-started";
      const unknownFields = collectUnknownItemFields(item);
      if (Object.keys(unknownFields).length) {
        preserved.itemFields[id] ||= {};
        mergeObject(preserved.itemFields[id], unknownFields);
      }
      importedCount += 1;
    });
  }

  state.preservedImportData = preserved;
  const preservedCount = countPreservedImportData(preserved);

  return {
    state,
    report: {
      legacy,
      importedCount,
      preservedCount
    }
  };
}

normalizeImportedState = function normalizeImportedStateCompatibility(payload) {
  return normalizeImportedAssessment(payload).state;
};

function buildExportedItem(item, itemState) {
  const preservedFields = assessmentPreservedImportData.itemFields?.[item.id] || {};
  return {
    ...cloneJsonValue(preservedFields),
    id: item.id,
    title: item.title,
    level: item.level,
    status: itemState.status,
    evidenceUrl: itemState.evidenceUrl,
    note: itemState.note,
    reviewedAt: itemState.reviewedAt,
    responsible: itemState.responsible
  };
}

createExportPayload = function createAssessmentExportPayload() {
  const state = getAssessmentStateFromDom();
  const summary = getAssessmentSummary(state);
  const preservedCount = countPreservedImportData(state.preservedImportData);

  const payload = {
    format: "openready-checklist",
    formatVersion: ASSESSMENT_SCHEMA_VERSION,
    applicationVersion: siteConfig?.application?.version || "0.3.0",
    exportedAt: new Date().toISOString(),
    summary,
    items: checklistItems.map((item) => buildExportedItem(item, state.items[item.id])),
    // This compatibility projection allows older OpenReady versions to recover completed IDs.
    completedItems: checklistItems.map((item) => ({
      id: item.id,
      title: item.title,
      complete: state.items[item.id].status === "complete"
    })),
    notes: notes.value
  };

  if (preservedCount > 0) {
    payload.preservedImportData = normalizePreservedImportData(state.preservedImportData);
  }

  return payload;
};

function resetAssessmentControls() {
  assessmentPreservedImportData = emptyPreservedImportData();
  const state = createEmptyAssessmentState();
  applyAssessmentState(state);
}

resetChecklist = function resetAssessmentChecklist() {
  const confirmed = window.confirm("Reset your assessment progress, evidence, review details, and notes?");
  if (!confirmed) return;

  try {
    localStorage.removeItem(STORAGE_KEYS.checklist);
    localStorage.removeItem(STORAGE_KEYS.notes);
  } catch (error) {
    // Continue resetting the visible interface.
  }

  resetAssessmentControls();
  notes.value = "";
  updateProgress();
  setStatus("Assessment progress and review details were reset.");
};

window.addEventListener("beforeprint", () => {
  assessmentPrintOpenStates = Array.from(document.querySelectorAll(".assessment-evidence"))
    .map((details) => ({ details, open: details.open }));
  assessmentPrintOpenStates.forEach(({ details }) => {
    details.open = true;
  });
});

window.addEventListener("afterprint", () => {
  assessmentPrintOpenStates.forEach(({ details, open }) => {
    details.open = open;
  });
  assessmentPrintOpenStates = [];
});
