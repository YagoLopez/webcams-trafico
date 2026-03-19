import { GetAllProvincesUseCase } from '@/architecture/application/get-all-provinces.use-case';
import { GetAllRoadsUseCase } from '@/architecture/application/get-all-roads.use-case';
import { GetCamByIdUseCase } from '@/architecture/application/get-cam-by-id.use-case';
import { GetFilteredCamsUseCase } from '@/architecture/application/get-filtered-cams.use-case';
import { GetNextCamUseCase } from '@/architecture/application/get-next-cam.use-case';
import { GetPrevCamUseCase } from '@/architecture/application/get-prev-cam.use-case';
import { Cam } from '@/architecture/domain/entities/cam';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { CamFilters, ICamsRepository } from '../../lib/ICamsRepository';

export const useRoads = (camsRepository: ICamsRepository) => {
  return useQuery({
    queryKey: ['roads'],
    queryFn: () => new GetAllRoadsUseCase(camsRepository).execute(),
  });
};

export const useProvinces = (camsRepository: ICamsRepository) => {
  return useQuery({
    queryKey: ['provinces'],
    queryFn: () => new GetAllProvincesUseCase(camsRepository).execute(),
  });
};

export const useFilteredCams = (camsRepository: ICamsRepository, filters: CamFilters) => {
  return useQuery({
    queryKey: ['filteredCams', filters],
    queryFn: async () => {
      const result = await new GetFilteredCamsUseCase(camsRepository).execute(filters);
      return result.data; // map.tsx expects Cam[]
    },
  });
};

export const useCamById = (camsRepository: ICamsRepository, id: string) => {
  return useQuery({
    queryKey: ['cam', id],
    queryFn: () => new GetCamByIdUseCase(camsRepository).execute(id),
    enabled: !!id,
  });
};

const DEFAULT_PAGE_SIZE = 20;

export const useInfiniteFilteredCams = (camsRepository: ICamsRepository, filters: CamFilters, pageSize: number = DEFAULT_PAGE_SIZE) => {
  return useInfiniteQuery({
    queryKey: ['filteredCams', 'infinite', filters, pageSize],
    queryFn: async ({ pageParam }) => {
      // Pedimos solo la página que necesitamos al repositorio
      return new GetFilteredCamsUseCase(camsRepository).execute(filters, pageParam, pageSize);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // Si hay más páginas, devolvemos el número de la siguiente página
      return lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined;
    },
  });
};

export const useNextCam = (camsRepository: ICamsRepository, currentCam: Cam | null) => {
  return useQuery({
    queryKey: ['nextCam', currentCam?.id],
    queryFn: async () => {
      if (!currentCam) return null;
      const getNextCamUseCase = new GetNextCamUseCase(camsRepository);
      return getNextCamUseCase.execute(currentCam);
    },
    enabled: !!currentCam,
  });
};

export const usePrevCam = (camsRepository: ICamsRepository, currentCam: Cam | null) => {
  return useQuery({
    queryKey: ['prevCam', currentCam?.id],
    queryFn: async () => {
      if (!currentCam) return null;
      const getPrevCamUseCase = new GetPrevCamUseCase(camsRepository);
      return getPrevCamUseCase.execute(currentCam);
    },
    enabled: !!currentCam,
  });
};

