import { test, expect, type Page } from '@playwright/test';
import { randomUUID } from 'crypto';

test.use({ storageState: 'playwright/.auth/user.json' });

type Position = { x: number; y: number }

type AddMarkerFormProps = {
  position: Position,
  description: string,
  category: string,
}

async function addMarker( page: Page, { position, description, category }: AddMarkerFormProps) {
  await page.locator('.leaflet-container').dblclick({ position });
  await page.getByRole('textbox', { name: 'Description' }).fill(description);
  await page.getByRole('combobox', { name: 'Category' }).click();
  await page.getByRole('option', { name: category }).click();

  const submitBtn = page.getByRole('button', { name: 'Submit' });
  await submitBtn.click();

  // Ensure the model/form closes from router.back()
  await expect(submitBtn).toBeHidden({ timeout: 5000 });
}

async function findMarker(page: Page, description: string) {
  await page.locator(`.category-marker-dot[data-description="${description}"]`).click();
  await expect(page.getByText(description)).toBeVisible({ timeout: 5000 });
}

test('Add noise marker to map', async ({ page }) => {
  await page.goto('/');

  await page.waitForSelector('img.leaflet-tile'); // wait for leaflet to load

  let description = `Weird noise ${randomUUID()}` // random values for all browsers tests
  await addMarker(page, {
    position: { x: 250, y: 180 },
    description: description,
    category: "People",
  });

  await findMarker(page, description);

  // Ensure users can add another marker – technically as many as they want
  description = `Loud cars!!! ${randomUUID()}`
  await addMarker(page, {
    position: { x: 370, y: 280 },
    description: description,
    category: "Traffic",
  });

  // Ensure popup appears with text
  await findMarker(page, description);
});