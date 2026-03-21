import { Cam } from '@/architecture/domain/entities/Cam';
import { CamFilters, ICamsRepository } from '@/architecture/domain/repositories/ICamsRepository';
import { PaginationResult } from '@/architecture/infrastructure/paginator/ArrayPaginator';
import { GetFilteredCamsUseCase } from './get-filtered-cams.use-case';

describe('GetFilteredCamsUseCase', () => {
  let useCase: GetFilteredCamsUseCase;
  let mockRepo: jest.Mocked<ICamsRepository>;

  beforeEach(() => {
    mockRepo = {
      getFilteredCams: jest.fn(),
    } as unknown as jest.Mocked<ICamsRepository>;
    useCase = new GetFilteredCamsUseCase(mockRepo);
  });

  it('should call getFilteredCams on repository with correct params', async () => {
    const filters: CamFilters = { roadName: 'A-1' };
    const mockResult: PaginationResult<Cam> = {
      data: [{ id: '1', roadName: 'A-1' } as Cam],
      hasNextPage: false,
      totalItems: 1,
      totalPages: 1,
      currentPage: 1
    };
    mockRepo.getFilteredCams.mockResolvedValue(mockResult);

    const result = await useCase.execute(filters, 1, 10);

    expect(mockRepo.getFilteredCams).toHaveBeenCalledWith(filters, 1, 10);
    expect(result).toEqual(mockResult);
  });
});
