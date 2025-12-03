import React, { ReactElement } from 'react';

import { Section } from '@/types';

function MapSection({ section }: { section: Section }): ReactElement {
  const { transform, label } = section;

  return (
    <g transform={`translate(${transform.x}, ${transform.y}) scale(${transform.scale})`}>
      <text x={30} y={20} className="fill-foreground text-xl font-bold">
        {label}
      </text>
    </g>
  );
}

export default MapSection;
