import { Cam } from '@/architecture/domain/entities/Cam';

export const roadDirections: Record<string, { start: string; end: string }> = {
  // Autovías/Autopistas Nacionales
  "A-1": {
    start: "Madrid",
    end: "Burgos / Norte"
  },
  "A-2": {
    start: "Madrid",
    end: "Zaragoza / Barcelona"
  },
  "A-3": {
    start: "Madrid",
    end: "Valencia"
  },
  "A-4": {
    start: "Madrid",
    end: "Cádiz / Sevilla"
  },
  "A-5": {
    start: "Madrid",
    end: "Badajoz / Portugal"
  },
  "A-6": {
    start: "Madrid",
    end: "A Coruña"
  },
  "A-8": {
    start: "Francia / Bilbao / Santander",
    end: "Luarca / Galicia"
  },
  "A-52": {
    start: "Benavente (Zamora)",
    end: "Ourense / Vigo"
  },
  "A-63": {
    start: "Oviedo",
    end: "Grado / La Espina"
  },
  "A-64": {
    start: "Oviedo",
    end: "Villaviciosa / Santander"
  },
  "A-66": {
    start: "Gijón / Avilés",
    end: "Oviedo / León / Sevilla"
  },
  "A-67": {
    start: "Santander",
    end: "Palencia / Madrid"
  },
  "AP-7": {
    start: "Francia / Barcelona",
    end: "Alicante / Sur"
  },
  "AP-66": {
    start: "Asturias / Campomanes",
    end: "León / Madrid"
  },
  
  // Carreteras Autonómicas y Accesos (Asturias y entorno)
  "AS-I": {
    start: "Gijón",
    end: "Mieres / León"
  },
  "AS-II": {
    start: "Gijón",
    end: "Oviedo"
  },
  "AS-17": {
    start: "Avilés",
    end: "Riaño / Langreo"
  },
  "GJ-10": {
    start: "Gijón (Puerto)",
    end: "Gijón (Ronda)"
  },
  "AI-81": {
    start: "Avilés (Centro)",
    end: "Gijón / Oviedo"
  }
};

export function getButtonLabel(cam: Cam | null | undefined, directionType: 'start' | 'end', roadName: string): string {
  if (!cam) return '';

  const dictionaryData = roadDirections[roadName];

  if (dictionaryData) {
    return `Sig. cámara dir. ${dictionaryData[directionType]}`;
  }

  // Fallback: Intentar usar el roadDestination del JSON si existe y es razonable
  if (cam.roadDestination && cam.roadDestination.trim() !== "" && cam.roadDestination.length > 2) {
    return `Sig. cámara dir. ${cam.roadDestination}`;
  }

  // Fallback final: Texto genérico basado en el kilometraje
  return directionType === 'start'
    ? "Sig. cámara (PK Decreciente)"
    : "Sig. cámara (PK Creciente)";
}
