(() => {
  const GUIDANCE_FILES = [
    "data/guidance-core.json",
    "data/guidance-maturity.json",
    "data/materials.json"
  ];

  function ensureGuidanceStyles() {
    if (document.querySelector('link[data-guidance-styles]')) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "guidance.css";
    link.dataset.guidanceStyles = "true";
    document.head.append(link);
  }

  async function loadGuidanceJson(path) {
    const response = await fetch(path, { cache: "no-cache" });
    if (!response.ok) throw new Error(`Could not load ${path} (${response.status}).`);
    return response.json();
  }

  function textElement(tagName, text, className = "") {
    const element = document.createElement(tagName);
    element.textContent = text;
    if (className) element.className = className;
    return element;
  }

  function createList(items, className = "") {
    const list = document.createElement("ul");
    if (className) list.className = className;
    (Array.isArray(items) ? items : []).forEach((item) => {
      list.append(textElement("li", item));
    });
    return list;
  }

  function createGuidanceBlock(title, content, className = "") {
    const section = document.createElement("section");
    section.className = `guidance-block ${className}`.trim();
    section.append(textElement("h5", title));
    if (Array.isArray(content)) {
      section.append(createList(content));
    } else {
      section.append(textElement("p", content || ""));
    }
    return section;
  }

  function reportStatus(message, isError = false) {
    if (typeof setStatus === "function") {
      setStatus(message, isError);
      return;
    }
    const status = document.querySelector("#toolStatus");
    if (!status) return;
    status.textContent = message;
    status.dataset.status = isError ? "error" : "success";
  }

  async function copyStarter(textarea, material) {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(textarea.value);
      } else {
        textarea.focus();
        textarea.select();
        if (!document.execCommand("copy")) throw new Error("Copy command unavailable.");
      }
      reportStatus(`${material.title} copied to the clipboard.`);
    } catch (error) {
      reportStatus("The starter could not be copied automatically. Select the text and copy it manually.", true);
      textarea.focus();
      textarea.select();
    }
  }

  function downloadStarter(textarea, material) {
    const blob = new Blob([textarea.value], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = material.filename;
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    reportStatus(`${material.title} downloaded as ${material.filename}.`);
  }

  function createMaterialStarter(material, itemId) {
    const section = document.createElement("section");
    section.className = "material-starter";
    section.dataset.materialId = material.id;

    const heading = textElement("h5", material.title);
    const description = textElement("p", material.description, "material-description");
    const disclaimer = textElement("p", material.disclaimer, "material-disclaimer");
    const label = document.createElement("label");
    const textareaId = `material-${material.id}-${itemId}`;
    label.htmlFor = textareaId;
    label.append(textElement("span", `Editable ${material.title}`));

    const textarea = document.createElement("textarea");
    textarea.id = textareaId;
    textarea.rows = 14;
    textarea.value = material.content;
    textarea.dataset.materialStarter = material.id;
    textarea.setAttribute("spellcheck", "true");

    const privacy = textElement(
      "p",
      "Edits stay on this page until copied or downloaded. They are not included in the assessment score or JSON report.",
      "material-privacy"
    );

    const actions = document.createElement("div");
    actions.className = "material-actions";

    const copyButton = textElement("button", "Copy starter");
    copyButton.type = "button";
    copyButton.addEventListener("click", () => copyStarter(textarea, material));

    const downloadButton = textElement("button", "Download Markdown", "secondary-button");
    downloadButton.type = "button";
    downloadButton.addEventListener("click", () => downloadStarter(textarea, material));

    const resetButton = textElement("button", "Restore starter", "text-button");
    resetButton.type = "button";
    resetButton.addEventListener("click", () => {
      textarea.value = material.content;
      reportStatus(`${material.title} restored to its original starting text.`);
    });

    label.append(textarea);
    actions.append(copyButton, downloadButton, resetButton);
    section.append(heading, description, disclaimer, label, privacy, actions);
    return section;
  }

  function createResourceBlock(resources) {
    const section = document.createElement("section");
    section.className = "guidance-block guidance-resources";
    section.append(textElement("h5", "Further resources"));
    const list = document.createElement("ul");
    (Array.isArray(resources) ? resources : []).forEach((resource) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = resource.url;
      link.textContent = resource.label;
      item.append(link);
      list.append(item);
    });
    section.append(list);
    return section;
  }

  function attachItemGuidance(card, itemGuidance, materialsById) {
    if (!card || card.dataset.guidanceReady === "true") return;
    const itemId = card.dataset.itemId;
    if (!itemGuidance) return;

    const details = document.createElement("details");
    details.className = "item-guidance";
    details.dataset.guidanceItem = itemId;
    details.append(textElement("summary", "How to improve this item"));

    const body = document.createElement("div");
    body.className = "guidance-body";
    body.append(createGuidanceBlock("Why it matters", itemGuidance.whyItMatters, "guidance-why"));

    const grid = document.createElement("div");
    grid.className = "guidance-grid";
    grid.append(
      createGuidanceBlock("Minimum implementation", itemGuidance.minimum),
      createGuidanceBlock("Stronger implementation", itemGuidance.stronger),
      createGuidanceBlock("Common mistakes", itemGuidance.commonMistakes, "guidance-mistakes"),
      createGuidanceBlock("Example evidence", itemGuidance.exampleEvidence)
    );
    body.append(grid, createResourceBlock(itemGuidance.resources));

    const starter = materialsById.get(itemGuidance.starterId);
    if (starter) body.append(createMaterialStarter(starter, itemId));

    details.append(body);
    card.append(details);
    card.dataset.guidanceReady = "true";
  }

  function renderNotices(notices) {
    if (document.querySelector("#guidanceNotices")) return;
    const anchor = document.querySelector("#assessmentDisclaimer") || document.querySelector(".project-profile");
    if (!anchor) return;

    const section = document.createElement("section");
    section.id = "guidanceNotices";
    section.className = "guidance-notices";
    section.setAttribute("aria-label", "OpenReady guidance limitations");

    (Array.isArray(notices) ? notices : []).forEach((notice) => {
      const article = document.createElement("article");
      article.dataset.noticeId = notice.id;
      article.append(textElement("h3", notice.title), textElement("p", notice.text));
      section.append(article);
    });

    anchor.insertAdjacentElement("afterend", section);
  }

  function applyGuidance(data) {
    const cards = document.querySelectorAll(".check-item[data-item-id]");
    if (!cards.length) return false;

    const materialsById = new Map(
      (Array.isArray(data.materials) ? data.materials : []).map((material) => [material.id, material])
    );
    cards.forEach((card) => {
      attachItemGuidance(card, data.items?.[card.dataset.itemId], materialsById);
    });
    renderNotices(data.notices);
    if (typeof setupRevealAnimations === "function") setupRevealAnimations();
    return true;
  }

  async function initializeGuidance() {
    ensureGuidanceStyles();
    try {
      const [core, maturity, materials] = await Promise.all(GUIDANCE_FILES.map(loadGuidanceJson));
      const data = {
        notices: core.notices || [],
        items: { ...(core.items || {}), ...(maturity.items || {}) },
        materials: materials.materials || []
      };

      if (applyGuidance(data)) return;
      const form = document.querySelector("#checklistForm");
      if (!form) throw new Error("The assessment form is unavailable.");

      const observer = new MutationObserver(() => {
        if (!applyGuidance(data)) return;
        observer.disconnect();
      });
      observer.observe(form, { childList: true, subtree: true });
    } catch (error) {
      console.error(error);
      reportStatus("The guided project materials could not be loaded. Reload the page and try again.", true);
    }
  }

  let guidancePrintStates = [];
  window.addEventListener("beforeprint", () => {
    guidancePrintStates = Array.from(document.querySelectorAll(".item-guidance"))
      .map((details) => ({ details, open: details.open }));
    guidancePrintStates.forEach(({ details }) => {
      details.open = true;
    });
  });

  window.addEventListener("afterprint", () => {
    guidancePrintStates.forEach(({ details, open }) => {
      details.open = open;
    });
    guidancePrintStates = [];
  });

  initializeGuidance();
})();
