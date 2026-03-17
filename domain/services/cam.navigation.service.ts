import { Cam } from '@/domain/entities/cam';

const norm = (s: string): string => (s ?? '').trim().toLowerCase();

/**
 * Returns all cameras on the same road regardless of travel direction,
 * sorted by ascending kilometer, excluding `currentCam` itself and any camera
 * that lacks GPS coordinates.
 */
function getSameRoadCams(currentCam: Cam, allCams: Cam[]): Cam[] {
  const road = norm(currentCam.roadName);

  return allCams
    .filter(
      (cam) =>
        String(cam.id) !== String(currentCam.id) &&
        norm(cam.roadName) === road &&
        cam.latitude !== undefined &&
        cam.longitude !== undefined,
    )
    .sort((cam1, cam2) => cam1.kilometer - cam2.kilometer);
}

/**
 * Returns the next camera on the same road (any direction),
 * i.e. the one with the smallest kilometer value strictly greater than `currentCam.kilometer`.
 * Returns `null` if `currentCam` is already the last camera on this road.
 */
export function getNextCamOnRoad(currentCam: Cam, allCams: Cam[]): Cam | null {
  return (
    getSameRoadCams(currentCam, allCams).find(
      (cam) => cam.kilometer > currentCam.kilometer,
    ) ?? null
  );
}

/**
 * Returns the previous camera on the same road (any direction),
 * i.e. the one with the largest kilometer value strictly less than `currentCam.kilometer`.
 * Returns `null` if `currentCam` is already the first camera on this road.
 */
export function getPrevCamOnRoad(currentCam: Cam, allCams: Cam[]): Cam | null {
  const sameRoadCams = getSameRoadCams(currentCam, allCams);
  const prevCams = sameRoadCams.filter((cam) => cam.kilometer < currentCam.kilometer);
  return prevCams.length > 0 ? prevCams[prevCams.length - 1] : null;
}
