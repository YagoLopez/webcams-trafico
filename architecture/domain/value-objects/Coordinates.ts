export class Coordinates {
  constructor(public readonly lat: number, public readonly lon: number) {}

  public distanceTo(other: Coordinates): number {
    const R = 6371; // Earth's radius in km
    const toRad = (deg: number) => (deg * Math.PI) / 180;

    const dLat = toRad(other.lat - this.lat);
    const dLon = toRad(other.lon - this.lon);

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(this.lat)) * Math.cos(toRad(other.lat)) * Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }
}
