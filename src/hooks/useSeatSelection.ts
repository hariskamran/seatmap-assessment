import useSeatStore from '@/stores/useSeatStore';

export const useSeatSelection = (seatId: string) => {
  // Selector ensures this hook only triggers a re-render if THIS seat's status changes
  const isSelected = useSeatStore(state => state.selectedSeats[seatId]);
  const toggleSeat = useSeatStore(state => state.toggleSeat);

  return {
    isSelected,
    toggle: () => toggleSeat(seatId),
  };
};
