import webcamsData from '@/data/webcams.json';
import { JsonCamsRepository } from './JsonCamsRepository';

describe('JsonCamsRepository', () => {
  let repository: JsonCamsRepository;

  beforeEach(() => {
    repository = JsonCamsRepository.getInstance();
  });

  test('getAllCams should return all cameras from json', async () => {
    const cams = await repository.getAllCams();
    expect(cams).toHaveLength(webcamsData.length);
    expect(cams[0]).toHaveProperty('id');
    expect(cams[0]).toHaveProperty('roadName');
  });

  test('getAllRoads should return unique sorted roads', async () => {
    const roads = await repository.getAllRoads();
    // Test some of the roads from the JSON are present
    expect(roads).toContain('A-62');
    expect(roads).toContain('A-6');

    // Check sorting (simple check)
    if (roads.length >= 2) {
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
    const result = await repository.getFilteredCams({ roadName: 'A-62' });
    expect(result.data.every(c => c.roadName === 'A-62')).toBe(true);
    expect(result.data.length).toBeGreaterThan(0);
  });

  test('getFilteredCams should filter by province', async () => {
    const result = await repository.getFilteredCams({ province: 'PALENCIA' });
    expect(result.data.every(c => c.location === 'PALENCIA')).toBe(true);
    expect(result.data.length).toBeGreaterThan(0);
  });

  test('getCamById should return specific cam', async () => {
    const firstCam = webcamsData[0];
    const cam = await repository.getCamById(firstCam.id);
    expect(cam).toEqual(firstCam);
  });

  test('getFilteredCams should filter by searchQuery', async () => {
    const result = await repository.getFilteredCams({ searchQuery: 'A-62' });
    expect(result.data.length).toBeGreaterThan(0);
    expect(result.data.every(c =>
      c.location?.includes('A-62') || c.kilometer?.toString().includes('A-62') || c.roadName?.includes('A-62') || c.roadDestination?.includes('A-62')
    )).toBe(true);
  });

  test('getFilteredCams should return empty when searchQuery has no matches', async () => {
    const result = await repository.getFilteredCams({ searchQuery: 'xyznonexistent999' });
    expect(result.data).toHaveLength(0);
  });

  test('getFilteredCams should safely handle special regex characters in searchQuery', async () => {
    // Should not throw even with regex-special characters
    const result = await repository.getFilteredCams({ searchQuery: '(test)+.*' });
    expect(result.data).toBeDefined();
  });
});
