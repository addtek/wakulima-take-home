export type FarmFieldData = {
  id: string;
  label: string;
  size: string;
  synced: boolean;
  goeCoordinates: GEOCoordinate[];
  createdAt: string;
};

export type GEOCoordinate = {
  latitude: number;
  longitude: number;
};

export type FarmHarvestRecord = {
  year: string;
  season: string;
  crop: string;
  quantity: number;
  unit: string;
  createdAt: string;
};
