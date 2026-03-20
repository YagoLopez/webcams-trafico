import { ICamsRepository } from '@/architecture/domain/repositories/ICamsRepository';
import { GetAllRoadsUseCase } from './get-all-roads.use-case';

describe('GetAllRoadsUseCase', () => {
  let useCase: GetAllRoadsUseCase;
  let mockRepo: jest.Mocked<ICamsRepository>;

  beforeEach(() => {
    mockRepo = {
      getAllRoads: jest.fn(),
    } as unknown as jest.Mocked<ICamsRepository>;
    useCase = new GetAllRoadsUseCase(mockRepo);
  });

  it('should call getAllRoads on repository and return the list', async () => {
    const roads = ['A-1', 'A-6'];
    mockRepo.getAllRoads.mockResolvedValue(roads);

    const result = await useCase.execute();

    expect(mockRepo.getAllRoads).toHaveBeenCalledTimes(1);
    expect(result).toEqual(roads);
  });
});
