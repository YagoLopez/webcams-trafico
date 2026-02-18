export interface WebcamData {
  id: string;
  imageUrl: string;
  road: string;      // e.g., "A-6"
  kilometer: string; // e.g., "Pk 12.5"
  location: string;  // e.g., "Madrid, Moncloa"
  status: 'active' | 'offline';
}
