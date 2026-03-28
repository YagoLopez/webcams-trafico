import { Cam } from '@/architecture/domain/entities/Cam';

export class CamNavigationService {
  private constructor() { }

  private static norm(s: string): string {
    return (s ?? '').trim().toLowerCase();
  }

  /**
   * Returns all cameras on the same road regardless of travel direction,
   * sorted by ascending kilometer, excluding `currentCam` itself and any camera
   * that lacks GPS coordinates.
   */
  private static sortSameRoadCams(
    currentCam: Cam,
    allCams: Cam[],
  ): Cam[] {
    const road = this.norm(currentCam.roadName);

    return allCams
      .filter(
        (cam) =>
          String(cam.id) !== String(currentCam.id) &&
          this.norm(cam.roadName) === road &&
          cam.latitude !== undefined &&
          cam.longitude !== undefined,
      )
      .sort((a, b) => {
        // Sort primarily by kilometer, then by id for deterministic order
        const kmDiff = a.kilometer - b.kilometer;
        return kmDiff !== 0 ? kmDiff : a.id.localeCompare(b.id);
      });
  }

  /**
   * Returns the next camera on the same road (any direction),
   * i.e. the one with the smallest kilometer value strictly greater than `currentCam.kilometer`.
   * Returns `null` if `currentCam` is already the last camera on this road.
   */
  public static getNextCamOnRoad(currentCam: Cam, allCams: Cam[]): Cam | null {
    const sorted = this.sortSameRoadCams(currentCam, allCams);
    const currentIndex = sorted.findIndex((c) => c.id === currentCam.id);
    return currentIndex >= 0 && currentIndex < sorted.length - 1
      ? sorted[currentIndex + 1]
      : null;
  }

  /**
   * Returns the previous camera on the same road (any direction),
   * i.e. the one with the largest kilometer value strictly less than `currentCam.kilometer`.
   * Returns `null` if `currentCam` is already the first camera on this road.
   */
  public static getPrevCamOnRoad(currentCam: Cam, allCams: Cam[]): Cam | null {
    const sorted = this.sortSameRoadCams(currentCam, allCams);
    const currentIndex = sorted.findIndex((c) => c.id === currentCam.id);
    return currentIndex > 0 ? sorted[currentIndex - 1] : null;
  }
}
