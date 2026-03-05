import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { CamFilters, ICamsRepository } from '../lib/ICamsRepository';
import { ArrayPaginator } from '../lib/paginator/ArrayPaginator';

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

export const useCamById = (cams: ICamsRepository, id: string) => {
  return useQuery({
    queryKey: ['cam', id],
    queryFn: () => cams.getCamById(id),
    enabled: !!id,
  });
};

export const useInfiniteFilteredCams = (cams: ICamsRepository, filters: CamFilters, pageSize: number = 20) => {
  return useInfiniteQuery({
    queryKey: ['filteredCams', 'infinite', filters, pageSize],
    queryFn: async ({ pageParam }) => {
      // 1. Obtenemos TOODAS las cámaras filtradas del repositorio
      const allFilteredCams = await cams.getFilteredCams(filters);
      // 2. Extraemos solo la página que necesitamos usando nuestro Paginador Agnóstico
      return ArrayPaginator.paginate(allFilteredCams, pageParam, pageSize);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // Si hay más páginas, devolvemos el número de la siguiente página
      return lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined;
    },
  });
};
