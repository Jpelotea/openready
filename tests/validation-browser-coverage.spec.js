const fs = require('node:fs');
const path = require('node:path');
const { test, expect } = require('@playwright/test');

const FIXTURE_DIR = path.join(__dirname, 'fixtures');

async function openCleanPage(page) {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await expect(page.locator('[data-assessment-status]').first()).toBeVisible();
  await expect(page.locator('.item-guidance').first()).toBeVisible();
}

async function importFixture(page, filename) {
  const chooserPromise = page.waitForEvent('filechooser');
  await page.getByRole('button', { name: 'Import JSON' }).click();
  const chooser = await chooserPromise;
  await chooser.setFiles(path.join(FIXTURE_DIR, filename));
  await expect(page.locator('#toolStatus')).not.toHaveText('');
}

async function exportPayload(page) {
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export JSON' }).click();
  const download = await downloadPromise;
  const downloadPath = await download.path();
  return JSON.parse(fs.readFileSync(downloadPath, 'utf8'));
}

test('v0.1.0 completed exports migrate and preserve removed historical items', async ({ page }) => {
  await openCleanPage(page);
  await importFixture(page, 'legacy-v0.1.0.json');

  await expect(page.locator('[data-assessment-status][data-item-id="license"]')).toHaveValue('complete');
  await expect(page.locator('[data-assessment-status][data-item-id="readme"]')).toHaveValue('not-started');
  await expect(page.locator('#projectNotes')).toHaveValue(
    'Representative export created by OpenReady v0.1.0.'
  );
  await expect(page.locator('#profileName')).toHaveValue('');
  await expect(page.locator('#toolStatus')).toContainText(
    'Legacy checklist migrated to assessment schema v2.'
  );
  await expect(page.locator('#toolStatus')).toContainText(
    'unsupported field was preserved for re-export'
  );

  const exported = await exportPayload(page);
  expect(
    exported.preservedImportData.unknownItems.some(
      (item) => item.id === 'non-commercial' && item.complete === true
    )
  ).toBeTruthy();
});

test('v0.2.0 format-version-one exports migrate known checklist states and notes', async ({ page }) => {
  await openCleanPage(page);
  await importFixture(page, 'legacy-v0.2.0.json');

  await expect(page.locator('[data-assessment-status][data-item-id="license"]')).toHaveValue('complete');
  await expect(page.locator('[data-assessment-status][data-item-id="security"]')).toHaveValue('complete');
  await expect(page.locator('[data-assessment-status][data-item-id="governance"]')).toHaveValue('not-started');
  await expect(page.locator('#projectNotes')).toHaveValue(
    'Representative export created by OpenReady v0.2.0.'
  );
  await expect(page.locator('#profileName')).toHaveValue('');
  await expect(page.locator('#toolStatus')).toHaveText(
    'Legacy checklist migrated to assessment schema v2. Project profile restored.'
  );
});

test('v0.3.0 project-profile exports migrate checklist, notes, and project identity', async ({ page }) => {
  await openCleanPage(page);
  await importFixture(page, 'legacy-v0.3.0.json');

  await expect(page.locator('[data-assessment-status][data-item-id="license"]')).toHaveValue('complete');
  await expect(page.locator('[data-assessment-status][data-item-id="community-docs"]')).toHaveValue('complete');
  await expect(page.locator('[data-assessment-status][data-item-id="roadmap"]')).toHaveValue('not-started');
  await expect(page.locator('#projectNotes')).toHaveValue(
    'Representative export created by OpenReady v0.3.0.'
  );
  await expect(page.locator('#profileName')).toHaveValue('OpenReady Historical Fixture');
  await expect(page.locator('#profileRepository')).toHaveValue(
    'https://github.com/example/openready-historical-fixture'
  );
  await expect(page.locator('#profileMaintainer')).toHaveValue('Example Maintainers');
  await expect(page.locator('#profileReviewDate')).toHaveValue('2026-07-27');
  await expect(page.locator('#toolStatus')).toHaveText(
    'Legacy checklist migrated to assessment schema v2. Project profile restored.'
  );

  const exported = await exportPayload(page);
  expect(exported.project).toEqual({
    name: 'OpenReady Historical Fixture',
    repository: 'https://github.com/example/openready-historical-fixture',
    maintainer: 'Example Maintainers',
    reviewDate: '2026-07-27',
  });
});

test('repeated assessment and guidance controls have item-specific accessible names', async ({ page }) => {
  await openCleanPage(page);

  const result = await page.locator('.check-item[data-item-id]').evaluateAll((cards) =>
    cards.map((card) => {
      const title = card.querySelector('.check-title')?.textContent?.trim() || '';
      const getLabel = (selector) => card.querySelector(selector)?.getAttribute('aria-label') || '';
      return {
        title,
        status: getLabel('[data-assessment-status]'),
        evidenceUrl: getLabel('[data-assessment-field="evidenceUrl"]'),
        note: getLabel('[data-assessment-field="note"]'),
        reviewedAt: getLabel('[data-assessment-field="reviewedAt"]'),
        responsible: getLabel('[data-assessment-field="responsible"]'),
        evidenceSummary: getLabel('.assessment-evidence summary'),
        guidanceSummary: getLabel('.item-guidance summary'),
      };
    })
  );

  expect(result).toHaveLength(22);
  result.forEach((item) => {
    expect(item.title).not.toBe('');
    expect(item.status).toBe(`Assessment status for ${item.title}`);
    expect(item.evidenceUrl).toBe(`Evidence URL for ${item.title}`);
    expect(item.note).toBe(`Item note for ${item.title}`);
    expect(item.reviewedAt).toBe(`Last reviewed for ${item.title}`);
    expect(item.responsible).toBe(`Responsible person or team for ${item.title}`);
    expect(item.evidenceSummary).toBe(`Evidence and review details for ${item.title}`);
    expect(item.guidanceSummary).toBe(`How to improve ${item.title}`);
  });

  expect(new Set(result.map((item) => item.status)).size).toBe(result.length);
});

test('starter editors and actions identify both the material and assessment item', async ({ page }) => {
  await openCleanPage(page);

  const starters = await page.locator('.material-starter').evaluateAll((sections) =>
    sections.map((section) => {
      const heading = section.querySelector('h5')?.textContent?.trim() || '';
      const textarea = section.querySelector('textarea');
      const label = textarea?.labels?.[0]?.textContent?.trim() || '';
      const buttons = Array.from(section.querySelectorAll('button')).map((button) => ({
        text: button.textContent?.trim() || '',
        name: button.getAttribute('aria-label') || '',
      }));
      return { heading, label, buttons };
    })
  );

  expect(starters.length).toBeGreaterThanOrEqual(10);
  starters.forEach((starter) => {
    expect(starter.heading).not.toBe('');
    expect(starter.label).toContain(`Editable ${starter.heading} for `);
    starter.buttons.forEach((button) => {
      expect(button.name).toContain(starter.heading);
      expect(button.name).not.toBe(button.text);
    });
  });
});

test('invalid and oversized imports produce actionable error messages', async ({ page }) => {
  await openCleanPage(page);

  let chooserPromise = page.waitForEvent('filechooser');
  await page.getByRole('button', { name: 'Import JSON' }).click();
  let chooser = await chooserPromise;
  await chooser.setFiles({
    name: 'invalid.json',
    mimeType: 'application/json',
    buffer: Buffer.from('{not valid json'),
  });
  await expect(page.locator('#toolStatus')).toHaveAttribute('data-status', 'error');
  await expect(page.locator('#toolStatus')).not.toHaveText('');

  chooserPromise = page.waitForEvent('filechooser');
  await page.getByRole('button', { name: 'Import JSON' }).click();
  chooser = await chooserPromise;
  await chooser.setFiles({
    name: 'too-large.json',
    mimeType: 'application/json',
    buffer: Buffer.alloc(2 * 1024 * 1024 + 1, 32),
  });
  await expect(page.locator('#toolStatus')).toHaveText(
    'This file is larger than the 2 MB OpenReady import limit.'
  );
  await expect(page.locator('#toolStatus')).toHaveAttribute('data-status', 'error');
});
