# Design: Refactor Filters to Modal

## Context
Los filtros actualmente ocupan espacio vertical valioso en la pantalla de lista de cámaras. Queremos moverlos a un modal que se active bajo demanda.

## Goals
*   Liberar espacio en la pantalla principal.
*   Mantener la funcionalidad de filtrado intacta.
*   Proporcionar una transición suave al abrir/cerrar el modal.

## Decisions
1.  **Componente Modal**: Usaremos el componente `Modal` nativo de `react-native` por simplicidad y buen rendimiento en móviles.
2.  **Ubicación del Estado**: El estado seguirá en `WebcamsListScreen` para evitar la complejidad de un estado global. Se pasará al modal mediante props.
3.  **UI de Activación**: El botón existente con el icono `tune-vertical` (ajustes) será el disparador.
4.  **Estética**: El modal tendrá un fondo semi-transparente (backdrop) y un contenedor con esquinas redondeadas en la parte inferior o central, siguiendo el diseño premium solicitado anteriormente.

## Risks / Trade-offs
*   **Accesibilidad**: Debemos asegurar que el modal se pueda cerrar fácilmente (pulsando fuera o con un botón de cerrar).
*   **Persistencia**: Al cerrar el modal, los filtros aplicados deben persistir en la lista (esto está garantizado al mantener el estado en el padre).
