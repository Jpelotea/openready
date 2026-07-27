#!/usr/bin/env python3
"""Reject funding and commercial concepts in OpenReady's public JSON configuration."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any, Iterable

ROOT = Path(__file__).resolve().parents[1]
DATA_PATHS = {
    "checklist": ROOT / "data" / "checklist.json",
    "site": ROOT / "data" / "site.json",
    "guidance-core": ROOT / "data" / "guidance-core.json",
    "guidance-maturity": ROOT / "data" / "guidance-maturity.json",
    "materials": ROOT / "data" / "materials.json",
}

PROHIBITED_PATTERNS = {
    "funding": re.compile(r"\bfund(?:ing|ed|raiser|raising)?\b", re.IGNORECASE),
    "donation": re.compile(r"\bdonat(?:e|es|ed|ing|ion|ions)\b", re.IGNORECASE),
    "sponsorship": re.compile(r"\bsponsor(?:s|ed|ing|ship|ships)?\b", re.IGNORECASE),
    "crowdfunding": re.compile(r"\bcrowd[\s_-]*fund(?:ing)?\b", re.IGNORECASE),
    "monetization": re.compile(r"\bmoneti[sz](?:e|ed|ing|ation)\b", re.IGNORECASE),
    "pricing": re.compile(r"\bpric(?:e|es|ed|ing)\b", re.IGNORECASE),
    "premium": re.compile(r"\bpremium\b", re.IGNORECASE),
    "paid support": re.compile(r"\bpaid[\s_-]+support\b", re.IGNORECASE),
    "paid access": re.compile(r"\bpaid[\s_-]+access\b", re.IGNORECASE),
    "consulting": re.compile(r"\bconsult(?:ant|ants|ing|ancy)\b", re.IGNORECASE),
    "affiliate": re.compile(r"\baffiliate(?:s|d)?\b", re.IGNORECASE),
    "advertising": re.compile(r"\badvertis(?:e|es|ed|ing|ement|ements)\b", re.IGNORECASE),
    "revenue": re.compile(r"\brevenue\b", re.IGNORECASE),
    "sales funnel": re.compile(r"\bsales?[\s_-]+funnel\b", re.IGNORECASE),
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


def iter_prohibited(value: Any) -> Iterable[str]:
    if not isinstance(value, str) or not value.strip():
        return ()
    return tuple(name for name, pattern in PROHIBITED_PATTERNS.items() if pattern.search(value))


def check_value(file_name: str, json_path: str, value: Any, errors: list[str]) -> None:
    for concept in iter_prohibited(value):
        errors.append(
            f"data/{file_name}.json {json_path} introduces the out-of-scope "
            f"'{concept}' concept. Remove funding or commercial configuration from OpenReady."
        )


def validate_checklist(data: Any, errors: list[str]) -> None:
    items = data.get("items") if isinstance(data, dict) else None
    if not isinstance(items, list):
        return
    for index, item in enumerate(items):
        if not isinstance(item, dict):
            continue
        for key in ("id", "category", "title", "resourceLabel", "resourceUrl"):
            check_value("checklist", f"items[{index}].{key}", item.get(key), errors)


def validate_site(data: Any, errors: list[str]) -> None:
    if not isinstance(data, dict):
        return

    links = data.get("links")
    if isinstance(links, dict):
        for key, value in links.items():
            check_value("site", f"links.{key} (key)", key, errors)
            check_value("site", f"links.{key}", value, errors)

    for collection_name in ("principles", "features", "documents", "roadmap"):
        collection = data.get(collection_name)
        if not isinstance(collection, list):
            continue
        for index, entry in enumerate(collection):
            if not isinstance(entry, dict):
                continue
            for key in ("id", "label", "title", "url"):
                if key in entry:
                    check_value("site", f"{collection_name}[{index}].{key}", entry.get(key), errors)


def validate_guidance(file_name: str, data: Any, errors: list[str]) -> None:
    items = data.get("items") if isinstance(data, dict) else None
    if not isinstance(items, dict):
        return
    for item_id, guidance in items.items():
        check_value(file_name, f"items.{item_id} (key)", item_id, errors)
        if not isinstance(guidance, dict):
            continue
        check_value(file_name, f"items.{item_id}.starterId", guidance.get("starterId"), errors)
        resources = guidance.get("resources")
        if not isinstance(resources, list):
            continue
        for index, resource in enumerate(resources):
            if not isinstance(resource, dict):
                continue
            check_value(file_name, f"items.{item_id}.resources[{index}].label", resource.get("label"), errors)
            check_value(file_name, f"items.{item_id}.resources[{index}].url", resource.get("url"), errors)


def validate_materials(data: Any, errors: list[str]) -> None:
    materials = data.get("materials") if isinstance(data, dict) else None
    if not isinstance(materials, list):
        return
    for index, material in enumerate(materials):
        if not isinstance(material, dict):
            continue
        for key in ("id", "title", "filename"):
            check_value("materials", f"materials[{index}].{key}", material.get(key), errors)


def validate_data_bundle(bundle: dict[str, Any]) -> list[str]:
    errors: list[str] = []
    validate_checklist(bundle.get("checklist"), errors)
    validate_site(bundle.get("site"), errors)
    validate_guidance("guidance-core", bundle.get("guidance-core"), errors)
    validate_guidance("guidance-maturity", bundle.get("guidance-maturity"), errors)
    validate_materials(bundle.get("materials"), errors)
    return errors


def main() -> int:
    load_errors: list[str] = []
    bundle = {name: load_json(path, load_errors) for name, path in DATA_PATHS.items()}
    errors = load_errors + validate_data_bundle(bundle)

    if errors:
        print("OpenReady non-commercial scope validation failed:\n", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    print("OpenReady non-commercial scope validation passed.")
    print("- Checked checklist identities and resource links")
    print("- Checked site links and public card identities")
    print("- Checked guidance resources and starter references")
    print("- Checked guided-material identities and filenames")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
