# Diagrama de Entidad Cámara (DGT XML DATEX II)

A continuación, se presenta un diagrama de clase basado en la estructura de datos que proviene de la fuente de tráfico de la DGT (DATEX II v3.6) para las cámaras.

Este modelo refleja los atributos disponibles en el XML (nodo `ns2:device`) y cómo los mapeamos conceptualmente.

```mermaid
classDiagram
    class DevicePublication {
        +DateTime publicationTime
        +String informationStatus
        +List~CameraDevice~ devices
    }

    class CameraDevice {
        +String id
        +String version
        +String typeOfDevice "camera"
        +DateTime lastUpdateOfDeviceInformation
        +String deviceUrl
    }

    class PointLocation {
        +String tpegDirection
        +String tpegSimplePointLocationType
    }

    class RoadInformation {
        +String roadName
        +String roadDestination
    }

    class PointCoordinates {
        +Float latitude
        +Float longitude
    }

    class TpegNonJunctionPointExtension {
        +Float kilometerPoint
        +String province
    }

    class TpegSimplePointExtension {
        +String tpegDirectionRoad
    }

    DevicePublication "1" *-- "many" CameraDevice : contains
    CameraDevice "1" *-- "1" RoadInformation : supplementaryPositionalDescription
    CameraDevice "1" *-- "1" PointLocation : tpegPointLocation
    PointLocation "1" *-- "1" PointCoordinates : point
    PointLocation "1" *-- "1" TpegNonJunctionPointExtension : extendedTpegNonJunctionPoint
    PointLocation "1" *-- "1" TpegSimplePointExtension : extendedTpegSimplePoint

    note for CameraDevice "Atributos extraídos en scripts/fetch-webcams.ts:\n- id\n- deviceUrl (imageUrl)"
    note for RoadInformation "- roadName (road)\n- roadDestination"
    note for PointCoordinates "- latitude\n- longitude"
    note for TpegNonJunctionPointExtension "- kilometerPoint (kilometer)\n- province (location)"
```

## Mapeo al tipo de la aplicación ([WebcamData](file:///c:/Users/Yago/WebstormProjects/expo-android-project-3/scripts/fetch-webcams.ts#7-17) / [Cam](file:///c:/Users/Yago/WebstormProjects/expo-android-project-3/types/cam.ts#1-13))

A partir de toda esta información del árbol XML, la aplicación extrae un modelo simplificado y plano:

```mermaid
classDiagram
    class WebcamData {
        +String id
        +String imageUrl
        +String road
        +String kilometer
        +String location
        +Float latitude
        +Float longitude
        +String status
    }
    
    note for WebcamData "Modelo de dominio resultante (JSON/TS)"
```
