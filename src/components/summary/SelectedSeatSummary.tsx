import React from 'react';

import { PRICE_TIERS } from '@/config/pricing';
import { Separator } from '@/shadcn/components/ui/separator';
import useAppStore from '@/stores/useAppStore';

function SelectedSeatSummary() {
  const selectedSeatInfo = useAppStore(state => state.selectedSeat);

  if (!selectedSeatInfo) {
    return (
      <div className="p-4 text-center text-muted-foreground">Select a seat to view details</div>
    );
  }

  const { seat, sectionLabel, row } = selectedSeatInfo;
  const { id, priceTier, status } = seat;

  const price = PRICE_TIERS[priceTier];
  const statusLabel = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <div className="flex-1 w-full h-full p-4 bg-primary shadow-xl drop-shadow-xl rounded-md dark">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Current Seat details
          </span>
          <div className="text-sm font-semibold">
            {sectionLabel}{' '}
            <span className="font-normal text-xs text-muted-foreground">section</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Row {row.index + 1} · Seat {seat.col + 1}
          </div>
        </div>
        <span className="text-xs font-mono text-secondary-foreground text-right">
          <span className="font-bold">ID:</span> {id}
        </span>
      </div>

      <Separator className="my-2" />

      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div className="space-y-0.5">
          <dt className="text-xs text-muted-foreground">Section</dt>
          <dd className="font-medium">{sectionLabel}</dd>
        </div>
        <div className="space-y-0.5">
          <dt className="text-xs text-muted-foreground">Row</dt>
          <dd className="font-medium">{row.index + 1}</dd>
        </div>
        <div className="space-y-0.5">
          <dt className="text-xs text-muted-foreground">Seat</dt>
          <dd className="font-medium">{seat.col + 1}</dd>
        </div>
        <div className="space-y-0.5">
          <dt className="text-xs text-muted-foreground">Price</dt>
          <dd className="font-medium">
            ${price}
            <span className="ml-1 text-xs text-muted-foreground">(Tier {priceTier})</span>
          </dd>
        </div>
        <div className="space-y-0.5">
          <dt className="text-xs text-muted-foreground">Status</dt>
          <dd className="font-medium">{statusLabel}</dd>
        </div>
      </dl>
    </div>
  );
}

export default SelectedSeatSummary;
