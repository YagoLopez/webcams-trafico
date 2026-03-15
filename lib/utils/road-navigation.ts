import { Cam } from '@/types/cam';

const norm = (s: string): string => (s ?? '').trim().toLowerCase();

/**
 * Returns all cameras on the same road and travelling in the same direction,
 * sorted by ascending kilometer, excluding `currentCam` itself and any camera
 * that lacks GPS coordinates.
 */
function sameSectionCams(currentCam: Cam, allCams: Cam[]): Cam[] {
  const road = norm(currentCam.roadName);
  const dest = norm(currentCam.roadDestination);

  return allCams
    .filter(
      (c) =>
        String(c.id) !== String(currentCam.id) &&
        norm(c.roadName) === road &&
        norm(c.roadDestination) === dest &&
        c.latitude !== undefined &&
        c.longitude !== undefined,
    )
    .sort((a, b) => a.kilometer - b.kilometer);
}

/**
 * Returns the next camera on the same road and same direction (roadDestination),
 * i.e. the one with the smallest kilometer value strictly greater than `currentCam.kilometer`.
 * Returns `null` if `currentCam` is already the last camera in this section.
 */
export function getNextCamOnRoad(currentCam: Cam, allCams: Cam[]): Cam | null {
  return (
    sameSectionCams(currentCam, allCams).find(
      (c) => c.kilometer > currentCam.kilometer,
    ) ?? null
  );
}

/**
 * Returns the previous camera on the same road and same direction (roadDestination),
 * i.e. the one with the largest kilometer value strictly less than `currentCam.kilometer`.
 * Returns `null` if `currentCam` is already the first camera in this section.
 */
export function getPrevCamOnRoad(currentCam: Cam, allCams: Cam[]): Cam | null {
  const section = sameSectionCams(currentCam, allCams);
  const prev = section.filter((c) => c.kilometer < currentCam.kilometer);
  return prev.length > 0 ? prev[prev.length - 1] : null;
}
