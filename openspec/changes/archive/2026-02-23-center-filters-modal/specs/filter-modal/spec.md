## MODIFIED Requirements

### Requirement: Acceso a Filtros vía Modal
El sistema DEBE permitir al usuario acceder a los filtros de carretera y provincia a través de un botón que abre un modal, en lugar de mostrarlos directamente en la pantalla.
El modal DEBE aparecer centrado en la pantalla (horizontal y verticalmente) con una animación de fundido (fade). El modal DEBE tener un ancho máximo para evitar estirarse en pantallas anchas y sus bordes DEBEN estar redondeados en todos sus lados.

#### Scenario: Apertura del Modal
- **WHEN** el usuario presiona el botón con el icono `tune-vertical`.
- **THEN** se muestra un modal centrado en la pantalla con las opciones de filtrado.

#### Scenario: Contenido del Modal
- **WHEN** el modal está abierto.
- **THEN** deben ser visibles los SelectBox de "Filtrar carreteras" y "Filtrar provincias", así como el botón de "Borrar filtros" (si hay alguno aplicado).

## ADDED Requirements

### Requirement: Presentación del SelectBox Modal
El modal interno del componente `SelectBox` (usado para buscar y seleccionar opciones dentro del `FiltersModal`) DEBE aparecer centrado horizontalmente pero posicionado hacia la parte superior de la pantalla. DEBE utilizar una animación de fundido (fade), tener bordes redondeados en todos sus lados, y tener un ancho y alto máximos.

#### Scenario: Apertura del SelectBox
- **WHEN** el usuario toca el selector de carretera o provincia para abrir las opciones.
- **THEN** el modal interno del SelectBox aparece con animación fade.
- **THEN** el modal interno se posiciona cerca de la parte superior de la pantalla para evitar que sea cubierto por el teclado virtual en dispositivos móviles.
