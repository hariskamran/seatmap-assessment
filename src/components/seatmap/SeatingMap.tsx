import React, { ReactElement } from 'react';

import { Armchair } from 'lucide-react';

import { SEAT_CLASSES } from '@/components/seatmap/colors';
import MapSection from '@/components/seatmap/MapSection';
import { Badge } from '@/shadcn/components/ui/badge';
import useAppStore from '@/stores/useAppStore';
import { Section } from '@/types';

function SeatingMap(): ReactElement {
  const { venue } = useAppStore();

  if (!venue) return <></>;

  return (
    <div className="p-4 pt-10 lg:pt-20 flex flex-col items-center">
      <div className="w-full md:max-w-[1000px] flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-bold">Seating Map</span>
          <div className="flex items-center flex-wrap gap-2">
            {Object.entries(SEAT_CLASSES).map(([status, className]) => (
              <Badge key={status} className={className} variant="outline">
                <Armchair size={24} className={className} stroke="currentColor" />
                {status.toUpperCase()}
              </Badge>
            ))}
            <Badge className="text-[#004E4B]" variant="outline">
              <Armchair size={24} className="text-[#004E4B]" stroke="currentColor" />
              SELECTED
            </Badge>
          </div>
        </div>
        <div className="w-full overflow-auto border rounded-md">
          <svg
            width={venue.map.width}
            height={venue.map.height}
            viewBox={`0 0 ${venue.map.width} ${venue.map.height}`}
            className="block bg-muted"
          >
            {venue.sections.map((section: Section) => (
              <MapSection key={section.id} section={section} />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}

export default SeatingMap;
