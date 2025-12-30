import { use } from 'react';

import { getAppointmentById } from '@/backend/queries/appointments';
import { EmptyError } from '@/components/common';

interface AppointmentDetailsProps {
  params: Promise<{ appointmentId: string }>;
}

export function AppointmentDetails({ params }: AppointmentDetailsProps) {
  const { appointmentId } = use(params);

  if (isNaN(Number(appointmentId))) return <EmptyError error={`Invalid appointment Id: ${appointmentId}`} />;

  const result = use(getAppointmentById(appointmentId));

  if (!result.success) return <EmptyError error={result.error} />;

  if (result.data)
    return (
      <div>
        <p>Date: {result.data.appointmentData.date}</p>
        <p>Description: {result.data.appointmentData.description}</p>
        <p>Patient: {result.data.patientData.name}</p>
        {result.data.prescriptions && (
          <ul>
            {result.data.prescriptions.map(({ id, content }) => (
              <p key={id}>{content}</p>
            ))}
          </ul>
        )}
      </div>
    );

  return <div>No data</div>;
}
