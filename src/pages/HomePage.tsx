'use client';

import React, { ReactElement } from 'react';

import Header from '@/components/header/Header';
import useVenue from '@/hooks/useVenue';

function HomePage(): ReactElement {
  const { isLoading, error } = useVenue();

  if (error) return <div>Failed to load venue</div>;
  if (isLoading) return <div>Loading Map...</div>;

  return (
    <div className="flex flex-col">
      <Header />

      <div className="h-screen flex-1 relative">
        <div className="p-10">Seat Map Area</div>
      </div>
    </div>
  );
}

export default HomePage;
