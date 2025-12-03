import { PRICE_TIERS } from '@/config/pricing';
import useAppStore from '@/stores/useAppStore';
import useSeatStore from '@/stores/useSeatStore';
import { Row, Seat, Section } from '@/types';

export const useBookingSummary = () => {
  const venue = useAppStore(state => state.venue);
  const selectedSeatsMap = useSeatStore(state => state.selectedSeats);

  const selectedSeatsList = (() => {
    if (!venue) return [];
    const selectedIds = Object.keys(selectedSeatsMap);
    if (selectedIds.length === 0) return [];

    const selectedIdsSet = new Set(selectedIds);
    const found: { seat: Seat; row: Row; section: Section }[] = [];

    // Iterate to find seat details for selected IDs
    for (const section of venue.sections) {
      for (const row of section.rows) {
        for (const seat of row.seats) {
          if (selectedIdsSet.has(seat.id)) {
            found.push({ seat, row, section });
          }
        }
      }
    }
    return found;
  })();

  const subtotal = selectedSeatsList.reduce(
    (sum, item) => sum + (PRICE_TIERS[item.seat.priceTier] || 0),
    0,
  );

  return {
    selectedSeatsList,
    subtotal,
  };
};
