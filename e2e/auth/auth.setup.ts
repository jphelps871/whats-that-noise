import { test as setup, expect } from '@playwright/test';
import { requireEnv } from '@/lib/utils';
import path from 'path';

const authFile = path.join(__dirname, '../../playwright/.auth/user.json');

// Authentication using GitHub
setup('authenticate', async ({ page }) => {
  await page.goto('/auth/login')
  await page.getByRole('button', {name: /github/i}).click();

  // Handle github login
  await page.getByLabel('Username or email address').fill(requireEnv(process.env.GH_TEST_USER, "GH_TEST_USER"));
  await page.getByLabel('Password').fill(requireEnv(process.env.GH_TEST_PASSWORD, "GH_TEST_PASSWORD"));
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Example URL '/marker/add?lat=0.5122837&lng=51.391272'
  await page.waitForURL('/marker/**');

  // Save auth
  await page.context().storageState({ path: authFile });
});