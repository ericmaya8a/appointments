import Link from 'next/link';

import { Item, ItemContent, ItemDescription, ItemHeader, ItemTitle } from '@/components/shadcn/item';

interface AppointmentItemProps {
  item: {
    id: number;
    date: string;
    description: string;
    name: string;
  };
}

export function AppointmentItem({ item: { date, description, id, name } }: AppointmentItemProps) {
  return (
    <Item variant="outline" asChild>
      <Link href={`/appointment/${id}`}>
        <ItemHeader>{date}</ItemHeader>
        <ItemContent>
          <ItemTitle>{name}</ItemTitle>
          <ItemDescription>{description}</ItemDescription>
        </ItemContent>
      </Link>
    </Item>
  );
}
