#!/usr/bin/env python3
"""Validate OpenReady checklist guidance and editable starter materials."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
CHECKLIST_PATH = ROOT / "data" / "checklist.json"
CORE_PATH = ROOT / "data" / "guidance-core.json"
MATURITY_PATH = ROOT / "data" / "guidance-maturity.json"
MATERIALS_PATH = ROOT / "data" / "materials.json"
ID_PATTERN = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
REQUIRED_NOTICE_IDS = {"legal", "security", "accessibility"}
REQUIRED_GUIDANCE_ARRAYS = {
    "minimum",
    "stronger",
    "commonMistakes",
    "exampleEvidence",
}
REQUIRED_MATERIAL_IDS = {
    "readme-plan",
    "accessibility-statement",
    "security-policy-review",
    "threat-model-outline",
    "incident-response-checklist",
    "governance-roles",
    "support-boundaries",
    "conduct-enforcement",
    "metrics-plan",
    "license-review",
}
PROHIBITED_MATERIAL_ID_TERMS = {
    "funding",
    "donation",
    "sponsorship",
    "monetization",
    "monetisation",
    "pricing",
    "premium",
    "paid-support",
}


def load_json(path: Path, errors: list[str]) -> Any:
    try:
        with path.open("r", encoding="utf-8") as file:
            return json.load(file)
    except FileNotFoundError:
        errors.append(f"Missing file: {path.relative_to(ROOT)}")
    except json.JSONDecodeError as error:
        errors.append(
            f"Invalid JSON in {path.relative_to(ROOT)}: "
            f"line {error.lineno}, column {error.colno}: {error.msg}"
        )
    return None


def is_http_url(value: Any) -> bool:
    if not isinstance(value, str) or not value.strip():
        return False
    parsed = urlparse(value)
    return parsed.scheme in {"http", "https"} and bool(parsed.netloc)


def require_text(container: dict[str, Any], key: str, context: str, errors: list[str]) -> None:
    value = container.get(key)
    if not isinstance(value, str) or not value.strip():
        errors.append(f"{context} requires a non-empty '{key}' value.")


def validate_notices(notices: Any, errors: list[str]) -> int:
    if not isinstance(notices, list):
        errors.append("data/guidance-core.json requires a 'notices' array.")
        return 0

    seen: set[str] = set()
    for index, notice in enumerate(notices, start=1):
        context = f"Guidance notice {index}"
        if not isinstance(notice, dict):
            errors.append(f"{context} must be an object.")
            continue
        for key in ("id", "title", "text"):
            require_text(notice, key, context, errors)
        notice_id = notice.get("id")
        if isinstance(notice_id, str):
            if notice_id in seen:
                errors.append(f"Duplicate guidance notice id: '{notice_id}'.")
            seen.add(notice_id)

    if seen != REQUIRED_NOTICE_IDS:
        errors.append(
            "Guidance notices must be exactly: " + ", ".join(sorted(REQUIRED_NOTICE_IDS)) + "."
        )
    return len(notices)


def validate_materials(data: Any, errors: list[str]) -> tuple[set[str], int]:
    if not isinstance(data, dict) or data.get("schemaVersion") != 1:
        errors.append("data/materials.json schemaVersion must be 1.")
        return set(), 0

    materials = data.get("materials")
    if not isinstance(materials, list) or not materials:
        errors.append("data/materials.json requires a non-empty 'materials' array.")
        return set(), 0

    ids: set[str] = set()
    for index, material in enumerate(materials, start=1):
        context = f"Guided material {index}"
        if not isinstance(material, dict):
            errors.append(f"{context} must be an object.")
            continue
        for key in ("id", "title", "filename", "description", "disclaimer", "content"):
            require_text(material, key, context, errors)

        material_id = material.get("id")
        if isinstance(material_id, str) and material_id:
            if not ID_PATTERN.fullmatch(material_id):
                errors.append(f"{context} id '{material_id}' must use lowercase kebab-case.")
            if material_id in ids:
                errors.append(f"Duplicate guided material id: '{material_id}'.")
            ids.add(material_id)
            if any(term in material_id for term in PROHIBITED_MATERIAL_ID_TERMS):
                errors.append(f"{context} introduces an out-of-scope commercial material id.")

        filename = material.get("filename")
        if isinstance(filename, str) and filename and not filename.lower().endswith(".md"):
            errors.append(f"{context} filename must end in .md.")

    missing = sorted(REQUIRED_MATERIAL_IDS - ids)
    if missing:
        errors.append("Missing required guided materials: " + ", ".join(missing) + ".")
    return ids, len(materials)


def validate_guidance_item(
    item_id: str,
    value: Any,
    material_ids: set[str],
    errors: list[str],
) -> None:
    context = f"Guidance for '{item_id}'"
    if not isinstance(value, dict):
        errors.append(f"{context} must be an object.")
        return

    require_text(value, "whyItMatters", context, errors)

    for key in REQUIRED_GUIDANCE_ARRAYS:
        entries = value.get(key)
        if not isinstance(entries, list) or not entries:
            errors.append(f"{context} requires a non-empty '{key}' array.")
            continue
        for index, entry in enumerate(entries, start=1):
            if not isinstance(entry, str) or not entry.strip():
                errors.append(f"{context} {key} entry {index} must be non-empty text.")

    resources = value.get("resources")
    if not isinstance(resources, list) or not resources:
        errors.append(f"{context} requires at least one resource link.")
    else:
        for index, resource in enumerate(resources, start=1):
            resource_context = f"{context} resource {index}"
            if not isinstance(resource, dict):
                errors.append(f"{resource_context} must be an object.")
                continue
            require_text(resource, "label", resource_context, errors)
            if not is_http_url(resource.get("url")):
                errors.append(f"{resource_context} requires a complete http(s) URL.")

    starter_id = value.get("starterId")
    if starter_id is not None:
        if not isinstance(starter_id, str) or not starter_id.strip():
            errors.append(f"{context} starterId must be non-empty text when provided.")
        elif starter_id not in material_ids:
            errors.append(f"{context} references missing guided material '{starter_id}'.")


def main() -> int:
    errors: list[str] = []
    checklist = load_json(CHECKLIST_PATH, errors)
    core = load_json(CORE_PATH, errors)
    maturity = load_json(MATURITY_PATH, errors)
    materials = load_json(MATERIALS_PATH, errors)

    checklist_items = checklist.get("items") if isinstance(checklist, dict) else None
    checklist_ids = {
        item.get("id")
        for item in checklist_items or []
        if isinstance(item, dict) and isinstance(item.get("id"), str)
    }

    for name, data in (("guidance-core", core), ("guidance-maturity", maturity)):
        if not isinstance(data, dict) or data.get("schemaVersion") != 1:
            errors.append(f"data/{name}.json schemaVersion must be 1.")

    notice_count = validate_notices(core.get("notices") if isinstance(core, dict) else None, errors)
    material_ids, material_count = validate_materials(materials, errors)

    combined: dict[str, Any] = {}
    for source_name, source in (("core", core), ("maturity", maturity)):
        source_items = source.get("items") if isinstance(source, dict) else None
        if not isinstance(source_items, dict):
            errors.append(f"{source_name} guidance requires an 'items' object.")
            continue
        for item_id, value in source_items.items():
            if item_id in combined:
                errors.append(f"Duplicate guidance item id across files: '{item_id}'.")
            combined[item_id] = value

    missing_guidance = sorted(checklist_ids - set(combined))
    extra_guidance = sorted(set(combined) - checklist_ids)
    if missing_guidance:
        errors.append("Checklist items missing guidance: " + ", ".join(missing_guidance) + ".")
    if extra_guidance:
        errors.append("Guidance exists for unknown checklist items: " + ", ".join(extra_guidance) + ".")

    for item_id, value in combined.items():
        validate_guidance_item(item_id, value, material_ids, errors)

    if errors:
        print("OpenReady guidance validation failed:\n", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    print("OpenReady guidance validation passed.")
    print(f"- Guidance notices: {notice_count}")
    print(f"- Guided checklist items: {len(combined)}")
    print(f"- Editable starter materials: {material_count}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
