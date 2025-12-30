import { Suspense } from 'react';

import { AppointmentDetails } from '@/features/appointment-details/components/appointment-details';

export default function AppointmentDetailPage({ params }: { params: Promise<{ appointmentId: string }> }) {
  return (
    <Suspense fallback={<div className="bg-red-500 p-4 text-white">Loading...</div>}>
      <AppointmentDetails params={params} />
    </Suspense>
  );
}
