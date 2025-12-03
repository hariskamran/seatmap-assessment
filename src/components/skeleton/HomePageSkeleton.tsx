import React, { ReactElement } from 'react';

import { Skeleton } from '@/shadcn/components/ui/skeleton';

function HomePageSkeleton(): ReactElement {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Skeleton */}
      <header className="h-20 bg-background border-b">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-7 sm:px-6">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-10 w-10 rounded-md" />
        </div>
      </header>

      {/* Main Content Skeleton */}
      <div className="p-4 pt-10 lg:pt-20 flex flex-col items-center animate-in fade-in duration-500">
        <div className="w-full md:max-w-[1000px] flex flex-col gap-4 relative">
          {/* Title & Legend */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-48" />
            <div className="flex items-center flex-wrap gap-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-24 rounded-full" />
              ))}
            </div>
          </div>

          {/* Summaries */}
          <div className="w-full lg:h-80 flex flex-col lg:flex-row gap-2">
            <Skeleton className="w-full lg:w-1/2 h-40 lg:h-full rounded-xl" />
            <Skeleton className="w-full lg:w-1/2 h-40 lg:h-full rounded-xl" />
          </div>

          {/* Map */}
          <div className="w-full overflow-hidden rounded-md border shadow-xl">
            <Skeleton className="w-full h-[500px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePageSkeleton;
