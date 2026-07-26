#!/usr/bin/env python3
"""Validate OpenReady's JSON content and configuration files."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
CHECKLIST_PATH = ROOT / "data" / "checklist.json"
SITE_PATH = ROOT / "data" / "site.json"
ID_PATTERN = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
CHECKLIST_SCHEMA_VERSION = 2
ASSESSMENT_LEVELS = {"core", "maturity"}
ASSESSMENT_STATUSES = {
    "complete",
    "in-progress",
    "not-started",
    "not-applicable",
}
PROHIBITED_ASSESSMENT_TERMS = {
    "funding",
    "monetization",
    "monetisation",
    "donation",
    "sponsorship",
    "crowdfunding",
    "paid-support",
    "paid-access",
}

REQUIRED_LINKS = {
    "repository",
    "issues",
    "discussions",
    "codeOfConduct",
    "license",
    "security",
    "governance",
    "changelog",
    "roadmap",
    "poweredByNetlify",
}

REQUIRED_THEME_TOKENS = {
    "themeColor",
    "background",
    "surface",
    "surfaceSoft",
    "surfaceElevated",
    "surfaceDark",
    "text",
    "muted",
    "border",
    "primary",
    "primaryHover",
    "primarySoft",
    "success",
    "successSoft",
    "danger",
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


def validate_assessment_configuration(data: dict[str, Any], errors: list[str]) -> None:
    if data.get("schemaVersion") != CHECKLIST_SCHEMA_VERSION:
        errors.append(
            f"data/checklist.json schemaVersion must be {CHECKLIST_SCHEMA_VERSION}."
        )

    levels = data.get("levels")
    if not isinstance(levels, dict):
        errors.append("data/checklist.json requires a 'levels' object.")
    else:
        missing_levels = sorted(ASSESSMENT_LEVELS - set(levels))
        if missing_levels:
            errors.append(
                "data/checklist.json is missing assessment levels: "
                + ", ".join(missing_levels)
                + "."
            )
        for level_name in ASSESSMENT_LEVELS:
            level = levels.get(level_name)
            if not isinstance(level, dict):
                errors.append(f"Assessment level '{level_name}' must be an object.")
                continue
            require_text(level, "label", f"Assessment level '{level_name}'", errors)
            require_text(level, "description", f"Assessment level '{level_name}'", errors)

    statuses = data.get("statuses")
    if not isinstance(statuses, list):
        errors.append("data/checklist.json requires a 'statuses' array.")
    else:
        status_set = {status for status in statuses if isinstance(status, str)}
        if status_set != ASSESSMENT_STATUSES or len(statuses) != len(ASSESSMENT_STATUSES):
            errors.append(
                "Assessment statuses must be exactly: "
                + ", ".join(sorted(ASSESSMENT_STATUSES))
                + "."
            )


def validate_checklist(data: Any, errors: list[str]) -> tuple[int, dict[str, int]]:
    if not isinstance(data, dict):
        errors.append("data/checklist.json must contain a JSON object.")
        return (0, {"core": 0, "maturity": 0})

    validate_assessment_configuration(data, errors)

    items = data.get("items")
    if not isinstance(items, list) or not items:
        errors.append("data/checklist.json must contain a non-empty 'items' array.")
        return (0, {"core": 0, "maturity": 0})

    seen_ids: set[str] = set()
    level_counts = {"core": 0, "maturity": 0}

    for index, item in enumerate(items, start=1):
        context = f"Checklist item {index}"
        if not isinstance(item, dict):
            errors.append(f"{context} must be a JSON object.")
            continue

        for key in ("id", "title", "description", "category", "level"):
            require_text(item, key, context, errors)

        item_id = item.get("id")
        if isinstance(item_id, str) and item_id:
            if not ID_PATTERN.fullmatch(item_id):
                errors.append(
                    f"{context} id '{item_id}' must use lowercase kebab-case characters."
                )
            if item_id in seen_ids:
                errors.append(f"Duplicate checklist id: '{item_id}'.")
            seen_ids.add(item_id)

            normalized_id = item_id.lower()
            prohibited = sorted(
                term for term in PROHIBITED_ASSESSMENT_TERMS if term in normalized_id
            )
            if prohibited:
                errors.append(
                    f"{context} id '{item_id}' introduces an out-of-scope funding or commercial assessment term."
                )

        level = item.get("level")
        if level not in ASSESSMENT_LEVELS:
            errors.append(f"{context} level must be 'core' or 'maturity'.")
        else:
            level_counts[level] += 1

        searchable_text = " ".join(
            str(item.get(key, "")).lower()
            for key in ("id", "category", "title")
        )
        prohibited_text = sorted(
            term for term in PROHIBITED_ASSESSMENT_TERMS if term in searchable_text
        )
        if prohibited_text:
            errors.append(
                f"{context} introduces an out-of-scope funding or commercial assessment concept."
            )

        resource_url = item.get("resourceUrl")
        resource_label = item.get("resourceLabel")
        if resource_url is not None and not is_http_url(resource_url):
            errors.append(f"{context} has an invalid 'resourceUrl'.")
        if resource_url is not None and (
            not isinstance(resource_label, str) or not resource_label.strip()
        ):
            errors.append(f"{context} needs 'resourceLabel' when 'resourceUrl' is set.")

    for level, count in level_counts.items():
        if count == 0:
            errors.append(f"Assessment level '{level}' must contain at least one item.")

    return len(items), level_counts


def validate_links(links: Any, errors: list[str]) -> None:
    if not isinstance(links, dict):
        errors.append("data/site.json requires a 'links' object.")
        return

    missing = sorted(REQUIRED_LINKS - set(links))
    if missing:
        errors.append(f"data/site.json is missing required links: {', '.join(missing)}.")

    for key, value in links.items():
        if not is_http_url(value):
            errors.append(f"Site link '{key}' must be a complete http(s) URL.")


def validate_documents(documents: Any, errors: list[str]) -> int:
    if not isinstance(documents, list) or not documents:
        errors.append("data/site.json requires a non-empty 'documents' array.")
        return 0

    for index, document in enumerate(documents, start=1):
        context = f"Document card {index}"
        if not isinstance(document, dict):
            errors.append(f"{context} must be a JSON object.")
            continue
        for key in ("label", "title", "description"):
            require_text(document, key, context, errors)
        if not is_http_url(document.get("url")):
            errors.append(f"{context} requires a complete http(s) 'url'.")

    return len(documents)


def validate_themes(themes: Any, errors: list[str]) -> None:
    if not isinstance(themes, dict):
        errors.append("data/site.json requires a 'themes' object.")
        return

    for theme_name in ("light", "dark"):
        theme = themes.get(theme_name)
        if not isinstance(theme, dict):
            errors.append(f"Theme '{theme_name}' is missing or invalid.")
            continue
        missing = sorted(REQUIRED_THEME_TOKENS - set(theme))
        if missing:
            errors.append(
                f"Theme '{theme_name}' is missing tokens: {', '.join(missing)}."
            )
        for key, value in theme.items():
            if not isinstance(value, str) or not value.strip():
                errors.append(f"Theme '{theme_name}' token '{key}' must be text.")


def validate_site(data: Any, errors: list[str]) -> tuple[int, int]:
    if not isinstance(data, dict):
        errors.append("data/site.json must contain a JSON object.")
        return (0, 0)

    application = data.get("application")
    if not isinstance(application, dict):
        errors.append("data/site.json requires an 'application' object.")
    else:
        for key in ("name", "version", "status"):
            require_text(application, key, "Application configuration", errors)
        for key in ("repository", "liveSite"):
            if not is_http_url(application.get(key)):
                errors.append(f"Application configuration requires a valid '{key}' URL.")

    validate_links(data.get("links"), errors)
    document_count = validate_documents(data.get("documents"), errors)
    validate_themes(data.get("themes"), errors)

    roadmap = data.get("roadmap")
    roadmap_count = 0
    if not isinstance(roadmap, list) or not roadmap:
        errors.append("data/site.json requires a non-empty 'roadmap' array.")
    else:
        roadmap_count = len(roadmap)
        for index, release in enumerate(roadmap, start=1):
            context = f"Roadmap entry {index}"
            if not isinstance(release, dict):
                errors.append(f"{context} must be a JSON object.")
                continue
            for key in ("state", "label", "version", "description"):
                require_text(release, key, context, errors)
            if release.get("state") not in {"done", "current", "planned"}:
                errors.append(
                    f"{context} state must be 'done', 'current', or 'planned'."
                )

    return document_count, roadmap_count


def main() -> int:
    errors: list[str] = []
    checklist_data = load_json(CHECKLIST_PATH, errors)
    site_data = load_json(SITE_PATH, errors)

    checklist_count = 0
    level_counts = {"core": 0, "maturity": 0}
    if checklist_data:
        checklist_count, level_counts = validate_checklist(checklist_data, errors)

    document_count, roadmap_count = validate_site(site_data, errors) if site_data else (0, 0)

    if errors:
        print("OpenReady data validation failed:\n", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    print("OpenReady data validation passed.")
    print(f"- Checklist items: {checklist_count}")
    print(f"- Core readiness items: {level_counts['core']}")
    print(f"- Operational maturity items: {level_counts['maturity']}")
    print(f"- Documentation cards: {document_count}")
    print(f"- Roadmap entries: {roadmap_count}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
