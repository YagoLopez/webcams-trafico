import { expect, test } from '@playwright/test';

test('Leaflet map markers render correctly as custom SVG icons', async ({ page }) => {
  // Navigate to the map screen with lat/lon to bypass location permission prompts
  await page.goto('/map?lat=40.4168&lon=-3.7038');

  // Wait for the map to load and markers to appear
  // Our custom markers are div elements containing an SVG in the marker pane
  const markers = page.locator('.leaflet-marker-pane svg');

  // Wait until at least one marker is attached to the DOM
  await markers.first().waitFor({ state: 'attached', timeout: 15000 });

  // Verify there is at least one marker
  const count = await markers.count();
  expect(count).toBeGreaterThan(0);

  // Check the inner HTML of the marker to ensure it contains our custom SVG path
  const firstMarkerHtml = await markers.first().innerHTML();

  // Verify it contains a path indicating it's the videocam icon we created
  expect(firstMarkerHtml).toContain('M482.43 149.33L363.58 203.2');
});
