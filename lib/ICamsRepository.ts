import { CamFilters } from '@/types/cam-filters';
import { Cam } from '../types/cam';
export type { CamFilters };

export interface ICamsRepository {
  /** Gets a list of all cameras */
  getAllCams(): Promise<Cam[]>;

  /** Gets a specific camera by its ID */
  getCamById(id: string): Promise<Cam | null>;

  /** Gets a unique and sorted list of all roads */
  getAllRoads(): Promise<string[]>;

  /** Gets a unique and sorted list of all provinces */
  getAllProvinces(): Promise<string[]>;

  /** Gets the cameras applying the road and/or province filters */
  getFilteredCams(filters: CamFilters): Promise<Cam[]>;
}
