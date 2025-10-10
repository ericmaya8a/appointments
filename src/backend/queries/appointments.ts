import 'server-only';
import { format, nextDay } from 'date-fns';

import { getAppointmentsByDate } from '@/lib/db/appointment';
import { tryCatch } from '@/try-catch';
import { Action } from '@/types/types';

export async function getThisWeekAppointments(): Action<
  {
    id: number;
    date: string;
    description: string;
    name: string;
  }[]
> {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const nextMonday = nextDay(today, 1);
  const [appointments, error] = await tryCatch(getAppointmentsByDate(today, nextMonday));

  if (error)
    return {
      success: false,
      error: error.message,
    };

  return {
    success: true,
    data: appointments.map(({ id, from, to, description, Patient }) => {
      const date = `${format(from, 'dd MMM yyyy')} ${format(from, 'HH:mm')} - ${format(to, 'HH:mm')}`;
      return {
        id,
        date,
        description,
        name: `${Patient?.firstName} ${Patient?.lastName}`,
      };
    }),
  };
}
