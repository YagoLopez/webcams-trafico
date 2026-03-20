import { ICamsRepository } from '@/architecture/domain/repositories/ICamsRepository';
import { GetAllProvincesUseCase } from './get-all-provinces.use-case';

describe('GetAllProvincesUseCase', () => {
  let useCase: GetAllProvincesUseCase;
  let mockRepo: jest.Mocked<ICamsRepository>;

  beforeEach(() => {
    mockRepo = {
      getAllProvinces: jest.fn(),
    } as unknown as jest.Mocked<ICamsRepository>;
    useCase = new GetAllProvincesUseCase(mockRepo);
  });

  it('should call getAllProvinces on repository and return the list', async () => {
    const provinces = ['Madrid', 'Barcelona'];
    mockRepo.getAllProvinces.mockResolvedValue(provinces);

    const result = await useCase.execute();

    expect(mockRepo.getAllProvinces).toHaveBeenCalledTimes(1);
    expect(result).toEqual(provinces);
  });
});
