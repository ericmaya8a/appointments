import 'server-only';
import { format, nextDay } from 'date-fns';

import { getAppointmentsByDate } from '@/dal/appointment';

export async function getThisWeekAppointments() {
  const today = new Date();
  const nextMonday = nextDay(today, 1);
  const appointments = await getAppointmentsByDate(today, nextMonday);
  return appointments.map(({ id, date, description, Patient }) => ({
    id,
    date: format(date, 'dd MMM yyyy HH:mm'),
    description,
    name: `${Patient?.firstName} ${Patient?.lastName}`,
  }));
}
