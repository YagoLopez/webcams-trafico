import { ICamsRepository } from '@/lib/ICamsRepository';

export class GetAllRoadsUseCase {
  constructor(private readonly camRepository: ICamsRepository) {}

  async execute(): Promise<string[]> {
    return this.camRepository.getAllRoads();
  }
}
