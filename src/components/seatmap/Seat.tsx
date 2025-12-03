import React, { ReactElement } from 'react';

import { Armchair } from 'lucide-react';

import { useSeatSelection } from '@/hooks/useSeatSelection';
import { Row, Seat as SeatType } from '@/types';

interface SeatProps {
  seat: SeatType;
  sectionLabel: string;
  row: Row;
}

function Seat({ seat, sectionLabel, row }: SeatProps): ReactElement {
  const { isSelected, colorClass, isAvailable, handleClick, handleKeyDown } = useSeatSelection(
    seat,
    sectionLabel,
    row,
  );

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
        className="transition-all duration-200 group-focus:stroke-primary group-focus:stroke-2"
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
