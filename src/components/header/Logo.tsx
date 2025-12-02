import Image from 'next/image';

import { Skeleton } from '@/shadcn/components/ui/skeleton';
import { cn } from '@/shadcn/lib/utils';
import useAppStore from '@/stores/useAppStore';

const Logo = ({ className }: { className?: string }) => {
  const { venue } = useAppStore();

  return (
    <div className={cn('flex lg:flex-col items-center', className)}>
      <div className="w-16 h-16 lg:w-20 lg:h-20 p-4 bg-primary rounded-full shadow-md drop-shadow-lg">
        <Image
          className="w-full h-full"
          src="/images/logo.png"
          alt="Seat Select Logo"
          width={100}
          height={100}
        />
      </div>
      {venue ? (
        <span className="text-sm lg:text-xl font-bold">{venue.name}</span>
      ) : (
        <Skeleton className="h-7 w-32" />
      )}
    </div>
  );
};

export default Logo;
