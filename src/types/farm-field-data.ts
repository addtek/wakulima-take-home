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
export type GeoShape = {
  farmId: number;
  id: number;
  parcelId: string;
  surfaceArea: number;
  wkt: string;
};

export type FarmData = {
  id: number;
  userId: number;
  userType: string;
  label: string;
  size: number;
  sizeUnit: string;
  ownerId: number;
  ownerType: string;
  geoShapes: null | GeoShape[];
  uuid: string;
  offline?: boolean;
};

export type FarmHarvestRecord = {
  year: string;
  season: string;
  crop: string;
  quantity: number;
  unit: string;
  createdAt: string;
};
