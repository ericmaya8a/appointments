import { getThisWeekAppointments } from '@/backend/queries/appointments';
import { EmptyError } from '@/components/common';

import { AppointmentItem } from './appointment-item';
import { NoAppointments } from './no-appointments';

export async function WeekAppointments() {
  const result = await getThisWeekAppointments();

  if (!result.success) return <EmptyError error={result.error} />;

  if (result.data.length > 0)
    return (
      <div className="flex flex-col gap-4">
        {result.data.map((item) => (
          <AppointmentItem key={item.id} item={item} />
        ))}
      </div>
    );

  return <NoAppointments />;
}
