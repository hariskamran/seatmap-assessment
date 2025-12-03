import { useEffect } from 'react';

import useSWR, { SWRResponse } from 'swr';

import { getSectionsBounds } from '@/lib/optimizations';
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

  const { setVenue, setSectionBounds } = useAppStore();

  useEffect(() => {
    if (data) {
      setVenue(data);
      setSectionBounds(getSectionsBounds(data.sections));
    }
  }, [data, setVenue, setSectionBounds]);

  return {
    venue: data,
    ...swrResponse,
  };
}

export default useVenue;
