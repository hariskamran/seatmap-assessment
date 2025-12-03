import React from 'react';

import { SEAT_CLASSES } from '@/components/seatmap/colors';
import useAppStore from '@/stores/useAppStore';
import useSeatStore from '@/stores/useSeatStore';
import { Row, Seat } from '@/types';

export const useSeatSelection = (seat: Seat, sectionLabel: string, row: Row) => {
  const { id, status } = seat;

  // Selector ensures this hook only triggers a re-render if THIS seat's status changes
  const isSelected = useSeatStore(state => state.selectedSeats[id]);
  const toggleSeat = useSeatStore(state => state.toggleSeat);
  const setSelectedSeat = useAppStore(state => state.setSelectedSeat);

  const isAvailable = status === 'available';

  // Determine color class: selected takes priority, otherwise use status color
  const colorClass = isSelected ? 'text-primary' : SEAT_CLASSES[status];

  const handleInteraction = () => {
    if (isAvailable) {
      if (!isSelected) {
        const currentCount = Object.keys(useSeatStore.getState().selectedSeats).length;
        if (currentCount >= 8) {
          alert('You can only select up to 8 seats.');
          return;
        }
      }
      toggleSeat(id);
      // Update global-selected seat for summary view
      setSelectedSeat({ seat, sectionLabel, row });
    }
  };

  const handleClick = () => {
    handleInteraction();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isAvailable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      handleInteraction();
    }
  };

  return {
    isSelected,
    colorClass,
    isAvailable,
    handleClick,
    handleKeyDown,
    toggle: () => toggleSeat(id),
  };
};
