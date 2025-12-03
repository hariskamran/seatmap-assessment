import React, { ReactElement } from 'react';

import { PRICE_TIERS } from '@/config/pricing';
import { useBookingSummary } from '@/hooks/useBookingSummary';
import { Separator } from '@/shadcn/components/ui/separator';

function BookingSummary(): ReactElement {
  const { selectedSeatsList, subtotal } = useBookingSummary();

  return (
    <div className="flex-2 w-full h-full border p-4 rounded-md bg-card text-card-foreground shadow-xl drop-shadow-xl flex flex-col">
      <div className="space-y-1 mb-4">
        <h3 className="font-semibold text-lg leading-none tracking-tight">Booking Summary</h3>
        <p className="text-sm text-muted-foreground">Review your selected seats</p>
      </div>

      <div className="flex-1 flex-row items-center gap-4 overflow-y-auto space-y-3 min-h-0 pr-2">
        {selectedSeatsList.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-sm italic">
            <span>No seats selected</span>
            <span className="text-xs opacity-70">Select up to 8 seats</span>
          </div>
        ) : (
          selectedSeatsList.map(({ seat, row, section }) => (
            <div key={seat.id} className="flex justify-between items-start text-sm group">
              <div className="flex flex-col">
                <span className="font-medium group-hover:text-primary transition-colors">
                  {section.label}
                </span>
                <span className="text-muted-foreground text-xs">
                  Row {row.index + 1} · Seat {seat.col + 1}
                </span>
              </div>
              <span className="font-medium tabular-nums">${PRICE_TIERS[seat.priceTier]}</span>
            </div>
          ))
        )}
      </div>

      <Separator className="my-4" />

      <div className="space-y-1">
        <div className="flex justify-between items-center font-bold text-lg">
          <span>Subtotal</span>
          <span className="tabular-nums">${subtotal}</span>
        </div>
        <div className="text-xs text-muted-foreground text-right">
          {selectedSeatsList.length} of 8 seats selected
        </div>
      </div>
    </div>
  );
}

export default BookingSummary;
