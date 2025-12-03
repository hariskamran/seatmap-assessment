import { create, StoreApi, UseBoundStore } from 'zustand';

import { getVisibleSeats } from '@/lib/optimizations';
import { AbsoluteSeat, Row, Seat, SpatialGrid, Venue } from '@/types';

type SelectedSeatInfo = {
  seat: Seat;
  sectionLabel: string;
  row: Row;
};

type AppState = {
  venue: Venue | undefined;
  selectedSeat: SelectedSeatInfo | null;
  spatialGrid: SpatialGrid | null;
  visibleSeats: AbsoluteSeat[];
};

type ViewportBounds = {
  scrollLeft: number;
  scrollTop: number;
  clientWidth: number;
  clientHeight: number;
};

type AppActions = {
  setVenue: (venue: Venue | undefined) => void;
  setSpatialGrid: (grid: SpatialGrid) => void;
  updateVisibility: (viewport: ViewportBounds) => void;
  setSelectedSeat: (seat: SelectedSeatInfo | null) => void;
};

const defaultState: AppState = {
  venue: undefined,
  selectedSeat: null,
  spatialGrid: null,
  visibleSeats: [],
};

const useAppStore: UseBoundStore<StoreApi<AppState & AppActions>> = create<AppState & AppActions>(
  set => ({
    ...defaultState,
    setVenue: (venue: Venue | undefined) => set(() => ({ venue })),
    setSpatialGrid: (grid: SpatialGrid) => set(() => ({ spatialGrid: grid })),
    updateVisibility: (viewport: ViewportBounds) =>
      set(state => {
        const { scrollLeft, scrollTop, clientWidth, clientHeight } = viewport;

        const newVisibleSeats = getVisibleSeats(
          state.spatialGrid,
          scrollLeft,
          scrollTop,
          clientWidth,
          clientHeight,
        );

        return {
          visibleSeats: newVisibleSeats,
        };
      }),
    setSelectedSeat: (seat: SelectedSeatInfo | null) => set(() => ({ selectedSeat: seat })),
  }),
);

export default useAppStore;
