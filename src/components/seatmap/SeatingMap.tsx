import React, { ReactElement } from 'react';

import { Armchair } from 'lucide-react';

import { SEAT_CLASSES } from '@/components/seatmap/colors';
import MapSection from '@/components/seatmap/MapSection';
import BookingSummary from '@/components/summary/BookingSummary';
import SelectedSeatSummary from '@/components/summary/SelectedSeatSummary';
import { Badge } from '@/shadcn/components/ui/badge';
import { cn } from '@/shadcn/lib/utils';
import useAppStore from '@/stores/useAppStore';
import { Section } from '@/types';

function SeatingMap(): ReactElement {
  const venue = useAppStore(state => state.venue);

  if (!venue) return <></>;

  return (
    <div className="p-4 pt-10 lg:pt-20 flex flex-col items-center">
      <div className="w-full md:max-w-[1000px] flex flex-col gap-4 relative">
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-bold">Seating Map</span>
          <div className="flex items-center flex-wrap gap-2">
            {Object.entries(SEAT_CLASSES).map(([status, className]) => (
              <Badge key={status} className={cn(className, 'font-bold')} variant="outline">
                <Armchair size={24} className={className} stroke="currentColor" />
                {status.toUpperCase()}
              </Badge>
            ))}
            <Badge className="text-primary" variant="outline">
              <Armchair size={24} className="text-primary" stroke="currentColor" />
              SELECTED
            </Badge>
          </div>
        </div>
        <div className="w-full lg:h-80 flex flex-col lg:flex-row gap-2">
          <SelectedSeatSummary />
          <BookingSummary />
        </div>
        <div className="w-full overflow-auto border shadow-xl drop-shadow-xl rounded-md">
          <svg
            zoomAndPan="magnify"
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
