import React, { ReactElement } from 'react';

import Seat from '@/components/seatmap/Seat';
import { Row, Seat as SeatType } from '@/types';

function SectionRow({ row, sectionLabel }: { row: Row; sectionLabel: string }): ReactElement {
  return (
    <g>
      {row.seats.map((seat: SeatType) => (
        <Seat key={seat.id} seat={seat} row={row} sectionLabel={sectionLabel} />
      ))}
    </g>
  );
}

export default SectionRow;
