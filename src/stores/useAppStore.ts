import { create, StoreApi, UseBoundStore } from 'zustand';

import { Row, Seat, Venue } from '@/types';

type SelectedSeatInfo = {
  seat: Seat;
  sectionLabel: string;
  row: Row;
};

type AppState = {
  venue: Venue | undefined;
  selectedSeat: SelectedSeatInfo | null;
};

type AppActions = {
  setVenue: (venue: Venue | undefined) => void;
  setSelectedSeat: (seat: SelectedSeatInfo | null) => void;
};

const defaultState: AppState = {
  venue: undefined,
  selectedSeat: null,
};

const useAppStore: UseBoundStore<StoreApi<AppState & AppActions>> = create<AppState & AppActions>(
  set => ({
    ...defaultState,
    setVenue: (venue: Venue | undefined) => set(() => ({ venue })),
    setSelectedSeat: (seat: SelectedSeatInfo | null) => set(() => ({ selectedSeat: seat })),
  }),
);

export default useAppStore;
