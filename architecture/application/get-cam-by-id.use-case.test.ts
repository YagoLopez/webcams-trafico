import { ICamsRepository } from '@/architecture/domain/repositories/ICamsRepository';
import { GetCamByIdUseCase } from './get-cam-by-id.use-case';
import { Cam } from '@/architecture/domain/entities/cam';

describe('GetCamByIdUseCase', () => {
  let useCase: GetCamByIdUseCase;
  let mockRepo: jest.Mocked<ICamsRepository>;

  beforeEach(() => {
    mockRepo = {
      getCamById: jest.fn(),
    } as unknown as jest.Mocked<ICamsRepository>;
    useCase = new GetCamByIdUseCase(mockRepo);
  });

  it('should return a camera if found', async () => {
    const mockCam = { id: '1', roadName: 'A-1' } as Cam;
    mockRepo.getCamById.mockResolvedValue(mockCam);

    const result = await useCase.execute('1');

    expect(mockRepo.getCamById).toHaveBeenCalledWith('1');
    expect(result).toBe(mockCam);
  });

  it('should return null if camera not found', async () => {
    mockRepo.getCamById.mockResolvedValue(null);

    const result = await useCase.execute('999');

    expect(mockRepo.getCamById).toHaveBeenCalledWith('999');
    expect(result).toBeNull();
  });
});
