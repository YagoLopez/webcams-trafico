import { expect, test } from '@playwright/test';

test('Leaflet map markers render correctly and have valid sources', async ({ page }) => {
  // Navigate to the map screen
  await page.goto('/map');

  // Wait for the map to load and markers to appear
  // We look for leaflet-marker-icon class images
  const markers = page.locator('img.leaflet-marker-icon');

  // Wait until at least one marker is attached to the DOM
  await markers.first().waitFor({ state: 'attached', timeout: 15000 });

  // Verify there is at least one marker
  const count = await markers.count();
  expect(count).toBeGreaterThan(0);

  // Check the source of the first marker to ensure it doesn't contain a broken path
  // Our fix uses unpkg.com
  const firstMarkerSrc = await markers.first().getAttribute('src');

  // Verify it contains our CDNs or at least valid string, instead of being broken
  expect(firstMarkerSrc).toContain('unpkg.com/leaflet');
  expect(firstMarkerSrc).toContain('marker-icon');
});
