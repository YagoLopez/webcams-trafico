import { expect, test } from '@playwright/test';

test('load home screen and check title', async ({ page }) => {
  await page.goto('/');

  // Look for the title "Mis Cámaras"
  // Note: react-native-web might render this as a div or span depending on the implementation
  await expect(page.getByText('Mis Cámaras').first()).toBeVisible();
});

test('open filters modal', async ({ page }) => {
  await page.goto('/');

  // Wait for the app to be fully rendered
  await expect(page.getByText('Mis Cámaras').first()).toBeVisible();

  // Click the filters button until the modal appears to handle any hydration delays
  await expect(async () => {
    await page.getByTestId('open-filters-button').click();
    await expect(page.getByText('Filtros', { exact: true })).toBeVisible({ timeout: 1000 });
  }).toPass();
});

test('open drawer menu', async ({ page }) => {
  await page.goto('/');

  // Wait for the app to be fully rendered
  await expect(page.getByText('Mis Cámaras').first()).toBeVisible();

  // Click the hamburger menu
  await page.getByTestId('drawer-menu-button').click();

  // Verify that an item inside the drawer is now visible
  // The drawer label for the Explore screen is "Explorar"
  await expect(page.getByText('Explorar', { exact: true }).first()).toBeVisible();
});
