import { test, expect } from '@playwright/test';

test('redirect to login when adding noise and not signed in', async ({page}) => {
  await page.goto('/noise/add');
  await expect(page).toHaveURL(/\/auth\/login/)
})


test.describe('authenticated', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });

  test('can access /noise/add', async ({ page }) => {
    await page.goto('/noise/add');

    // route is available as user is logged in
    await expect(page).toHaveURL(/\/noise\/add/);
  });
});
