import React, { ReactElement } from 'react';

import Link from 'next/link';

import { Ticket } from 'lucide-react';

import useAppStore from '@/stores/useAppStore';
import { ModeToggle } from '@/theme/ModeToggle';

function Header(): ReactElement {
  const name = useAppStore(state => state.venue?.name);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4 justify-between">
        <div className="mr-4 flex">
          <Link href="/public" className="mr-6 flex items-center space-x-2">
            <Ticket className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">Seat Map App</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <h1 className="text-sm font-medium text-muted-foreground hidden md:block">
            {name || 'Loading Venue...'}
          </h1>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header;
