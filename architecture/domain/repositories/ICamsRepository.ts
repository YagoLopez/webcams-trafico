import { Cam } from '@/architecture/domain/entities/cam';
import { CamFilters } from '@/architecture/domain/entities/CamFilters';
import { PaginationResult } from '@/architecture/infrastructure/paginator/ArrayPaginator';

export type { CamFilters };

export interface ICamsRepository {
  getAllCams(): Promise<Cam[]>;

  getCamById(id: string): Promise<Cam | null>;

  getAllRoads(): Promise<string[]>;

  getAllProvinces(): Promise<string[]>;

  getFilteredCams(filters: CamFilters, page?: number, pageSize?: number): Promise<PaginationResult<Cam>>;

  getCamsByRoad(roadName: string): Promise<Cam[]>;
}
