import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import {
  useRoads,
  useProvinces,
  useFilteredCams,
  useCamById,
  useInfiniteFilteredCams,
  useNextCam,
  usePrevCam,
} from './use-cams';
import { ICamsRepository, CamFilters } from '@/architecture/domain/repositories/ICamsRepository';
import { Cam } from '@/architecture/domain/entities/cam';
import { PaginationResult } from '@/architecture/infraestructure/paginator/ArrayPaginator';

// Mocks for the underlying UseCases
jest.mock('@/architecture/application/get-all-roads.use-case', () => ({
  GetAllRoadsUseCase: jest.fn().mockImplementation(() => ({
    execute: jest.fn().mockResolvedValue(['A-1', 'A-2']),
  })),
}));

jest.mock('@/architecture/application/get-all-provinces.use-case', () => ({
  GetAllProvincesUseCase: jest.fn().mockImplementation(() => ({
    execute: jest.fn().mockResolvedValue(['Madrid', 'Barcelona']),
  })),
}));

const mockGetFilteredCamsExecute = jest.fn();
jest.mock('@/architecture/application/get-filtered-cams.use-case', () => ({
  GetFilteredCamsUseCase: jest.fn().mockImplementation(() => ({
    execute: mockGetFilteredCamsExecute,
  })),
}));

const mockGetCamByIdExecute = jest.fn();
jest.mock('@/architecture/application/get-cam-by-id.use-case', () => ({
  GetCamByIdUseCase: jest.fn().mockImplementation(() => ({
    execute: mockGetCamByIdExecute,
  })),
}));

const mockGetNextCamExecute = jest.fn();
jest.mock('@/architecture/application/get-next-cam.use-case', () => ({
  GetNextCamUseCase: jest.fn().mockImplementation(() => ({
    execute: mockGetNextCamExecute,
  })),
}));

const mockGetPrevCamExecute = jest.fn();
jest.mock('@/architecture/application/get-prev-cam.use-case', () => ({
  GetPrevCamUseCase: jest.fn().mockImplementation(() => ({
    execute: mockGetPrevCamExecute,
  })),
}));

describe('use-cams hooks', () => {
  let queryClient: QueryClient;
  let mockRepo: jest.Mocked<ICamsRepository>;

  beforeEach(() => {
    // Create a fresh QueryClient for each test to clear cache
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false, // Don't retry inside tests
          gcTime: 0,    // No garbage collection delay to avoid worker leaks
        },
      },
    });

    mockRepo = {} as jest.Mocked<ICamsRepository>;
    jest.clearAllMocks();
  });

  afterEach(() => {
    queryClient.clear();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  describe('useRoads', () => {
    it('fetches and returns roads', async () => {
      const { result } = renderHook(() => useRoads(mockRepo), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toEqual(['A-1', 'A-2']);
    });
  });

  describe('useProvinces', () => {
    it('fetches and returns provinces', async () => {
      const { result } = renderHook(() => useProvinces(mockRepo), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toEqual(['Madrid', 'Barcelona']);
    });
  });

  describe('useFilteredCams', () => {
    it('fetches and returns filtered cams', async () => {
      const filters: CamFilters = { roadName: 'A-1' };
      const mockCams = [{ id: '1', roadName: 'A-1' } as Cam];
      const mockResult: PaginationResult<Cam> = {
        data: mockCams,
        totalItems: 1,
        totalPages: 1,
        currentPage: 1,
        hasNextPage: false,
      };

      mockGetFilteredCamsExecute.mockResolvedValueOnce(mockResult);

      const { result } = renderHook(() => useFilteredCams(mockRepo, filters), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(mockGetFilteredCamsExecute).toHaveBeenCalledWith(filters);
      expect(result.current.data).toEqual(mockCams); // Verify it maps to data array
    });
  });

  describe('useCamById', () => {
    it('fetches and returns a cam by id', async () => {
      const mockCam = { id: '1', roadName: 'A-1' } as Cam;
      mockGetCamByIdExecute.mockResolvedValueOnce(mockCam);

      const { result } = renderHook(() => useCamById(mockRepo, '1'), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(mockGetCamByIdExecute).toHaveBeenCalledWith('1');
      expect(result.current.data).toEqual(mockCam);
    });

    it('should be disabled if id is falsy', () => {
      const { result } = renderHook(() => useCamById(mockRepo, ''), { wrapper });

      expect(result.current.fetchStatus).toBe('idle');
      expect(mockGetCamByIdExecute).not.toHaveBeenCalled();
    });
  });

  describe('useInfiniteFilteredCams', () => {
    it('fetches initial page and supports next page logic', async () => {
      const filters: CamFilters = { roadName: 'A-1' };
      const page1Result: PaginationResult<Cam> = {
        data: [{ id: '1' } as Cam],
        currentPage: 1,
        totalItems: 2,
        totalPages: 2,
        hasNextPage: true,
      };

      // Mock first page response
      mockGetFilteredCamsExecute.mockResolvedValue(page1Result);

      const { result } = renderHook(() => useInfiniteFilteredCams(mockRepo, filters, 1), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(mockGetFilteredCamsExecute).toHaveBeenCalledWith(filters, 1, 1);
      
      // Check first page data
      expect(result.current.data?.pages[0]).toEqual(page1Result);
      expect(result.current.hasNextPage).toBe(true);
    });
  });

  describe('useNextCam', () => {
    it('fetches and returns the next cam', async () => {
      const currentCam = { id: '1', roadName: 'A-1' } as Cam;
      const nextCam = { id: '2', roadName: 'A-1' } as Cam;
      mockGetNextCamExecute.mockResolvedValueOnce(nextCam);

      const { result } = renderHook(() => useNextCam(mockRepo, currentCam), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(mockGetNextCamExecute).toHaveBeenCalledWith(currentCam);
      expect(result.current.data).toEqual(nextCam);
    });

    it('should be disabled if currentCam is null', () => {
      const { result } = renderHook(() => useNextCam(mockRepo, null), { wrapper });

      expect(result.current.fetchStatus).toBe('idle');
      expect(mockGetNextCamExecute).not.toHaveBeenCalled();
    });
  });

  describe('usePrevCam', () => {
    it('fetches and returns the prev cam', async () => {
      const currentCam = { id: '2', roadName: 'A-1' } as Cam;
      const prevCam = { id: '1', roadName: 'A-1' } as Cam;
      mockGetPrevCamExecute.mockResolvedValueOnce(prevCam);

      const { result } = renderHook(() => usePrevCam(mockRepo, currentCam), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(mockGetPrevCamExecute).toHaveBeenCalledWith(currentCam);
      expect(result.current.data).toEqual(prevCam);
    });

    it('should be disabled if currentCam is null', () => {
      const { result } = renderHook(() => usePrevCam(mockRepo, null), { wrapper });

      expect(result.current.fetchStatus).toBe('idle');
      expect(mockGetPrevCamExecute).not.toHaveBeenCalled();
    });
  });
});
