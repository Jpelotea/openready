const fs = require('node:fs');
const { test, expect } = require('@playwright/test');

async function openGuidedPage(page) {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await expect(page.locator('.item-guidance').first()).toBeVisible();
  await expect(page.locator('#guidanceNotices')).toBeVisible();
}

test('every assessment item has structured guidance and the three safety notices', async ({ page }) => {
  await openGuidedPage(page);

  const assessmentCount = await page.locator('[data-assessment-status]').count();
  const guidanceCount = await page.locator('.item-guidance').count();
  expect(guidanceCount).toBe(assessmentCount);
  expect(guidanceCount).toBe(22);

  await expect(page.locator('#guidanceNotices article')).toHaveCount(3);
  await expect(page.locator('[data-notice-id="legal"]')).toContainText('not legal advice');
  await expect(page.locator('[data-notice-id="security"]')).toContainText('not a security assessment');
  await expect(page.locator('[data-notice-id="accessibility"]')).toContainText('not accessibility certification');

  const incomplete = await page.locator('.item-guidance').evaluateAll((details) =>
    details.filter((item) => {
      const headings = Array.from(item.querySelectorAll('.guidance-block h5')).map((heading) => heading.textContent);
      return ![
        'Why it matters',
        'Minimum implementation',
        'Stronger implementation',
        'Common mistakes',
        'Example evidence',
        'Further resources',
      ].every((required) => headings.includes(required));
    }).length
  );
  expect(incomplete).toBe(0);
});

test('README starter is editable, downloadable, restorable, and uses unique control ids', async ({ page }) => {
  await openGuidedPage(page);

  const guidance = page.locator('[data-guidance-item="readme"]');
  await guidance.locator('summary').click();

  const starter = guidance.locator('[data-material-id="readme-plan"]');
  const textarea = starter.locator('[data-material-starter="readme-plan"]');
  await expect(textarea).toHaveValue(/# \[Project name\]/);
  await expect(starter.locator('.material-disclaimer')).toContainText('editable starting point');
  await expect(starter.locator('.material-privacy')).toContainText('not included in the assessment score');

  const customText = '# Community Project\n\nEdited during browser testing.\n';
  await textarea.fill(customText);

  const downloadPromise = page.waitForEvent('download');
  await starter.getByRole('button', { name: 'Download Markdown' }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('README-plan.md');
  const downloadPath = await download.path();
  expect(fs.readFileSync(downloadPath, 'utf8')).toBe(customText);

  await starter.getByRole('button', { name: 'Restore starter' }).click();
  await expect(textarea).toHaveValue(/# \[Project name\]/);
  await expect(page.locator('#toolStatus')).toContainText('restored to its original starting text');

  const ids = await page.locator('[data-material-starter]').evaluateAll((controls) =>
    controls.map((control) => control.id)
  );
  expect(new Set(ids).size).toBe(ids.length);
});

test('keyboard users can open guidance and reach an editable starter', async ({ page }) => {
  await openGuidedPage(page);

  const guidance = page.locator('[data-guidance-item="readme"]');
  const summary = guidance.locator('summary');
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(guidance).toHaveAttribute('open', '');

  const starterId = await guidance.locator('[data-material-starter="readme-plan"]').getAttribute('id');
  const reached = new Set();
  for (let index = 0; index < 30; index += 1) {
    await page.keyboard.press('Tab');
    reached.add(await page.evaluate(() => document.activeElement?.id || ''));
  }
  expect(reached.has(starterId)).toBeTruthy();
});

test('print preparation expands guided details and restores their previous state', async ({ page }) => {
  await openGuidedPage(page);

  const guidance = page.locator('[data-guidance-item="readme"]');
  await expect(guidance).not.toHaveAttribute('open', '');
  await page.evaluate(() => window.dispatchEvent(new Event('beforeprint')));
  await expect(guidance).toHaveAttribute('open', '');
  await page.evaluate(() => window.dispatchEvent(new Event('afterprint')));
  await expect(guidance).not.toHaveAttribute('open', '');
});

test('expanded guidance reflows without horizontal page overflow on a small phone', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await openGuidedPage(page);

  await page.locator('[data-guidance-item="readme"] summary').click();
  await page.locator('[data-guidance-item="threat-model"] summary').click();

  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    page: document.documentElement.scrollWidth,
  }));
  expect(dimensions.page).toBeLessThanOrEqual(dimensions.viewport + 1);
  await expect(page.locator('[data-guidance-item="readme"] [data-material-starter]')).toBeVisible();
});
