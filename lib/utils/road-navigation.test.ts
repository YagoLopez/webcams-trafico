import { Cam } from '@/domain/entities/cam';
import { getNextCamOnRoad, getPrevCamOnRoad } from '@/domain/services/cam.navigation.service';

// Helper to create a minimal valid Cam
const makeCam = (overrides: Partial<Cam> & { id: string }): Cam =>
  new Cam(
    overrides.id,
    overrides.imageUrl ?? `https://example.com/${overrides.id}.jpg`,
    overrides.roadName ?? 'A-1',
    overrides.roadDestination ?? 'BURGOS',
    overrides.kilometer ?? 0,
    overrides.location ?? 'MADRID',
    overrides.status ?? 'active',
    overrides.latitude ?? 40.0,
    overrides.longitude ?? -3.0,
  );

// ── Shared fixture ────────────────────────────────────────────────────────────
const CAMS: Cam[] = [
  makeCam({ id: 'a', roadName: 'A-62', roadDestination: 'BURGOS', kilometer: 25 }),
  makeCam({ id: 'b', roadName: 'A-62', roadDestination: 'BURGOS', kilometer: 43 }),
  makeCam({ id: 'c', roadName: 'A-62', roadDestination: 'BURGOS', kilometer: 78 }),
  makeCam({ id: 'd', roadName: 'A-62', roadDestination: 'PORTUGAL', kilometer: 31 }),
  makeCam({ id: 'e', roadName: 'A-62', roadDestination: 'PORTUGAL', kilometer: 87 }),
  makeCam({ id: 'f', roadName: 'A-1', roadDestination: 'BURGOS', kilometer: 10 }),
  makeCam({ id: 'g', roadName: 'A-62', roadDestination: '', kilometer: 91 }),
  // Camera without coordinates → should be ignored by the filter
  { id: 'noloc', imageUrl: '', roadName: 'A-62', roadDestination: 'BURGOS', kilometer: 50, location: 'X', status: 'active', latitude: undefined, longitude: undefined } as unknown as Cam,
];

describe('getNextCamOnRoad', () => {
  it('returns the camera with the immediately higher kilometer regardless of direction', () => {
    const cam = CAMS.find((c) => c.id === 'a')!;
    const next = getNextCamOnRoad(cam, CAMS);
    // All A-62 cams sorted by km: a(25), d(31), b(43), c(78), e(87), g(91)
    // Next valid > km25 is 'd' at km31 (PORTUGAL direction — now included)
    expect(next?.id).toBe('d');
  });

  it('returns null for the last camera on the road', () => {
    const last = CAMS.find((c) => c.id === 'g')!; // km 91, last A-62 cam
    expect(getNextCamOnRoad(last, CAMS)).toBeNull();
  });

  it('includes cameras from the opposite direction (different roadDestination)', () => {
    const cam = CAMS.find((c) => c.id === 'a')!; // BURGOS km25
    const next = getNextCamOnRoad(cam, CAMS);
    // Next by km is 'd' (PORTUGAL km31) — opposite direction now included
    expect(next?.id).toBe('d');
    expect(next?.roadDestination).toBe('PORTUGAL');
  });

  it('does not cross into a different road', () => {
    const cam = CAMS.find((c) => c.id === 'a')!; // A-62
    const next = getNextCamOnRoad(cam, CAMS);
    expect(next?.roadName).toBe('A-62');
  });

  it('ignores cameras without GPS coordinates', () => {
    const cam = CAMS.find((c) => c.id === 'b')!; // km 43
    const next = getNextCamOnRoad(cam, CAMS);
    // 'noloc' (km50, no coords) must be excluded; next valid is 'c' at km78
    expect(next?.id).toBe('c');
    expect(next?.id).not.toBe('noloc');
  });

  it('includes cameras with empty roadDestination in the same road group', () => {
    const cam = CAMS.find((c) => c.id === 'e')!; // PORTUGAL km87
    const next = getNextCamOnRoad(cam, CAMS);
    // 'g' at km91 (empty dest) is now included as part of the same road
    expect(next?.id).toBe('g');
  });

  it('is case-insensitive and trims whitespace in road/destination', () => {
    const camUpper = makeCam({ id: 'x', roadName: 'A-62', roadDestination: 'BURGOS', kilometer: 30 });
    const camLower = makeCam({ id: 'y', roadName: 'a-62', roadDestination: 'burgos  ', kilometer: 50 });
    const next = getNextCamOnRoad(camUpper, [camUpper, camLower]);
    expect(next?.id).toBe('y');
  });
});

describe('getPrevCamOnRoad', () => {
  it('returns the camera with the immediately lower kilometer regardless of direction', () => {
    const cam = CAMS.find((c) => c.id === 'c')!; // km 78
    const prev = getPrevCamOnRoad(cam, CAMS);
    expect(prev?.id).toBe('b'); // km 43 is closest < 78 across all directions
  });

  it('returns null for the first camera on the road', () => {
    const first = CAMS.find((c) => c.id === 'a')!; // km 25, first on A-62
    expect(getPrevCamOnRoad(first, CAMS)).toBeNull();
  });

  it('includes cameras from the opposite direction', () => {
    const cam = CAMS.find((c) => c.id === 'e')!; // PORTUGAL km 87
    const prev = getPrevCamOnRoad(cam, CAMS);
    // Closest < km87 is 'c' (BURGOS km78) — cross-direction now included
    expect(prev?.id).toBe('c');
  });

  it('ignores cameras without GPS coordinates', () => {
    const cam = CAMS.find((c) => c.id === 'b')!; // km 43
    // 'noloc' at km 50 (no coords) is irrelevant; prev should be 'd' at km 31
    const prev = getPrevCamOnRoad(cam, CAMS);
    expect(prev?.id).toBe('d');
  });
});
