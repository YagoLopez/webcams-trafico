import webcamsData from '../data/webcams.json';
import { Cam } from '../types/cam';
import { CamFilters, ICamsRepository } from './ICamsRepository';

export class JsonCamsRepository implements ICamsRepository {
  private static instance: JsonCamsRepository;
  private readonly data: Cam[];

  private constructor() {
    this.data = webcamsData as Cam[];
  }

  public static getInstance(): JsonCamsRepository {
    if (!JsonCamsRepository.instance) {
      JsonCamsRepository.instance = new JsonCamsRepository();
    }
    return JsonCamsRepository.instance;
  }

  async getAllCams(): Promise<Cam[]> {
    return Promise.resolve(this.data);
  }

  async getCamById(id: string): Promise<Cam | null> {
    const cam = this.data.find(c => c.id === id);
    return Promise.resolve(cam || null);
  }

  async getAllRoads(): Promise<string[]> {
    const roads = this.data.map(c => c.road).filter(Boolean);
    const uniqueRoads = Array.from(new Set(roads));
    uniqueRoads.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
    return Promise.resolve(uniqueRoads);
  }

  async getAllProvinces(): Promise<string[]> {
    const provinces = this.data.map(c => c.location).filter(Boolean);
    const uniqueProvinces = Array.from(new Set(provinces)).sort();
    return Promise.resolve(uniqueProvinces);
  }

  async getFilteredCams(filters: CamFilters): Promise<Cam[]> {
    let filtered = this.data;

    if (filters.road) {
      filtered = filtered.filter(c => c.road === filters.road);
    }

    if (filters.province) {
      filtered = filtered.filter(c => c.location === filters.province);
    }

    if (filters.searchQuery) {
      // Escapar caracteres especiales y crear una RegExp case-insensitive una sola vez
      const escapedQuery = filters.searchQuery.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
      const regex = new RegExp(escapedQuery, 'i');
      filtered = filtered.filter(c =>
        (c.location && regex.test(c.location)) ||
        (c.kilometer && regex.test(c.kilometer)) ||
        (c.road && regex.test(c.road))
      );
    }

    return Promise.resolve(filtered);
  }
}
