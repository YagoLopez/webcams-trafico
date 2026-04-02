import { Cam } from '@/architecture/domain/entities/Cam';

export const roadDirections: Record<string, { start: string; end: string }> = {
  "AP-66": {
    start: "Asturias",
    end: "León / Madrid"
  },
  "AP-7": {
    start: "Francia / Barcelona",
    end: "Alicante / Sur"
  },
  "A-6": {
    start: "Madrid",
    end: "A Coruña"
  },
  "A-66": {
    start: "Gijón / Asturias",
    end: "Oviedo / León / Sevilla"
  },
  "A-8": {
    start: "Irún / Bilbao",
    end: "Galicia"
  },
  "A-4": {
    start: "Madrid",
    end: "Cádiz / Sevilla"
  },
  "A-3": {
    start: "Madrid",
    end: "Valencia"
  },
  "A-5": {
    start: "Madrid",
    end: "Badajoz / Portugal"
  },
  "A-2": {
    start: "Madrid",
    end: "Zaragoza / Barcelona"
  },
  "A-1": {
    start: "Madrid",
    end: "Burgos / Norte"
  }
};

export function getButtonLabel(cam: Cam | null | undefined, directionType: 'start' | 'end', roadName: string): string {
  if (!cam) return '';

  const dictionaryData = roadDirections[roadName];

  if (dictionaryData) {
    return `Sig. cámara dir. ${dictionaryData[directionType]}`;
  }

  if (cam.roadDestination && cam.roadDestination.trim() !== '') {
    return `Sig. cámara dir. ${cam.roadDestination}`;
  }

  return directionType === 'start'
    ? "Sig. cámara (PK Decreciente)"
    : "Sig. cámara (PK Creciente)";
}
