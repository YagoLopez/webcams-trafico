import { ICamsRepository } from '@/lib/ICamsRepository';

export class GetAllProvincesUseCase {
  constructor(private readonly camRepository: ICamsRepository) {}

  async execute(): Promise<string[]> {
    return this.camRepository.getAllProvinces();
  }
}
