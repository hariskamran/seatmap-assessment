import { useEffect } from 'react';

import useSWR, { SWRResponse } from 'swr';

import { buildSpatialIndex } from '@/lib/optimizations';
import useAppStore from '@/stores/useAppStore';
import { Venue } from '@/types';

/**
 * Custom hook to access venue data.
 *
 * @return {VenueHook} An object containing the venue data, loading status, error, and mutate function.
 */

type VenueHook = { venue: Venue | undefined } & SWRResponse;

function useVenue(): VenueHook {
  const swrResponse: SWRResponse<Venue> = useSWR('/venue.json');

  const { data } = swrResponse;

  const { setVenue, setSpatialGrid } = useAppStore();

  useEffect(() => {
    if (data) {
      setVenue(data);
      setSpatialGrid(buildSpatialIndex(data.sections, data.map.width, data.map.height));
    }
  }, [data, setVenue, setSpatialGrid]);

  return {
    venue: data,
    ...swrResponse,
  };
}

export default useVenue;
