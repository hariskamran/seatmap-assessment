import { create, StoreApi, UseBoundStore } from 'zustand';

type SeatState = {
  selectedSeats: Record<string, boolean>;
};

type SeatActions = {
  toggleSeat: (seatId: string) => void;
  clearSelection: () => void;
};

const defaultState: SeatState = {
  selectedSeats: {},
};

const useSeatStore: UseBoundStore<StoreApi<SeatState & SeatActions>> = create<
  SeatState & SeatActions
>(set => ({
  ...defaultState,
  toggleSeat: seatId =>
    set(state => {
      const newSelectedSeats = { ...state.selectedSeats };
      if (newSelectedSeats[seatId]) {
        delete newSelectedSeats[seatId];
      } else {
        // Limit to 8 seats
        if (Object.keys(newSelectedSeats).length < 8) {
          newSelectedSeats[seatId] = true;
        }
      }
      return { selectedSeats: newSelectedSeats };
    }),
  clearSelection: () => set({ ...defaultState }),
}));

export default useSeatStore;
