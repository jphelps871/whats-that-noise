import { test as setup, expect } from '@playwright/test';
import { requireEnv } from '@/lib/utils';
import path from 'path';

const authFile = path.join(__dirname, '../../playwright/.auth/user.json');

// Authentication using Credentials
setup('authenticate', async ({ page }) => {
  await page.goto('/auth/login')

  // Handle credential login - Ensure TEST_USER and TEST_PASSWORD are set
  await page.getByLabel('email').fill(requireEnv(process.env.TEST_USER, "TEST_USER"));
  await page.getByLabel('Password').fill(requireEnv(process.env.TEST_PASSWORD, "TEST_PASSWORD"));

  await page.getByRole('button', { name: 'Submit' }).click();

  // Example URL '/noise/add?lat=0.5122837&lng=51.391272' or '/'
  await page.waitForURL('/');

  // Save auth
  await page.context().storageState({ path: authFile });
});