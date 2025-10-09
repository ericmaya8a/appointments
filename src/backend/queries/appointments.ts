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
  const today = new Date();
  const nextMonday = nextDay(today, 1);
  const [appointments, error] = await tryCatch(getAppointmentsByDate(today, nextMonday));

  if (error)
    return {
      success: false,
      error: error.message,
    };

  return {
    success: true,
    data: appointments.map(({ id, date, description, Patient }) => ({
      id,
      date: format(date, 'dd MMM yyyy HH:mm'),
      description,
      name: `${Patient?.firstName} ${Patient?.lastName}`,
    })),
  };
}
