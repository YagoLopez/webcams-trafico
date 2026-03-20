import { Cam } from '@/architecture/domain/entities/cam';
import { CamFilters } from '@/types/cam-filters';
import { PaginationResult } from './PaginationResult';

export type { CamFilters };

export interface ICamsRepository {
  getAllCams(): Promise<Cam[]>;

  getCamById(id: string): Promise<Cam | null>;

  getAllRoads(): Promise<string[]>;

  getAllProvinces(): Promise<string[]>;

  getFilteredCams(filters: CamFilters, page?: number, pageSize?: number): Promise<PaginationResult<Cam>>;

  getCamsByRoad(roadName: string): Promise<Cam[]>;
}
