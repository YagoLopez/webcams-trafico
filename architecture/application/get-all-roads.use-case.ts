import { ICamsRepository } from '@/architecture/domain/repositories/ICamsRepository';

export class GetAllRoadsUseCase {
  constructor(private readonly camRepository: ICamsRepository) {}

  async execute(): Promise<string[]> {
    return this.camRepository.getAllRoads();
  }
}
