import { test, expect } from '@playwright/test';

test('redirect to login when adding marker and not signed in', async ({page}) => {
  await page.goto('/marker/add');
  await expect(page).toHaveURL(/\/auth\/login/)
})


test.describe('authenticated', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });

  test('can access /marker/add', async ({ page }) => {
    await page.goto('/marker/add');

    // route is available as user is logged in
    await expect(page).toHaveURL(/\/marker\/add/);
  });
});
