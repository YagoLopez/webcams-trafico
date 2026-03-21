import { Cam } from '@/architecture/domain/entities/Cam';
import { ICamsRepository } from '@/architecture/domain/repositories/ICamsRepository';
import { GetPrevCamUseCase } from './get-prev-cam.use-case';

describe('GetPrevCamUseCase', () => {
  let useCase: GetPrevCamUseCase;
  let mockRepo: jest.Mocked<ICamsRepository>;

  beforeEach(() => {
    mockRepo = {
      getCamsByRoad: jest.fn(),
    } as unknown as jest.Mocked<ICamsRepository>;
    useCase = new GetPrevCamUseCase(mockRepo);
  });

  it('should return null if currentCam has no roadName', async () => {
    const cam = { id: '1', roadName: '' } as Cam;
    const result = await useCase.execute(cam);
    expect(result).toBeNull();
  });

  it('should call getCamsByRoad and return the previous camera', async () => {
    const prevCam = { id: '1', roadName: 'A-1', kilometer: 10, latitude: 40, longitude: -3 } as Cam;
    const currentCam = { id: '2', roadName: 'A-1', kilometer: 20 } as Cam;
    const roadCams = [prevCam, currentCam];

    mockRepo.getCamsByRoad.mockResolvedValue(roadCams);

    const result = await useCase.execute(currentCam);

    expect(mockRepo.getCamsByRoad).toHaveBeenCalledWith('A-1');
    expect(result).toEqual(prevCam);
  });
});
