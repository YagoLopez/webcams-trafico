<spec id="filter-modal">

# Spec: Filter Modal

## Requirements

### Requirement: Acceso a Filtros vía Modal
El sistema DEBE permitir al usuario acceder a los filtros de carretera y provincia a través de un botón que abre un modal, en lugar de mostrarlos directamente en la pantalla.

#### Scenario: Apertura del Modal
- **WHEN** el usuario presiona el botón con el icono `tune-vertical`.
- **THEN** se muestra un modal que cubre parte de la pantalla con las opciones de filtrado.

#### Scenario: Contenido del Modal
- **WHEN** el modal está abierto.
- **THEN** deben ser visibles los SelectBox de "Filtrar carreteras" y "Filtrar provincias", así como el botón de "Borrar filtros" (si hay alguno aplicado).

### Requirement: Persistencia de Selección
La selección de filtros DEBE persistir tras cerrar el modal y actualizar la lista de cámaras.

#### Scenario: Aplicación de Filtros
- **WHEN** el usuario selecciona una carretera en el modal y lo cierra.
- **THEN** la lista de cámaras en `WebcamsListScreen` debe mostrar solo las de esa carretera.

</spec>
