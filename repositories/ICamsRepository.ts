import { CamFilters } from '@/types/cam-filters';
import { Cam } from '../types/cam';

export interface ICamsRepository {
  /** Obtiene una lista de todas las cámaras */
  getAllCams(): Promise<Cam[]>;

  /** Obtiene una cámara específica por su ID */
  getCamById(id: string): Promise<Cam | null>;

  /** Obtiene una lista única y ordenada de todas las carreteras */
  getAllRoads(): Promise<string[]>;

  /** Obtiene una lista única y ordenada de todas las provincias */
  getAllProvinces(): Promise<string[]>;

  /** Obtiene las cámaras aplicando los filtros de carretera y/o provincia */
  getFilteredCams(filters: CamFilters): Promise<Cam[]>;
}
