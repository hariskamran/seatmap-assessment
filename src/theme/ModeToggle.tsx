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
      <ButtonGroup>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        </Button>
        <Button variant="outline" size="icon">
          <Monitor className="h-[1.2rem] w-[1.2rem]" />
        </Button>
        <Button variant="outline" size="icon">
          <Moon className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </ButtonGroup>
    );
  }

  return (
    <ButtonGroup>
      <Button
        variant={theme === 'light' ? 'default' : 'outline'}
        size="icon"
        onClick={() => setTheme('light')}
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </Button>
      <Button
        variant={theme === 'system' ? 'default' : 'outline'}
        size="icon"
        onClick={() => setTheme('system')}
      >
        <Monitor className="h-[1.2rem] w-[1.2rem]" />
      </Button>
      <Button
        variant={theme === 'dark' ? 'default' : 'outline'}
        size="icon"
        onClick={() => setTheme('dark')}
      >
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    </ButtonGroup>
  );
}
