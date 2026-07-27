#!/usr/bin/env python3
"""Regression tests for OpenReady's project-data validators."""

from __future__ import annotations

import copy
import importlib.util
import json
import unittest
from pathlib import Path
from types import ModuleType

ROOT = Path(__file__).resolve().parents[1]


def load_module(name: str, relative_path: str) -> ModuleType:
    path = ROOT / relative_path
    spec = importlib.util.spec_from_file_location(name, path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Could not load {relative_path}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def load_json(relative_path: str):
    with (ROOT / relative_path).open("r", encoding="utf-8") as file:
        return json.load(file)


validate_data = load_module("validate_data", "scripts/validate_data.py")
validate_guidance = load_module("validate_guidance", "scripts/validate_guidance.py")
validate_scope = load_module("validate_project_scope", "scripts/validate_project_scope.py")


class ProjectDataValidatorTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.checklist = load_json("data/checklist.json")
        cls.site = load_json("data/site.json")
        cls.core = load_json("data/guidance-core.json")
        cls.maturity = load_json("data/guidance-maturity.json")
        cls.materials = load_json("data/materials.json")

    def test_current_project_data_passes_all_validator_functions(self):
        errors: list[str] = []
        validate_data.validate_checklist(copy.deepcopy(self.checklist), errors)
        validate_data.validate_site(copy.deepcopy(self.site), errors)

        material_errors: list[str] = []
        material_ids, _ = validate_guidance.validate_materials(
            copy.deepcopy(self.materials), material_errors
        )
        combined = {
            **copy.deepcopy(self.core["items"]),
            **copy.deepcopy(self.maturity["items"]),
        }
        for item_id, guidance in combined.items():
            validate_guidance.validate_guidance_item(
                item_id, guidance, material_ids, material_errors
            )

        scope_errors = validate_scope.validate_data_bundle(
            {
                "checklist": copy.deepcopy(self.checklist),
                "site": copy.deepcopy(self.site),
                "guidance-core": copy.deepcopy(self.core),
                "guidance-maturity": copy.deepcopy(self.maturity),
                "materials": copy.deepcopy(self.materials),
            }
        )

        self.assertEqual(errors, [])
        self.assertEqual(material_errors, [])
        self.assertEqual(scope_errors, [])

    def test_schema_version_failure_names_the_file_and_expected_version(self):
        checklist = copy.deepcopy(self.checklist)
        checklist["schemaVersion"] = 1
        errors: list[str] = []
        validate_data.validate_checklist(checklist, errors)
        self.assertIn("data/checklist.json schemaVersion must be 2.", errors)

    def test_missing_theme_token_names_the_theme_and_token(self):
        site = copy.deepcopy(self.site)
        del site["themes"]["dark"]["primary"]
        errors: list[str] = []
        validate_data.validate_site(site, errors)
        self.assertTrue(
            any("Theme 'dark' is missing tokens: primary." in error for error in errors),
            errors,
        )

    def test_invalid_guidance_resource_names_the_item_and_resource(self):
        guidance = copy.deepcopy(self.core["items"]["license"])
        guidance["resources"][0]["url"] = "javascript:alert(1)"
        errors: list[str] = []
        material_ids, _ = validate_guidance.validate_materials(
            copy.deepcopy(self.materials), errors
        )
        validate_guidance.validate_guidance_item(
            "license", guidance, material_ids, errors
        )
        self.assertTrue(
            any(
                "Guidance for 'license' resource 1 requires a complete http(s) URL."
                in error
                for error in errors
            ),
            errors,
        )

    def test_scope_validator_rejects_donation_link_with_json_path(self):
        site = copy.deepcopy(self.site)
        site["links"]["donations"] = "https://example.org/donate"
        errors = validate_scope.validate_data_bundle(
            {
                "checklist": copy.deepcopy(self.checklist),
                "site": site,
                "guidance-core": copy.deepcopy(self.core),
                "guidance-maturity": copy.deepcopy(self.maturity),
                "materials": copy.deepcopy(self.materials),
            }
        )
        self.assertTrue(
            any(
                "data/site.json links.donations" in error
                and "donation" in error
                for error in errors
            ),
            errors,
        )

    def test_scope_validator_rejects_commercial_document_card(self):
        site = copy.deepcopy(self.site)
        site["documents"][0]["title"] = "Premium support"
        errors = validate_scope.validate_data_bundle(
            {
                "checklist": copy.deepcopy(self.checklist),
                "site": site,
                "guidance-core": copy.deepcopy(self.core),
                "guidance-maturity": copy.deepcopy(self.maturity),
                "materials": copy.deepcopy(self.materials),
            }
        )
        self.assertTrue(
            any(
                "data/site.json documents[0].title" in error
                and "premium" in error
                for error in errors
            ),
            errors,
        )

    def test_scope_validator_rejects_funding_guidance_resource(self):
        core = copy.deepcopy(self.core)
        core["items"]["license"]["resources"][0] = {
            "label": "Funding guide",
            "url": "https://example.org/funding",
        }
        errors = validate_scope.validate_data_bundle(
            {
                "checklist": copy.deepcopy(self.checklist),
                "site": copy.deepcopy(self.site),
                "guidance-core": core,
                "guidance-maturity": copy.deepcopy(self.maturity),
                "materials": copy.deepcopy(self.materials),
            }
        )
        self.assertTrue(
            any(
                "data/guidance-core.json items.license.resources[0]" in error
                and "funding" in error
                for error in errors
            ),
            errors,
        )

    def test_scope_validator_rejects_paid_support_material_identity(self):
        materials = copy.deepcopy(self.materials)
        materials["materials"][0]["title"] = "Paid support starter"
        errors = validate_scope.validate_data_bundle(
            {
                "checklist": copy.deepcopy(self.checklist),
                "site": copy.deepcopy(self.site),
                "guidance-core": copy.deepcopy(self.core),
                "guidance-maturity": copy.deepcopy(self.maturity),
                "materials": materials,
            }
        )
        self.assertTrue(
            any(
                "data/materials.json materials[0].title" in error
                and "paid support" in error
                for error in errors
            ),
            errors,
        )


if __name__ == "__main__":
    unittest.main(verbosity=2)
