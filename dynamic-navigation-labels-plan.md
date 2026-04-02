# Plan de Implementación: Botones de Navegación Dinámicos en Traffic Map

## Requisitos
- Sustituir los textos "← Anterior" y "Siguiente →" del callout en el mapa por la dirección real de la marcha (ej. "Siguente cámara en dir. Oviedo").
- Basarse en el **Punto Kilométrico (PK)** y un diccionario de rutas como propone Google Gemini.
- Integrar estos textos teniendo en cuenta el diseño de la interfaz para evitar desbordamientos de texto.

## Fases de Implementación

### Fase 1: Diccionario de Carreteras y Utilidades
- Crear archivo `architecture/infrastructure/utils/road-directions.ts` para albergar el diccionario de direcciones según la vía y el sentido `start` (PK decreciente) y `end` (PK creciente).
- Implementar la función `getButtonLabel(cam, directionType, roadName)` siguiendo la estrategia de fallbacks (diccionario -> roadDestination -> por defecto).

### Fase 2: Adaptación en el Componente `TrafficMapNative`
- Usar la nueva función `getButtonLabel` en `components/traffic-map/traffic-map.tsx`:
  - Pasar el `prevCam` con argumento `'start'` y la carretera actual.
  - Pasar el `nextCam` con argumento `'end'` y la carretera actual.
- **Refactorización de UI**: Al tener textos más largos, los tres botones horizontales ("Anterior", "Ver Detalles", "Siguiente") se apilarán verticalmente (100% de ancho cada uno) con espaciado vertical, manteniendo la accesibilidad.

## Dependencias
- `prevCam` y `nextCam` que ya son provistos por los use cases implementados (`useNextCam`, `usePrevCam`).

## Riesgos y Consideraciones
- **RIESGO MEDIO**: Textos de destino muy largos pueden desbordar el botón si no manejan bien el `numberOfLines={2}`.
- **RIESGO BAJO**: Carreteras nuevas o secundarias no estarán en el diccionario estático, lo que exigirá usar bien el `roadDestination` de respaldo.

---
**ESTADO: ESPERANDO APROBACIÓN PARA PROCEDER (Fase 3)**
