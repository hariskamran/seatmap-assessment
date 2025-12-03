import { create, StoreApi, UseBoundStore } from 'zustand';

import { Row, Seat, Section, SectionBounds, Venue } from '@/types';

type SelectedSeatInfo = {
  seat: Seat;
  sectionLabel: string;
  row: Row;
};

type AppState = {
  venue: Venue | undefined;
  selectedSeat: SelectedSeatInfo | null;
  visibleSections: Section[];
  sectionBounds: SectionBounds[];
};

type AppActions = {
  setVenue: (venue: Venue | undefined) => void;
  setSectionBounds: (bounds: SectionBounds[]) => void;
  setVisibleSections: (sections: Section[]) => void;
  setSelectedSeat: (seat: SelectedSeatInfo | null) => void;
};

const defaultState: AppState = {
  venue: undefined,
  selectedSeat: null,
  visibleSections: [],
  sectionBounds: [],
};

const useAppStore: UseBoundStore<StoreApi<AppState & AppActions>> = create<AppState & AppActions>(
  set => ({
    ...defaultState,
    setVenue: (venue: Venue | undefined) => set(() => ({ venue })),
    setSectionBounds: (bounds: SectionBounds[]) => set(() => ({ sectionBounds: bounds })),
    setVisibleSections: (sections: Section[]) => set(() => ({ visibleSections: sections })),
    setSelectedSeat: (seat: SelectedSeatInfo | null) => set(() => ({ selectedSeat: seat })),
  }),
);

export default useAppStore;
