import React, { ReactElement } from 'react';

import SectionRow from '@/components/seatmap/SectionRow';
import { Row, Section } from '@/types';

function MapSection({ section }: { section: Section }): ReactElement {
  const { transform, label, rows } = section;

  return (
    <g transform={`translate(${transform.x}, ${section.transform.y}) scale(${transform.scale})`}>
      <text x={30} y={20} className="fill-foreground text-xl font-bold">
        {label}
      </text>
      {rows.map((row: Row) => (
        <SectionRow key={`${row.index}-${label}`} row={row} />
      ))}
    </g>
  );
}

export default MapSection;
