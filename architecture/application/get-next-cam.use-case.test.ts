import { ICamsRepository } from '@/architecture/domain/repositories/ICamsRepository';
import { GetNextCamUseCase } from './get-next-cam.use-case';
import { Cam } from '@/architecture/domain/entities/cam';

describe('GetNextCamUseCase', () => {
  let useCase: GetNextCamUseCase;
  let mockRepo: jest.Mocked<ICamsRepository>;

  beforeEach(() => {
    mockRepo = {
      getCamsByRoad: jest.fn(),
    } as unknown as jest.Mocked<ICamsRepository>;
    useCase = new GetNextCamUseCase(mockRepo);
  });

  it('should return null if currentCam has no roadName', async () => {
    const cam = { id: '1', roadName: '' } as Cam;
    const result = await useCase.execute(cam);
    expect(result).toBeNull();
  });

  it('should call getCamsByRoad and return the next camera', async () => {
    const currentCam = { id: '1', roadName: 'A-1', kilometer: 10 } as Cam;
    const nextCam = { id: '2', roadName: 'A-1', kilometer: 20, latitude: 40, longitude: -3 } as Cam;
    const roadCams = [currentCam, nextCam];

    mockRepo.getCamsByRoad.mockResolvedValue(roadCams);

    const result = await useCase.execute(currentCam);

    expect(mockRepo.getCamsByRoad).toHaveBeenCalledWith('A-1');
    expect(result).toEqual(nextCam);
  });
});
