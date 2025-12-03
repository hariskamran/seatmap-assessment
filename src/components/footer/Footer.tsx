import React, { ReactElement } from 'react';

import Link from 'next/link';

import { cn } from '@/shadcn/lib/utils';

function Footer({ className }: { className?: string }): ReactElement {
  return (
    <footer className={cn('border-t bg-background', className)}>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Haris Kamran. All rights reserved.
        </p>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <span>Created By</span>
          <Link
            className="font-medium text-primary underline-offset-4 hover:underline"
            href="https://hariskamran.dev"
            target="_blank"
            rel="noreferrer"
          >
            Haris Kamran aka. Arrow
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
