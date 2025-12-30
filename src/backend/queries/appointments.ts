import 'server-only';
import { format, nextDay } from 'date-fns';
import { cacheLife } from 'next/cache';

import { findAppointmentById, getAppointmentsByDate } from '@/lib/db/appointment';
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
  'use cache';
  cacheLife({
    stale: 3600,
    revalidate: 900,
    expire: 86400,
  });

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours());
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
      const date = `${format(from, 'dd MMM yyyy HH:mm')} - ${format(to, 'HH:mm')}`;
      return {
        id,
        date,
        description,
        name: `${Patient?.firstName} ${Patient?.lastName}`,
      };
    }),
  };
}

export async function getAppointmentById(appointmentId: string): Action<{
  appointmentData: {
    date: string;
    description?: string;
    symptoms?: string | null;
    diagnosis?: string | null;
  };
  patientData: {
    name: string;
    allergies?: string | null;
    notes?: string | null;
  };
  prescriptions?: {
    id: string;
    content: string;
    appointmentId: number | null;
  }[];
}> {
  const [appointment, error] = await tryCatch(findAppointmentById(Number(appointmentId)));

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  const appointmentData = {
    date: `${format(appointment!.from, 'dd MMM yyyy HH:mm')} - ${format(appointment!.to, 'HH:mm')}`,
    description: appointment?.description,
    symptoms: appointment?.symptoms,
    diagnosis: appointment?.diagnosis,
  };
  const patientData = {
    name: `${appointment?.Patient?.firstName} ${appointment?.Patient?.lastName}`,
    allergies: appointment?.Patient?.allergies,
    notes: appointment?.Patient?.notes,
  };
  const prescriptions = appointment?.prescriptions;
  const data = { appointmentData, patientData, prescriptions };

  return {
    success: true,
    data,
  };
}
