## 1. Preparación y Estado

- [x] 1.1 Añadir el estado `isFiltersModalVisible` en `WebcamsListScreen.tsx` usando `useState`.
- [x] 1.2 Configurar el botón `tune-vertical` para llamar a `setIsFiltersModalVisible(true)`.

## 2. Implementación del Modal de Filtros

- [x] 2.1 Crear la estructura del `Modal` de React Native dentro de `WebcamsListScreen.tsx` (o extraer a componente si es muy grande).
- [x] 2.2 Diseñar el contenedor del modal con Tailwind CSS (fondo semi-transparente, contenedor redondeado, padding).
- [x] 2.3 Mover los componentes `SelectBox` de la vista principal al interior del modal.
- [x] 2.4 Mover el botón "Borrar filtros" al modal.
- [x] 2.5 Añadir un botón de "Cerrar" o "Aplicar" dentro del modal para cerrarlo.

## 3. Limpieza de UI Principal

- [x] 3.1 Eliminar el bloque de `Filters Section` que estaba visible por defecto en `WebcamsListScreen.tsx`.
- [x] 3.2 Ajustar el espaciado de la pantalla principal tras eliminar los filtros.

## 4. Verificación y Pulido

- [x] 4.1 Verificar que los filtros siguen funcionando correctamente y filtran la `FlatList`.
- [x] 4.2 Asegurar que el modal responde correctamente al modo oscuro.
- [x] 4.3 Comprobar que el botón "Borrar filtros" resetea el estado y limpia los campos en el modal.
