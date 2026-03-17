import { Cam } from '@/domain/entities/cam';
import { getPrevCamOnRoad } from '@/domain/services/cam.navigation.service';
import { ICamsRepository } from '@/lib/ICamsRepository';

export class GetPrevCamUseCase {
  constructor(private readonly camRepository: ICamsRepository) {}

  async execute(currentCam: Cam): Promise<Cam | null> {
    if (!currentCam.roadName) return null;
    
    // 1. Fetch pre-filtered cameras from the repository
    const roadCams = await this.camRepository.getCamsByRoad(currentCam.roadName);
    
    // 2. Execute domain logic
    return getPrevCamOnRoad(currentCam, roadCams);
  }
}
