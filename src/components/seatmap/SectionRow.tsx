import React, { ReactElement } from 'react';

import { Armchair } from 'lucide-react';

import { SEAT_CLASSES } from '@/components/seatmap/colors';
import { Row, Seat } from '@/types';

function SectionRow({ row }: { row: Row }): ReactElement {
  return (
    <g>
      {row.seats.map((seat: Seat) => (
        <Armchair
          key={seat.id}
          size={30}
          href="#seat-icon"
          transform={`translate(${seat.x}, ${seat.y})`}
          stroke="currentColor"
          className={`${SEAT_CLASSES[seat.status]} transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm`}
          tabIndex={seat.status === 'available' ? 0 : -1}
          role="button"
          aria-label={`${seat.status} seat ${seat.id}`}
        />
      ))}
    </g>
  );
}

export default SectionRow;
