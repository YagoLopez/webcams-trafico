import { useQuery } from '@tanstack/react-query';
import { CamFilters } from '../repositories/ICamsRepository';
import { JsonCamsRepository } from '../repositories/JsonCamsRepository';

const camsRepo = new JsonCamsRepository();

export const useRoads = () => {
  return useQuery({
    queryKey: ['roads'],
    queryFn: () => camsRepo.getAllRoads(),
  });
};

export const useProvinces = () => {
  return useQuery({
    queryKey: ['provinces'],
    queryFn: () => camsRepo.getAllProvinces(),
  });
};

export const useFilteredCams = (filters: CamFilters) => {
  return useQuery({
    queryKey: ['filteredCams', filters],
    queryFn: () => camsRepo.getFilteredCams(filters),
  });
};
