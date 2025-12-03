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

type ViewportBounds = {
  scrollLeft: number;
  scrollTop: number;
  clientWidth: number;
  clientHeight: number;
};

type AppActions = {
  setVenue: (venue: Venue | undefined) => void;
  setSectionBounds: (bounds: SectionBounds[]) => void;
  updateVisibleSections: (viewport: ViewportBounds) => void;
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
    updateVisibleSections: (viewport: ViewportBounds) =>
      set(state => {
        const BUFFER = 300;
        const { scrollLeft, scrollTop, clientWidth, clientHeight } = viewport;
        const visibleLeft = scrollLeft - BUFFER;
        const visibleTop = scrollTop - BUFFER;
        const visibleRight = scrollLeft + clientWidth + BUFFER;
        const visibleBottom = scrollTop + clientHeight + BUFFER;

        const newVisibleSections: Section[] = [];
        for (let i = 0; i < state.sectionBounds.length; i++) {
          const b = state.sectionBounds[i];
          if (
            b.x < visibleRight &&
            b.x + b.width > visibleLeft &&
            b.y < visibleBottom &&
            b.y + b.height > visibleTop
          ) {
            newVisibleSections.push(b.section);
          }
        }

        // Optimization: Check if sections actually changed
        const current = state.visibleSections;
        if (current.length === newVisibleSections.length) {
          let equal = true;
          for (let i = 0; i < current.length; i++) {
            if (current[i].id !== newVisibleSections[i].id) {
              equal = false;
              break;
            }
          }
          if (equal) return state;
        }

        return { visibleSections: newVisibleSections };
      }),
    setSelectedSeat: (seat: SelectedSeatInfo | null) => set(() => ({ selectedSeat: seat })),
  }),
);

export default useAppStore;
