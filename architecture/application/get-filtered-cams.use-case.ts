import { Cam } from '@/architecture/domain/entities/cam';
import { CamFilters, ICamsRepository } from '@/architecture/domain/repositories/ICamsRepository';
import { PaginationResult } from '@/architecture/infrastructure/paginator/ArrayPaginator';

export class GetFilteredCamsUseCase {
  constructor(private readonly camRepository: ICamsRepository) { }

  async execute(filters: CamFilters, page?: number, pageSize?: number): Promise<PaginationResult<Cam>> {
    return this.camRepository.getFilteredCams(filters, page, pageSize);
  }
}
