## ADDED Requirements

### Requirement: Drawer Layout Structure
The system SHALL organize top-level navigation using a side drawer menu instead of bottom tabs.

#### Scenario: Open side drawer
- **WHEN** the user taps the hamburger menu icon in the top header layer 
- **THEN** the side drawer menu slides into view from the left edge over a semi-transparent backdrop

### Requirement: Drawer Menu Actions
The system SHALL provide specific actions within the drawer menu.

#### Scenario: Navigate to map view
- **WHEN** the user taps "Explorar" in the open drawer menu
- **THEN** the drawer menu closes and the application navigates to the Explore screen

#### Scenario: Trigger Filter Modal 
- **WHEN** the user taps "Filtrar Cámaras" within the open drawer menu
- **THEN** the drawer menu closes and the application presents the Filters Modal over the current view
