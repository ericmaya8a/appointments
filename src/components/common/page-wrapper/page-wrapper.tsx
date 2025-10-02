import { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

export function PageWrapper({ children, className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={cn(`h-[calc(100dvh-68px)] ${className}`)} {...props}>
      {children}
    </div>
  );
}
