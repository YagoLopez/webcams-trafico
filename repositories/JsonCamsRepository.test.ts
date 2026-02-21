import webcamsData from '../data/webcams.json';
import { JsonCamsRepository } from './JsonCamsRepository';

describe('JsonCamsRepository', () => {
  let repository: JsonCamsRepository;

  beforeEach(() => {
    repository = new JsonCamsRepository();
  });

  test('getAllCams should return all cameras from json', async () => {
    const cams = await repository.getAllCams();
    expect(cams).toHaveLength(webcamsData.length);
    expect(cams[0]).toHaveProperty('id');
    expect(cams[0]).toHaveProperty('road');
  });

  test('getAllRoads should return unique sorted roads', async () => {
    const roads = await repository.getAllRoads();
    // Test some of the roads from the JSON are present
    expect(roads).toContain('A-62');
    expect(roads).toContain('A-6');

    // Check sorting (simple check)
    if (roads.length >= 2) {
      const roadA = roads[0];
      const roadB = roads[1];
      // Basic check that it doesn't throw and looks sorted
      expect(roads).toEqual([...roads].sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })));
    }
  });

  test('getAllProvinces should return unique sorted provinces', async () => {
    const provinces = await repository.getAllProvinces();
    expect(provinces).toContain('BURGOS');
    expect(provinces).toContain('LUGO');
    expect(provinces).toEqual([...provinces].sort());
  });

  test('getFilteredCams should filter by road', async () => {
    const filtered = await repository.getFilteredCams({ road: 'A-62' });
    expect(filtered.every(c => c.road === 'A-62')).toBe(true);
    expect(filtered.length).toBeGreaterThan(0);
  });

  test('getFilteredCams should filter by province', async () => {
    const filtered = await repository.getFilteredCams({ province: 'PALENCIA' });
    expect(filtered.every(c => c.location === 'PALENCIA')).toBe(true);
    expect(filtered.length).toBeGreaterThan(0);
  });

  test('getCamById should return specific cam', async () => {
    const firstCam = webcamsData[0];
    const cam = await repository.getCamById(firstCam.id);
    expect(cam).toEqual(firstCam);
  });
});
