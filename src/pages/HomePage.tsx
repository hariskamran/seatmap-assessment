'use client';

import React, { ReactElement } from 'react';

import { TriangleAlert } from 'lucide-react';
import { motion } from 'motion/react';

import Header from '@/components/header/Header';
import SeatingMap from '@/components/seatmap/SeatingMap';
import HomePageSkeleton from '@/components/skeleton/HomePageSkeleton';
import useVenue from '@/hooks/useVenue';
import { Alert, AlertDescription, AlertTitle } from '@/shadcn/components/ui/alert';

function HomePage(): ReactElement {
  const { isLoading, error } = useVenue();

  if (error) {
    return (
      <div className="p-4 flex justify-center pt-20">
        <Alert variant="destructive" className="max-w-md">
          <TriangleAlert className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to load venue data. Please try again later.</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading) return <HomePageSkeleton />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col"
    >
      <Header />
      <SeatingMap />
    </motion.div>
  );
}

export default HomePage;
