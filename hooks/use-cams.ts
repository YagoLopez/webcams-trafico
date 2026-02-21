import { useQuery } from '@tanstack/react-query';
import { CamFilters, ICamsRepository } from '../repositories/ICamsRepository';
import { JsonCamsRepository } from '../repositories/JsonCamsRepository';

const camsRepo = new JsonCamsRepository();

export const useRoads = (repo: ICamsRepository) => {
  return useQuery({
    queryKey: ['roads'],
    queryFn: () => repo.getAllRoads(),
  });
};

export const useProvinces = (repo: ICamsRepository) => {
  return useQuery({
    queryKey: ['provinces'],
    queryFn: () => repo.getAllProvinces(),
  });
};

export const useFilteredCams = (repo: ICamsRepository, filters: CamFilters) => {
  return useQuery({
    queryKey: ['filteredCams', filters],
    queryFn: () => repo.getFilteredCams(filters),
  });
};
