'use client';

import React, { ReactElement } from 'react';

import Header from '@/components/header/Header';
import SeatingMap from '@/components/seatmap/SeatingMap';
import useVenue from '@/hooks/useVenue';

function HomePage(): ReactElement {
  const { isLoading, error } = useVenue();

  if (error) return <div>Failed to load venue</div>;
  if (isLoading) return <div>Loading Map...</div>;

  return (
    <div className="flex flex-col">
      <Header />
      <SeatingMap />
    </div>
  );
}

export default HomePage;
