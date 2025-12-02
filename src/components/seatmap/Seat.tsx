import React, { ReactElement } from 'react';

import { Armchair } from 'lucide-react';

import { SEAT_CLASSES } from '@/components/seatmap/colors';
import { useSeatSelection } from '@/hooks/useSeatSelection';
import { Seat as SeatType } from '@/types';

interface SeatProps {
  seat: SeatType;
}

function Seat({ seat }: SeatProps): ReactElement {
  const { isSelected, toggle } = useSeatSelection(seat.id);

  const isAvailable = seat.status === 'available';

  // Determine color class: selected takes priority, otherwise use status color
  const colorClass = isSelected ? 'text-primary' : SEAT_CLASSES[seat.status];

  const handleClick = () => {
    if (isAvailable) {
      toggle();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isAvailable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <g
      transform={`translate(${seat.x}, ${seat.y})`}
      className={`group cursor-pointer focus:outline-none ${colorClass}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={isAvailable ? 0 : -1}
      role="button"
      aria-label={`${seat.status} seat ${seat.id} ${isSelected ? 'selected' : ''}`}
      aria-pressed={isSelected}
    >
      <rect
        width={30}
        height={30}
        x={0}
        y={0}
        rx={2} // Matches rounded-sm
        fill="transparent"
        stroke="none"
        className="transition-all duration-200 group-focus:stroke-[#004E4B] group-focus:stroke-2"
      />

      {/* The Icon */}
      <Armchair
        size={30}
        x={0}
        y={0}
        stroke="currentColor"
        className="pointer-events-none" // Let the group/rect handle events
      />
    </g>
  );
}

export default Seat;
