import { create, StoreApi, UseBoundStore } from 'zustand';

import { Venue } from '@/types';

type AppState = {
  venue: Venue | undefined;
};

type AppActions = {
  setVenue: (venue: Venue | undefined) => void;
};

const defaultState: AppState = {
  venue: undefined,
};

const useAppStore: UseBoundStore<StoreApi<AppState & AppActions>> = create<AppState & AppActions>(
  set => ({
    ...defaultState,
    setVenue: (venue: Venue | undefined) => set(() => ({ venue })),
  }),
);

export default useAppStore;
