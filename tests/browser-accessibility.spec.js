const { test, expect } = require('@playwright/test');

async function openCleanPage(page) {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await expect(page.locator('input[data-check]').first()).toBeVisible();
}

test('keyboard users can reach the main controls and save checklist progress', async ({ page }) => {
  await openCleanPage(page);

  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  await expect(page.locator('.skip-link')).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main-content$/);

  await page.goto('/');
  await expect(page.locator('input[data-check]').first()).toBeVisible();

  const reachedIds = new Set();
  for (let index = 0; index < 90; index += 1) {
    await page.keyboard.press('Tab');
    const id = await page.evaluate(() => document.activeElement?.id || '');
    if (id) reachedIds.add(id);
  }

  for (const requiredId of ['themeToggle', 'exportButton', 'importButton', 'printButton', 'resetButton', 'projectNotes']) {
    expect(reachedIds.has(requiredId), `${requiredId} should be keyboard reachable`).toBeTruthy();
  }

  const firstCheckbox = page.locator('input[data-check]').first();
  await firstCheckbox.focus();
  await page.keyboard.press('Space');
  await expect(firstCheckbox).toBeChecked();
  await expect(page.locator('#progressText')).toContainText('1 of');

  await page.reload();
  await expect(page.locator('input[data-check]').first()).toBeChecked();
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

test('the keyboard-accessible import action restores checklist data and notes', async ({ page }) => {
  await openCleanPage(page);

  const firstItemId = await page.locator('input[data-check]').first().getAttribute('data-item-id');
  const payload = {
    format: 'openready-checklist',
    formatVersion: 1,
    completedItems: [{ id: firstItemId, complete: true }],
    notes: 'Imported during automated browser testing.',
  };

  const chooserPromise = page.waitForEvent('filechooser');
  const importButton = page.getByRole('button', { name: 'Import JSON' });
  await importButton.focus();
  await page.keyboard.press('Enter');
  const chooser = await chooserPromise;
  await chooser.setFiles({
    name: 'openready-test.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify(payload)),
  });

  await expect(page.locator('input[data-check]').first()).toBeChecked();
  await expect(page.locator('#projectNotes')).toHaveValue(payload.notes);
  await expect(page.locator('#toolStatus')).toHaveText('Checklist imported successfully.');
});

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('reveal content is rendered without motion when reduced motion is requested', async ({ page }) => {
    await openCleanPage(page);

    const result = await page.evaluate(() => ({
      preferenceMatches: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      revealStyles: Array.from(document.querySelectorAll('[data-reveal]')).map((element) => {
        const styles = getComputedStyle(element);
        return { opacity: styles.opacity, transform: styles.transform };
      }),
    }));

    expect(result.preferenceMatches).toBeTruthy();
    expect(result.revealStyles.length).toBeGreaterThan(0);
    expect(result.revealStyles.every((styles) => styles.opacity === '1' && styles.transform === 'none')).toBeTruthy();
  });
});

const viewports = [
  { name: 'small-phone', width: 320, height: 640 },
  { name: 'modern-phone', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
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
    await expect(page.locator('#docs')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    await page.screenshot({
      path: `test-results/viewports/${viewport.name}.png`,
      fullPage: true,
    });
  });
}
