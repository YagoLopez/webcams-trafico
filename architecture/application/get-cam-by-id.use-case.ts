import { Cam } from '@/architecture/domain/entities/Cam';
import { ICamsRepository } from '@/architecture/domain/repositories/ICamsRepository';

export class GetCamByIdUseCase {
  constructor(private readonly camRepository: ICamsRepository) { }

  async execute(id: string): Promise<Cam | null> {
    return this.camRepository.getCamById(id);
  }
}
