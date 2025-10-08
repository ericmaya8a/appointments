import { Suspense } from 'react';

import { WeekAppointments } from '@/features/appointments/components/week-appointments';
import { WeekAppointmentsSkeleton } from '@/features/appointments/components/week-appointments-skeleton';

export default function Home() {
  return (
    <>
      <h1 className="mb-4 text-2xl">Appointments</h1>
      <Suspense fallback={<WeekAppointmentsSkeleton />}>
        <WeekAppointments />
      </Suspense>
    </>
  );
}
