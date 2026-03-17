import { CamFilters } from '@/types/cam-filters';
import { Cam } from '@/domain/entities/cam';
import { PaginationResult } from './paginator/ArrayPaginator';
export type { CamFilters };

export interface ICamsRepository {
  /** Gets a list of all cameras */
  getAllCams(): Promise<Cam[]>;

  /** Gets a specific camera by its ID */
  getCamById(id: string): Promise<Cam | null>;

  /** Gets a unique and sorted list of all road names */
  getAllRoads(): Promise<string[]>;

  /** Gets a unique and sorted list of all provinces */
  getAllProvinces(): Promise<string[]>;

  /** Gets the cameras applying the road and/or province filters. Can optionally be paginated. */
  getFilteredCams(filters: CamFilters, page?: number, pageSize?: number): Promise<PaginationResult<Cam>>;

  /** Gets all cameras for a specific road */
  getCamsByRoad(roadName: string): Promise<Cam[]>;
}
