'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn/select';
import { Skeleton } from '@/components/shadcn/skeleton';
import { themeMapping } from '@/theme';

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  const handleOnchange = (value: string) => setTheme(value);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isClient)
    return (
      <Select value={theme} onValueChange={handleOnchange}>
        <SelectTrigger className="w-[180px]" aria-label="theme selector">
          <SelectValue placeholder="Select a theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Themes</SelectLabel>
            {Object.entries(themeMapping).map(([key, value]) => (
              <SelectItem key={key} value={key}>
                {value}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );

  return <Skeleton className="h-9 w-[180px] rounded-lg" />;
}
