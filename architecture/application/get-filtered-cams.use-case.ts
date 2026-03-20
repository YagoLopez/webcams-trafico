import { ICamsRepository, CamFilters } from '@/architecture/domain/repositories/ICamsRepository';
import { Cam } from '@/architecture/domain/entities/cam';
import { PaginationResult } from '@/architecture/infraestructure/paginator/ArrayPaginator';

export class GetFilteredCamsUseCase {
  constructor(private readonly camRepository: ICamsRepository) { }

  async execute(filters: CamFilters, page?: number, pageSize?: number): Promise<PaginationResult<Cam>> {
    return this.camRepository.getFilteredCams(filters, page, pageSize);
  }
}
