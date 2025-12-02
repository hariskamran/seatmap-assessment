import Link from 'next/link';

import Logo from '@/components/header/Logo';
import { ModeToggle } from '@/theme/ModeToggle';

const Navbar = () => {
  return (
    <header className="bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-7 sm:px-6">
        <div className="flex flex-1 items-center font-medium md:justify-center lg:gap-16">
          <Link href="/">
            <Logo className="text-foreground gap-2" />
          </Link>
        </div>

        <div className="flex items-center gap-6 z-50">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
