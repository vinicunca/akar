import { expect, test } from '@playwright/test';
import { ANIMATION_DURATION } from './constants';

test.beforeEach(async ({ page }) => {
  await page.goto('/test/initial-snap');
});

test.describe('Initial-snap', () => {
  test('should be open and snapped on initial load', async ({ page }) => {
    await page.waitForTimeout(ANIMATION_DURATION);

    await expect(page.getByTestId('content')).toBeVisible();
    await expect(page.getByTestId('active-snap-index')).toHaveText('1');
  });
});
