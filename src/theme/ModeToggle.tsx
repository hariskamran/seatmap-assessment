'use client';

import * as React from 'react';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/shadcn/components/ui/button';
import { ButtonGroup } from '@/shadcn/components/ui/button-group';

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <ButtonGroup aria-label="Theme toggle">
        <Button variant="outline" size="icon" aria-label="Light mode">
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        </Button>
        <Button variant="outline" size="icon" aria-label="System mode">
          <Monitor className="h-[1.2rem] w-[1.2rem]" />
        </Button>
        <Button variant="outline" size="icon" aria-label="Dark mode">
          <Moon className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </ButtonGroup>
    );
  }

  return (
    <ButtonGroup aria-label="Theme toggle">
      <Button
        variant={theme === 'light' ? 'default' : 'outline'}
        size="icon"
        onClick={() => setTheme('light')}
        aria-label="Light mode"
        aria-pressed={theme === 'light'}
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </Button>
      <Button
        variant={theme === 'system' ? 'default' : 'outline'}
        size="icon"
        onClick={() => setTheme('system')}
        aria-label="System mode"
        aria-pressed={theme === 'system'}
      >
        <Monitor className="h-[1.2rem] w-[1.2rem]" />
      </Button>
      <Button
        variant={theme === 'dark' ? 'default' : 'outline'}
        size="icon"
        onClick={() => setTheme('dark')}
        aria-label="Dark mode"
        aria-pressed={theme === 'dark'}
      >
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    </ButtonGroup>
  );
}
