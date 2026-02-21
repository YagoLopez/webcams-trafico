import { useQuery } from '@tanstack/react-query';
import { CamFilters, ICamsRepository } from '../repositories/ICamsRepository';

export const useRoads = (cams: ICamsRepository) => {
  return useQuery({
    queryKey: ['roads'],
    queryFn: () => cams.getAllRoads(),
  });
};

export const useProvinces = (cams: ICamsRepository) => {
  return useQuery({
    queryKey: ['provinces'],
    queryFn: () => cams.getAllProvinces(),
  });
};

export const useFilteredCams = (cams: ICamsRepository, filters: CamFilters) => {
  return useQuery({
    queryKey: ['filteredCams', filters],
    queryFn: () => cams.getFilteredCams(filters),
  });
};
