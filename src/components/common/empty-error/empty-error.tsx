import { ShieldXIcon } from 'lucide-react';

import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/shadcn/empty';

export function EmptyError({ error }: { error: string }) {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ShieldXIcon />
        </EmptyMedia>
        <EmptyTitle>Error</EmptyTitle>
        <EmptyDescription>{error}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
