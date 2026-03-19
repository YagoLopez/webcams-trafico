import { Coordinates } from './Coordinates';

describe('Coordinates.distanceTo', () => {
  it('returns ~504 km for Madrid → Barcelona', () => {
    const madrid = new Coordinates(40.4168, -3.7038);
    const barcelona = new Coordinates(41.3874, 2.1686);
    const distance = madrid.distanceTo(barcelona);
    expect(distance).toBeGreaterThan(499);
    expect(distance).toBeLessThan(509);
  });

  it('returns 0 km when both coordinates are identical', () => {
    const point = new Coordinates(40.4168, -3.7038);
    const distance = point.distanceTo(point);
    expect(distance).toBe(0);
  });

  it('is symmetric: A.distanceTo(B) === B.distanceTo(A)', () => {
    const a = new Coordinates(40.4168, -3.7038);
    const b = new Coordinates(41.3874, 2.1686);
    const ab = a.distanceTo(b);
    const ba = b.distanceTo(a);
    expect(ab).toBeCloseTo(ba, 10);
  });

  it('handles negative longitudes correctly', () => {
    const burgos = new Coordinates(42.34, -3.70);
    const valladolid = new Coordinates(41.65, -4.73);
    const distance = burgos.distanceTo(valladolid);
    expect(distance).toBeGreaterThan(90);
    expect(distance).toBeLessThan(120);
  });
});
