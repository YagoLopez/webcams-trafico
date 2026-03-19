import { GetNextCamUseCase } from '@/architecture/application/get-next-cam.use-case';
import { GetPrevCamUseCase } from '@/architecture/application/get-prev-cam.use-case';
import { Cam } from '@/architecture/domain/entities/cam';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { CamFilters, ICamsRepository } from '../../lib/ICamsRepository';

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
    queryFn: async () => {
      const result = await cams.getFilteredCams(filters);
      return result.data; // map.tsx expects Cam[]
    },
  });
};

export const useCamById = (cams: ICamsRepository, id: string) => {
  return useQuery({
    queryKey: ['cam', id],
    queryFn: () => cams.getCamById(id),
    enabled: !!id,
  });
};

const DEFAULT_PAGE_SIZE = 20;

export const useInfiniteFilteredCams = (cams: ICamsRepository, filters: CamFilters, pageSize: number = DEFAULT_PAGE_SIZE) => {
  return useInfiniteQuery({
    queryKey: ['filteredCams', 'infinite', filters, pageSize],
    queryFn: async ({ pageParam }) => {
      // Pedimos solo la página que necesitamos al repositorio
      return cams.getFilteredCams(filters, pageParam, pageSize);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // Si hay más páginas, devolvemos el número de la siguiente página
      return lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined;
    },
  });
};

export const useNextCam = (cams: ICamsRepository, currentCam: Cam | null) => {
  return useQuery({
    queryKey: ['nextCam', currentCam?.id],
    queryFn: async () => {
      if (!currentCam) return null;
      const getNextCamUseCase = new GetNextCamUseCase(cams);
      return getNextCamUseCase.execute(currentCam);
    },
    enabled: !!currentCam,
  });
};

export const usePrevCam = (cams: ICamsRepository, currentCam: Cam | null) => {
  return useQuery({
    queryKey: ['prevCam', currentCam?.id],
    queryFn: async () => {
      if (!currentCam) return null;
      const getPrevCamUseCase = new GetPrevCamUseCase(cams);
      return getPrevCamUseCase.execute(currentCam);
    },
    enabled: !!currentCam,
  });
};

