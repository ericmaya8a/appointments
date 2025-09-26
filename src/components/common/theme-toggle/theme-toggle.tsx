'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { themeMapping } from '@/theme';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme?.includes('dark') || theme?.includes('system');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="cursor-pointer" variant="outline" size="icon">
          <Sun
            className={cn(
              'h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90',
              isDarkMode ? 'scale-0 -rotate-90' : '',
            )}
          />
          <Moon
            className={cn(
              'absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0',
              isDarkMode ? 'scale-100 rotate-0' : '',
            )}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(themeMapping).map(([key, value]) => (
          <DropdownMenuItem key={key} onClick={() => setTheme(key)}>
            {value}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
