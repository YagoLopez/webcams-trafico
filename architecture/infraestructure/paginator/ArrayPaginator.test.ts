import { ArrayPaginator } from './ArrayPaginator';

describe('ArrayPaginator', () => {
  const dummyItems = Array.from({ length: 25 }, (_, i) => `Item ${i + 1}`); // 25 items: ['Item 1', ..., 'Item 25']

  it('debería devolver la primera página correctamente', () => {
    const result = ArrayPaginator.paginate(dummyItems, 1, 10);
    expect(result.data.length).toBe(10);
    expect(result.data[0]).toBe('Item 1');
    expect(result.data[9]).toBe('Item 10');
    expect(result.hasNextPage).toBe(true);
    expect(result.totalItems).toBe(25);
    expect(result.currentPage).toBe(1);
  });

  it('debería devolver la segunda página correctamente', () => {
    const result = ArrayPaginator.paginate(dummyItems, 2, 10);
    expect(result.data.length).toBe(10);
    expect(result.data[0]).toBe('Item 11');
    expect(result.data[9]).toBe('Item 20');
    expect(result.hasNextPage).toBe(true);
    expect(result.currentPage).toBe(2);
  });

  it('debería devolver la última página (parcial) correctamente', () => {
    const result = ArrayPaginator.paginate(dummyItems, 3, 10);
    expect(result.data.length).toBe(5);
    expect(result.data[0]).toBe('Item 21');
    expect(result.data[4]).toBe('Item 25');
    expect(result.hasNextPage).toBe(false); // No hay más páginas
  });

  it('debería manejar una página vacía si se pide más allá del límite', () => {
    const result = ArrayPaginator.paginate(dummyItems, 4, 10);
    expect(result.data.length).toBe(0);
    expect(result.hasNextPage).toBe(false);
  });

  it('debería manejar un array vacío correctamente', () => {
    const result = ArrayPaginator.paginate([], 1, 10);
    expect(result.data.length).toBe(0);
    expect(result.hasNextPage).toBe(false);
    expect(result.totalItems).toBe(0);
  });

  it('debería manejar números de página menores o iguales a 0 de forma segura', () => {
    const result = ArrayPaginator.paginate(dummyItems, 0, 10); // Página 0
    expect(result.data[0]).toBe('Item 1');
    expect(result.currentPage).toBe(1); // Se autocorrigió a 1

    const resultNegative = ArrayPaginator.paginate(dummyItems, -5, 10); // Página -5
    expect(resultNegative.data[0]).toBe('Item 1');
    expect(resultNegative.currentPage).toBe(1); // Se autocorrigió a 1
  });
});
