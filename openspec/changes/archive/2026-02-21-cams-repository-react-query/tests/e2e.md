# E2E Tests Plan

Context for testing involves the main user flow of viewing the webcams list and interacting with the filter modal, knowing that data is fetched asynchronously now via React Query and the JSON repository.

## Flujos principales y errores

- Paso a paso principal: El usuario abre la app, visualiza un indicador de carga temporal. Luego observa la lista completa de cámaras al cargar el feed usando `JsonCamsRepository`. Al abrir los filtros, navega por los dropdowns y selecciona una cámara o provincia, viéndose reflejado en una lista filtrada.
- Manejo de error: (Simulable) Si la promesa asíncrona es rechazada en `JsonCamsRepository`, la interfaz debería renderizar el estado de error de la query. En este caso es solo lectura local por lo que un error solo será sintético.

## E2E Tests Checklist

- [ ] Test the primary successful flow: App renders, displays loading, then displays exactly the webcam items loaded from json.
- [ ] Test filtering functionality: User opens filters, selects a Road, clicks apply, list automatically updates to show matching roads using the repository method.
- [ ] Test edge cases and errors: If data loading fails or takes too long, test loading UI appearance properly.
