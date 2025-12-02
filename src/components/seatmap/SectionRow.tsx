import React, { ReactElement } from 'react';

import Seat from '@/components/seatmap/Seat';
import { Row, Seat as SeatType } from '@/types';

function SectionRow({ row }: { row: Row }): ReactElement {
  return (
    <g>
      {row.seats.map((seat: SeatType) => (
        <Seat key={seat.id} seat={seat} />
      ))}
    </g>
  );
}

export default SectionRow;
