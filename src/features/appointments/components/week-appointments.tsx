import { BanIcon } from 'lucide-react';
import Link from 'next/link';

import { getThisWeekAppointments } from '@/backend/queries/appointments';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/shadcn/empty';
import { Item, ItemContent, ItemDescription, ItemHeader, ItemTitle } from '@/components/shadcn/item';

export async function WeekAppointments() {
  const appointments = await getThisWeekAppointments();

  if (appointments.length > 0)
    return (
      <div className="flex flex-col gap-4">
        {appointments.map(({ date, description, id, name }) => (
          <Item key={id} variant="outline" asChild>
            <Link href={`/appointment/${id}`}>
              <ItemHeader>{date}</ItemHeader>
              <ItemContent>
                <ItemTitle>{name}</ItemTitle>
                <ItemDescription>{description}</ItemDescription>
              </ItemContent>
            </Link>
          </Item>
        ))}
      </div>
    );

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
