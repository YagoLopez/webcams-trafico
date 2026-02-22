# Unit Tests Plan

Identify units (functions, components, hooks) altered or created during the implementation tasks.

## Repositories
- Técnica de testing: Jest test runner con assertions standard.
- Mocks: No es estrictamente necesario mockear nada si podemos inyectar un array mock falso para `JsonCamsRepository` pero si la implementación lee de forma estática `webcams.json`, testaremos directamente contra el fixture.

## Frontend
- Técnica de testing: React Native Testing Library.
- Mocks: Para probar `webcams-list-screen.tsx`, necesitaremos un provider en los tests de React Query (`QueryClientProvider` configurado para desactivar reintentos en testing) y usar mocks de red si hiciera falta. Pero como usamos JsonRepository que resuelve arrays predecibles de mocks, bastará con renderizar la app con nuestro container.
- Alternativa técnica: Se puede mockear los hooks de React Query (`useQuery`) pero a menudo es mejor renderizar con el provider y testear el comportamiento completo desde la UI.

## Unit Tests Checklist

- [ ] Test `JsonCamsRepository.getAllCams` resolves with expected array structure.
- [ ] Test `JsonCamsRepository.getAllRoads` correctly extracts unique sorted roads.
- [ ] Test `JsonCamsRepository.getAllProvinces` correctly extracts unique sorted provinces.
- [ ] Test `JsonCamsRepository.getFilteredCams` correctly applies single / combined filters.
- [ ] Test `JsonCamsRepository.getCamById` fetches the specific element.
- [ ] Test `webcams-list-screen.tsx` loading state displays a loading indicator initially (verifying React Query usage natively).
- [ ] Test `webcams-list-screen.tsx` success state sets the correct list length data.
