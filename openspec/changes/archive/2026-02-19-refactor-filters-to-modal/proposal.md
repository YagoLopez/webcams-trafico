# Proposal: Refactor Filters to Modal

## Motivation
Actualmente, los filtros de carreteras y provincias ocupan un espacio considerable en la pantalla principal de `WebcamsListScreen.tsx`. Esto reduce el área disponible para ver la lista de cámaras. Al mover estos filtros a un cuadro de diálogo modal (activado por el botón de ajustes), mejoramos la visibilidad del contenido principal y proporcionamos una interfaz más limpia y profesional.

## Proposed Changes
1.  **WebcamsListScreen.tsx**:
    *   Eliminar la sección de filtros (`Filters Section`) de la vista principal.
    *   Añadir un estado `isModalVisible` para controlar la visibilidad del modal.
    *   Configurar el botón `tune-vertical` para abrir el modal.
2.  **Nuevo Componente (o Modal Inline)**:
    *   Crear un componente Modal que contenga los selectores de carretera y provincia, y el botón de "Borrar filtros".
    *   El modal debe mantener la estética actual (soporte para modo oscuro, Tailwind CSS).
3.  **Estado**:
    *   Seguir utilizando el estado local de React en `WebcamsListScreen` para `selectedRoad` y `selectedProvince`, pasándolos como props al modal si es necesario.

## Capabilities
- **filter-modal**: Mover los filtros de carretera y provincia a un modal accesible mediante un botón, liberando espacio en la pantalla principal.

## Success Criteria
*   Los filtros ya no son visibles por defecto en la pantalla principal.
*   Al hacer clic en el icono de filtros, se abre un modal con las opciones de filtrado.
*   Al seleccionar una opción en el modal, la lista de cámaras se actualiza (reactividad mantenida).
*   El botón "Borrar filtros" funciona correctamente desde dentro del modal.
*   Diseño responsivo y consistente con Tailwind CSS.
