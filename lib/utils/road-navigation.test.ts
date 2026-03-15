import { Cam } from '@/types/cam';
import { getNextCamOnRoad, getPrevCamOnRoad } from './road-navigation';

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
  makeCam({ id: 'a', roadName: 'A-62', roadDestination: 'BURGOS',   kilometer: 25 }),
  makeCam({ id: 'b', roadName: 'A-62', roadDestination: 'BURGOS',   kilometer: 43 }),
  makeCam({ id: 'c', roadName: 'A-62', roadDestination: 'BURGOS',   kilometer: 78 }),
  makeCam({ id: 'd', roadName: 'A-62', roadDestination: 'PORTUGAL', kilometer: 31 }),
  makeCam({ id: 'e', roadName: 'A-62', roadDestination: 'PORTUGAL', kilometer: 87 }),
  makeCam({ id: 'f', roadName: 'A-1',  roadDestination: 'BURGOS',   kilometer: 10 }),
  makeCam({ id: 'g', roadName: 'A-62', roadDestination: '',          kilometer: 91 }),
  // Camera without coordinates → should be ignored by the filter
  { id: 'noloc', imageUrl: '', roadName: 'A-62', roadDestination: 'BURGOS', kilometer: 50, location: 'X', status: 'active', latitude: undefined, longitude: undefined } as unknown as Cam,
];

describe('getNextCamOnRoad', () => {
  it('returns the camera with the immediately higher kilometer', () => {
    const cam = CAMS.find((c) => c.id === 'a')!;
    const next = getNextCamOnRoad(cam, CAMS);
    // 'noloc' at km=50 has no coords → excluded. Next valid BURGOS > km25 is 'b'(km43).
    expect(next?.id).toBe('b');
  });

  it('returns null for the last camera in the section', () => {
    const last = CAMS.find((c) => c.id === 'c')!; // km 78, last BURGOS
    expect(getNextCamOnRoad(last, CAMS)).toBeNull();
  });

  it('does not cross into the opposite direction (different roadDestination)', () => {
    const cam = CAMS.find((c) => c.id === 'a')!; // BURGOS
    const next = getNextCamOnRoad(cam, CAMS);
    expect(next?.roadDestination).toBe('BURGOS');
    expect(['d', 'e']).not.toContain(next?.id); // PORTUGAL cams must be excluded
  });

  it('does not cross into a different road', () => {
    const cam = CAMS.find((c) => c.id === 'a')!; // A-62
    const next = getNextCamOnRoad(cam, CAMS);
    expect(next?.roadName).toBe('A-62');
  });

  it('ignores cameras without GPS coordinates', () => {
    const cam = CAMS.find((c) => c.id === 'a')!; // km 25
    const next = getNextCamOnRoad(cam, CAMS);
    // 'noloc' (km50, no coords) must be excluded; next valid is 'b' at km43
    expect(next?.id).toBe('b');
    expect(next?.id).not.toBe('noloc');
  });

  it('treats cameras with empty roadDestination as their own group', () => {
    const cam = CAMS.find((c) => c.id === 'g')!; // dest=""
    // No other A-62 camera has dest="" with km > 91
    expect(getNextCamOnRoad(cam, CAMS)).toBeNull();
  });

  it('is case-insensitive and trims whitespace in road/destination', () => {
    const camUpper = makeCam({ id: 'x', roadName: 'A-62', roadDestination: 'BURGOS',   kilometer: 30 });
    const camLower = makeCam({ id: 'y', roadName: 'a-62', roadDestination: 'burgos  ', kilometer: 50 });
    const next = getNextCamOnRoad(camUpper, [camUpper, camLower]);
    expect(next?.id).toBe('y');
  });
});

describe('getPrevCamOnRoad', () => {
  it('returns the camera with the immediately lower kilometer', () => {
    const cam = CAMS.find((c) => c.id === 'c')!; // km 78
    const prev = getPrevCamOnRoad(cam, CAMS);
    expect(prev?.id).toBe('b'); // km 43 is closest < 78 for BURGOS
  });

  it('returns null for the first camera in the section', () => {
    const first = CAMS.find((c) => c.id === 'a')!; // km 25, first BURGOS
    expect(getPrevCamOnRoad(first, CAMS)).toBeNull();
  });

  it('does not cross into the opposite direction', () => {
    const cam = CAMS.find((c) => c.id === 'e')!; // PORTUGAL km 87
    const prev = getPrevCamOnRoad(cam, CAMS);
    expect(prev?.roadDestination).toBe('PORTUGAL');
    expect(prev?.id).toBe('d');
  });

  it('ignores cameras without GPS coordinates', () => {
    const cam = CAMS.find((c) => c.id === 'b')!; // km 43
    // 'noloc' at km 50 (no coords) is irrelevant; prev should be 'a' at km 25
    const prev = getPrevCamOnRoad(cam, CAMS);
    expect(prev?.id).toBe('a');
  });
});
