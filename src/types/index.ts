export type SeatStatus = 'available' | 'reserved' | 'sold' | 'held';

export type Seat = {
  id: string;
  col: number;
  x: number;
  y: number;
  priceTier: number;
  status: SeatStatus;
};

export type Row = {
  index: number;
  seats: Seat[];
};

export type Section = {
  id: string;
  label: string;
  transform: {
    x: number;
    y: number;
    scale: number;
    rotation?: number;
  };
  rows: Row[];
};

export type VenueMap = {
  width: number;
  height: number;
};

export type Venue = {
  venueId: string;
  name: string;
  map: VenueMap;
  sections: Section[];
};

export type SectionBounds = {
  x: number;
  y: number;
  width: number;
  height: number;
  section: Section;
};

export type AbsoluteSeat = Seat & {
  absX: number;
  absY: number;
  sectionLabel: string;
  row: Row; // Reference to original row for selection logic
  scale: number;
};

export type SpatialGrid = {
  cells: Map<string, AbsoluteSeat[]>;
  cellSize: number;
  width: number;
  height: number;
};
