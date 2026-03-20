export interface PaginationResult<T> {
  data: T[];
  hasNextPage: boolean;
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export class ArrayPaginator {
  /**
   * Pagina un array en memoria de forma agnóstica.
   * @param items El array completo de elementos.
   * @param pageNumber El número de página actual (empezando en 1). Opcional.
   * @param pageSize La cantidad de elementos por página. Opcional.
   * @returns Un objeto PaginationResult.
   */
  static paginate<T>(items: T[], pageNumber?: number, pageSize?: number): PaginationResult<T> {
    if (!items || items.length === 0) {
      return { data: [], hasNextPage: false, totalItems: 0, totalPages: 0, currentPage: pageNumber || 1 };
    }

    if (pageNumber === undefined || pageSize === undefined) {
      return {
        data: items,
        hasNextPage: false,
        totalItems: items.length,
        totalPages: 1,
        currentPage: 1,
      };
    }

    // Por seguridad, si nos piden página 0 o negativa, forzamos a 1
    const validPageNumber = Math.max(1, pageNumber);
    // Por seguridad, pageSize al menos 1
    const validPageSize = Math.max(1, pageSize);

    const startIndex = (validPageNumber - 1) * validPageSize;

    // Retorno anticipado si ya estamos fuera de los límites del array
    const totalPages = Math.ceil(items.length / validPageSize);

    if (startIndex >= items.length) {
      return { data: [], hasNextPage: false, totalItems: items.length, totalPages, currentPage: validPageNumber };
    }

    const endIndex = startIndex + validPageSize;

    return {
      data: items.slice(startIndex, endIndex),
      hasNextPage: endIndex < items.length,
      totalItems: items.length,
      totalPages,
      currentPage: validPageNumber,
    };
  }
}
