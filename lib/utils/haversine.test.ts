import { haversineDistance } from './haversine';

describe('haversineDistance', () => {
  it('returns ~504 km for Madrid → Barcelona', () => {
    const distance = haversineDistance(40.4168, -3.7038, 41.3874, 2.1686);
    expect(distance).toBeGreaterThan(499);
    expect(distance).toBeLessThan(509);
  });

  it('returns 0 km when both coordinates are identical', () => {
    const distance = haversineDistance(40.4168, -3.7038, 40.4168, -3.7038);
    expect(distance).toBe(0);
  });

  it('is symmetric: distance(A→B) === distance(B→A)', () => {
    const ab = haversineDistance(40.4168, -3.7038, 41.3874, 2.1686);
    const ba = haversineDistance(41.3874, 2.1686, 40.4168, -3.7038);
    expect(ab).toBeCloseTo(ba, 10);
  });

  it('handles negative longitudes correctly', () => {
    // Burgos (42.34, -3.70) → Valladolid (41.65, -4.73)  ≈ ~100 km
    const distance = haversineDistance(42.34, -3.70, 41.65, -4.73);
    expect(distance).toBeGreaterThan(90);
    expect(distance).toBeLessThan(120);
  });
});
