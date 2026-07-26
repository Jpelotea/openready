const fs = require('node:fs');
const { test, expect } = require('@playwright/test');

async function openCleanPage(page) {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await expect(page.locator('[data-assessment-status]').first()).toBeVisible();
}

function maximumDurationInSeconds(value) {
  return Math.max(
    ...value.split(',').map((part) => {
      const duration = part.trim();
      if (duration.endsWith('ms')) return Number.parseFloat(duration) / 1000;
      if (duration.endsWith('s')) return Number.parseFloat(duration);
      return 0;
    })
  );
}

async function importPayload(page, payload, filename = 'openready-test.json') {
  const chooserPromise = page.waitForEvent('filechooser');
  const importButton = page.getByRole('button', { name: 'Import JSON' });
  await importButton.focus();
  await page.keyboard.press('Enter');
  const chooser = await chooserPromise;
  await chooser.setFiles({
    name: filename,
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify(payload)),
  });
}

async function exportPayload(page) {
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export JSON' }).click();
  const download = await downloadPromise;
  const downloadPath = await download.path();
  return {
    download,
    payload: JSON.parse(fs.readFileSync(downloadPath, 'utf8')),
  };
}

test('keyboard users can reach the main controls and save assessment progress', async ({ page }) => {
  await openCleanPage(page);

  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  await expect(page.locator('.skip-link')).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main-content$/);

  await page.goto('/');
  await expect(page.locator('[data-assessment-status]').first()).toBeVisible();

  const firstStatusId = await page.locator('[data-assessment-status]').first().getAttribute('id');
  const reachedIds = new Set();
  for (let index = 0; index < 180; index += 1) {
    await page.keyboard.press('Tab');
    const id = await page.evaluate(() => document.activeElement?.id || '');
    if (id) reachedIds.add(id);
  }

  for (const requiredId of [
    'themeToggle',
    'profileName',
    'profileRepository',
    'profileMaintainer',
    'profileReviewDate',
    firstStatusId,
    'exportButton',
    'importButton',
    'printButton',
    'resetButton',
    'projectNotes',
  ]) {
    expect(reachedIds.has(requiredId), `${requiredId} should be keyboard reachable`).toBeTruthy();
  }

  const firstStatus = page.locator('[data-assessment-status]').first();
  await firstStatus.focus();
  await firstStatus.selectOption('complete');
  await expect(firstStatus).toHaveValue('complete');
  await expect(page.locator('#progressText')).toContainText('1 complete');

  await page.reload();
  await expect(page.locator('[data-assessment-status]').first()).toHaveValue('complete');
});

test('status, evidence, review date, and responsibility persist locally', async ({ page }) => {
  await openCleanPage(page);

  const firstItemId = await page.locator('[data-assessment-status]').first().getAttribute('data-item-id');
  await page.locator(`[data-assessment-status][data-item-id="${firstItemId}"]`).selectOption('in-progress');
  await page.locator(`.assessment-evidence[data-item-id="${firstItemId}"] summary`).click();
  await page.locator(`[data-assessment-field="evidenceUrl"][data-item-id="${firstItemId}"]`).fill('https://example.org/evidence');
  await page.locator(`[data-assessment-field="note"][data-item-id="${firstItemId}"]`).fill('Review is underway.');
  await page.locator(`[data-assessment-field="reviewedAt"][data-item-id="${firstItemId}"]`).fill('2026-08-20');
  await page.locator(`[data-assessment-field="responsible"][data-item-id="${firstItemId}"]`).fill('Community Team');

  await page.reload();

  await expect(page.locator(`[data-assessment-status][data-item-id="${firstItemId}"]`)).toHaveValue('in-progress');
  await expect(page.locator(`[data-assessment-field="evidenceUrl"][data-item-id="${firstItemId}"]`)).toHaveValue('https://example.org/evidence');
  await expect(page.locator(`[data-assessment-field="note"][data-item-id="${firstItemId}"]`)).toHaveValue('Review is underway.');
  await expect(page.locator(`[data-assessment-field="reviewedAt"][data-item-id="${firstItemId}"]`)).toHaveValue('2026-08-20');
  await expect(page.locator(`[data-assessment-field="responsible"][data-item-id="${firstItemId}"]`)).toHaveValue('Community Team');
  await expect(page.locator(`.assessment-evidence[data-item-id="${firstItemId}"]`)).toHaveAttribute('open', '');
});

test('legacy v0.1-v0.3 checklist files migrate with notes and project profile', async ({ page }) => {
  await openCleanPage(page);

  const firstItemId = await page.locator('[data-assessment-status]').first().getAttribute('data-item-id');
  const payload = {
    format: 'openready-checklist',
    formatVersion: 1,
    completedItems: [{ id: firstItemId, complete: true }],
    notes: 'Imported during automated browser testing.',
    project: {
      name: 'Example Community Project',
      repository: 'https://github.com/example/community-project',
      maintainer: 'Example Maintainers',
      reviewDate: '2026-08-15',
    },
  };

  await importPayload(page, payload);

  await expect(page.locator('[data-assessment-status]').first()).toHaveValue('complete');
  await expect(page.locator('#projectNotes')).toHaveValue(payload.notes);
  await expect(page.locator('#profileName')).toHaveValue(payload.project.name);
  await expect(page.locator('#profileRepository')).toHaveValue(payload.project.repository);
  await expect(page.locator('#profileMaintainer')).toHaveValue(payload.project.maintainer);
  await expect(page.locator('#profileReviewDate')).toHaveValue(payload.project.reviewDate);
  await expect(page.locator('#toolStatus')).toHaveText(
    'Legacy checklist migrated to assessment schema v2. Project profile restored.'
  );
});

test('schema v2 imports restore metadata and preserve unsupported fields for re-export', async ({ page }) => {
  await openCleanPage(page);

  const itemIds = await page.locator('[data-assessment-status]').evaluateAll((elements) =>
    elements.slice(0, 2).map((element) => element.dataset.itemId)
  );
  const [firstItemId, secondItemId] = itemIds;
  const payload = {
    format: 'openready-checklist',
    formatVersion: 2,
    futureTopLevelSetting: { enabled: true },
    items: [
      {
        id: firstItemId,
        status: 'complete',
        evidenceUrl: 'https://example.org/verified',
        note: 'Verified by the project team.',
        reviewedAt: '2026-08-21',
        responsible: 'Maintainers',
        futureItemField: 'preserve me',
      },
      {
        id: secondItemId,
        status: 'future-status',
      },
      {
        id: 'future-item-id',
        status: 'complete',
        custom: true,
      },
    ],
    notes: 'Schema v2 import.',
    project: {
      name: 'Schema Two Project',
      repository: 'https://github.com/example/schema-two',
      maintainer: 'Schema Team',
      reviewDate: '2026-10-01',
    },
  };

  await importPayload(page, payload, 'openready-v2-test.json');

  await expect(page.locator(`[data-assessment-status][data-item-id="${firstItemId}"]`)).toHaveValue('complete');
  await expect(page.locator(`[data-assessment-field="evidenceUrl"][data-item-id="${firstItemId}"]`)).toHaveValue(payload.items[0].evidenceUrl);
  await expect(page.locator(`[data-assessment-field="note"][data-item-id="${firstItemId}"]`)).toHaveValue(payload.items[0].note);
  await expect(page.locator(`[data-assessment-field="reviewedAt"][data-item-id="${firstItemId}"]`)).toHaveValue(payload.items[0].reviewedAt);
  await expect(page.locator(`[data-assessment-field="responsible"][data-item-id="${firstItemId}"]`)).toHaveValue(payload.items[0].responsible);
  await expect(page.locator(`[data-assessment-status][data-item-id="${secondItemId}"]`)).toHaveValue('not-started');
  await expect(page.locator('#toolStatus')).toContainText('unsupported fields were preserved for re-export');

  const { payload: exported } = await exportPayload(page);
  expect(exported.formatVersion).toBe(2);
  expect(exported.preservedImportData.topLevel.futureTopLevelSetting).toEqual({ enabled: true });
  expect(exported.preservedImportData.itemFields[firstItemId].futureItemField).toBe('preserve me');
  expect(exported.preservedImportData.unknownItems.some((item) => item.id === 'future-item-id')).toBeTruthy();
  expect(exported.preservedImportData.invalidStatuses.some((item) => item.id === secondItemId)).toBeTruthy();
});

test('core, maturity, and overall scoring apply partial credit and exclude not-applicable items', async ({ page }) => {
  await openCleanPage(page);

  const coreStatuses = page.locator('[data-assessment-level="core"] [data-assessment-status]');
  await coreStatuses.nth(0).selectOption('complete');
  await coreStatuses.nth(1).selectOption('in-progress');
  await coreStatuses.nth(2).selectOption('not-applicable');

  await expect(page.locator('#coreScore')).toHaveText('17%');
  await expect(page.locator('#maturityScore')).toHaveText('0%');
  await expect(page.locator('#progressPercent')).toHaveText('7%');

  const { payload } = await exportPayload(page);
  expect(payload.summary.core.total).toBe(10);
  expect(payload.summary.core.applicable).toBe(9);
  expect(payload.summary.core.earned).toBe(1.5);
  expect(payload.summary.core.percent).toBe(17);
  expect(payload.summary.overall.total).toBe(22);
  expect(payload.summary.overall.applicable).toBe(21);
  expect(payload.summary.overall.percent).toBe(7);
});

test('project profile and schema v2 assessment export and reset together', async ({ page }) => {
  await openCleanPage(page);

  const profile = {
    name: 'OpenReady Example',
    repository: 'https://github.com/example/openready-example',
    maintainer: 'Community Team',
    reviewDate: '2026-09-01',
  };
  const firstStatus = page.locator('[data-assessment-status]').first();
  const firstItemId = await firstStatus.getAttribute('data-item-id');

  await page.locator('#profileName').fill(profile.name);
  await page.locator('#profileRepository').fill(profile.repository);
  await page.locator('#profileMaintainer').fill(profile.maintainer);
  await page.locator('#profileReviewDate').fill(profile.reviewDate);
  await page.locator('#projectNotes').fill('Profile export test.');
  await firstStatus.selectOption('complete');
  await page.locator(`.assessment-evidence[data-item-id="${firstItemId}"] summary`).click();
  await page.locator(`[data-assessment-field="note"][data-item-id="${firstItemId}"]`).fill('Evidence note.');

  await page.reload();
  await expect(page.locator('#profileName')).toHaveValue(profile.name);
  await expect(page.locator('[data-assessment-status]').first()).toHaveValue('complete');

  const { download, payload: exported } = await exportPayload(page);
  expect(download.suggestedFilename()).toBe('openready-openready-example-checklist.json');
  expect(exported.applicationVersion).toBe('0.3.0');
  expect(exported.formatVersion).toBe(2);
  expect(exported.project).toEqual(profile);
  expect(exported.notes).toBe('Profile export test.');
  expect(exported.items.find((item) => item.id === firstItemId)).toMatchObject({
    status: 'complete',
    note: 'Evidence note.',
  });
  expect(exported.completedItems.find((item) => item.id === firstItemId).complete).toBeTruthy();

  page.once('dialog', (dialog) => dialog.accept());
  await page.getByRole('button', { name: 'Reset progress' }).click();
  await expect(page.locator('#profileName')).toHaveValue('');
  await expect(page.locator('#profileRepository')).toHaveValue('');
  await expect(page.locator('#profileMaintainer')).toHaveValue('');
  await expect(page.locator('#profileReviewDate')).toHaveValue('');
  await expect(page.locator('#projectNotes')).toHaveValue('');
  await expect(page.locator('[data-assessment-status]').first()).toHaveValue('not-started');
  await expect(page.locator(`[data-assessment-field="note"][data-item-id="${firstItemId}"]`)).toHaveValue('');
  await expect(page.locator('#toolStatus')).toHaveText('Project profile and assessment workspace were reset.');
});

test('print preparation exposes assessment evidence and restores collapsed details', async ({ page }) => {
  await openCleanPage(page);

  const details = page.locator('.assessment-evidence').first();
  await expect(details).not.toHaveAttribute('open', '');
  await page.evaluate(() => window.dispatchEvent(new Event('beforeprint')));
  await expect(details).toHaveAttribute('open', '');
  await page.evaluate(() => window.dispatchEvent(new Event('afterprint')));
  await expect(details).not.toHaveAttribute('open', '');
});

test('theme control exposes state and preserves the selected theme', async ({ page }) => {
  await openCleanPage(page);

  const toggle = page.locator('#themeToggle');
  const initialPressed = await toggle.getAttribute('aria-pressed');
  await toggle.focus();
  await page.keyboard.press('Enter');

  const changedPressed = await toggle.getAttribute('aria-pressed');
  expect(changedPressed).not.toBe(initialPressed);

  const selectedTheme = await page.evaluate(() => document.documentElement.dataset.theme);
  expect(['light', 'dark']).toContain(selectedTheme);
  await expect(toggle).toHaveAttribute('aria-label', selectedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');

  await page.reload();
  await expect.poll(() => page.evaluate(() => document.documentElement.dataset.theme)).toBe(selectedTheme);
});

test('reveal content is rendered without meaningful motion when reduced motion is requested', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await openCleanPage(page);

  const result = await page.evaluate(() => ({
    preferenceMatches: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    revealStyles: Array.from(document.querySelectorAll('[data-reveal]')).map((element) => {
      const styles = getComputedStyle(element);
      return {
        opacity: styles.opacity,
        transitionDuration: styles.transitionDuration,
        animationDuration: styles.animationDuration,
      };
    }),
  }));

  expect(result.preferenceMatches).toBeTruthy();
  expect(result.revealStyles.length).toBeGreaterThan(0);
  expect(result.revealStyles.every((styles) => styles.opacity === '1')).toBeTruthy();
  expect(
    result.revealStyles.every(
      (styles) =>
        maximumDurationInSeconds(styles.transitionDuration) <= 0.001 &&
        maximumDurationInSeconds(styles.animationDuration) <= 0.001
    )
  ).toBeTruthy();
});

test('desktop hero keeps its primary action and preview above the fold on a short laptop viewport', async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 860 });
  await openCleanPage(page);

  const result = await page.evaluate(() => {
    const heading = document.querySelector('.hero h1');
    const primaryAction = document.querySelector('.hero-actions .button.primary');
    const preview = document.querySelector('.hero-panel');
    const range = document.createRange();
    range.selectNodeContents(heading);
    const lineRects = Array.from(range.getClientRects()).filter((rect) => rect.width > 1);
    const widestLine = Math.max(...lineRects.map((rect) => rect.width));
    const lastLine = lineRects.at(-1);

    return {
      viewportHeight: window.innerHeight,
      primaryActionBottom: primaryAction.getBoundingClientRect().bottom,
      previewBottom: preview.getBoundingClientRect().bottom,
      headingLineCount: lineRects.length,
      lastLineRatio: lastLine.width / widestLine,
    };
  });

  expect(result.primaryActionBottom).toBeLessThanOrEqual(result.viewportHeight + 1);
  expect(result.previewBottom).toBeLessThanOrEqual(result.viewportHeight + 1);
  expect(result.headingLineCount).toBeLessThanOrEqual(5);
  expect(result.lastLineRatio).toBeGreaterThan(0.2);
});

const viewports = [
  { name: 'small-phone', width: 320, height: 640 },
  { name: 'modern-phone', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'short-laptop', width: 1600, height: 860 },
  { name: 'ultra-wide', width: 1920, height: 1080 },
];

for (const viewport of viewports) {
  test(`layout reflows without horizontal page overflow at ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await openCleanPage(page);

    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      page: document.documentElement.scrollWidth,
    }));
    expect(dimensions.page).toBeLessThanOrEqual(dimensions.viewport + 1);

    await expect(page.locator('#checklist')).toBeVisible();
    await expect(page.locator('.project-profile')).toBeVisible();
    await expect(page.locator('[data-assessment-level="core"]')).toBeVisible();
    await expect(page.locator('[data-assessment-level="maturity"]')).toBeVisible();
    await expect(page.locator('#assessmentDisclaimer')).toBeVisible();
    await expect(page.locator('#docs')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    await page.screenshot({
      path: `test-results/viewports/${viewport.name}.png`,
      fullPage: true,
    });
  });
}
