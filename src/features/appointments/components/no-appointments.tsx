import { BanIcon } from 'lucide-react';

import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/shadcn/empty';

export function NoAppointments() {
  return (
    <Empty className="from-muted/50 to-background h-full bg-gradient-to-b from-30%">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <BanIcon />
        </EmptyMedia>
        <EmptyTitle>No appointments this week</EmptyTitle>
      </EmptyHeader>
    </Empty>
  );
}
