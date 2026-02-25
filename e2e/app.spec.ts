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

test('filter icon changes background color when filters are applied', async ({ page }) => {
  await page.goto('/');

  // Wait for the app to be fully rendered
  await expect(page.getByText('Mis Cámaras').first()).toBeVisible();

  const filterButton = page.getByTestId('open-filters-button');

  // 1. Verify initial state (no red background)
  // bg-red-600 stringifies to rgb(220, 38, 38) in React Native Web via NativeWind
  await expect(filterButton).not.toHaveCSS('background-color', 'rgb(220, 38, 38)');

  // 2. Open filters modal
  await expect(async () => {
    await filterButton.click();
    await expect(page.getByText('Filtros', { exact: true })).toBeVisible({ timeout: 1000 });
  }).toPass();

  // 3. Open "Todas las carreteras" select box
  await page.getByText('Todas las carreteras').click();

  // 4. Wait for the select box modal to appear and click a valid real option
  // Note: first option is "Todas las carreteras" which resets it.
  // We need to pick a valid road like "A-1" (or whatever the API returns, which would be lowercased to a-1)
  // Let's just pick any SelectItem that is NOT the placeholder. We'll wait until they are populated
  const optionToClick = page.getByTestId(/select-item-/).filter({ hasNotText: 'Todas las carreteras' }).first();
  await optionToClick.waitFor({ state: 'visible' });
  await optionToClick.click();

  // 5. Apply filters (Close modal button)
  await page.getByText('Aplicar Filtros').click();

  // 6. Verify the filter button now has the red background
  await expect(filterButton).toHaveCSS('background-color', 'rgb(220, 38, 38)');
});
