import { expect, test } from '@playwright/test';
import { ANIMATION_DURATION } from './constants';
import { openDrawer } from './helpers';

test.beforeEach(async ({ page }) => {
  await page.goto('/test/no-drag-element');
});

test.describe('No drag element', () => {
  test('should close when dragged down', async ({ page }) => {
    await openDrawer(page);
    await page.hover('[data-testid=handler]');
    await page.mouse.down();
    await page.mouse.move(0, 500);
    await page.mouse.up();
    await page.waitForTimeout(ANIMATION_DURATION);
    await expect(page.getByTestId('content')).not.toBeVisible();
  });

  test('should not close when dragged down', async ({ page }) => {
    await openDrawer(page);
    await page.hover('[data-akar-no-drag]');
    await page.mouse.down();
    await page.mouse.move(0, 500);
    await page.mouse.up();
    await page.waitForTimeout(ANIMATION_DURATION);
    await expect(page.getByTestId('content')).toBeVisible();
  });
});
