import { Prisma } from '@/generated/prisma';
import prisma from '@/lib/prisma';

export async function getAppointmentsByDate(startDate: Date, endDate: Date) {
  return await prisma.appointment.findMany({
    orderBy: {
      date: 'desc',
    },
    include: {
      Patient: { select: { firstName: true, lastName: true } },
    },
    where: {
      AND: [{ date: { gte: startDate } }, { date: { lte: endDate } }],
    },
  });
}

export async function findAppointmentById(appointmentId: number) {
  return await prisma.appointment.findUnique({
    where: { id: appointmentId },
    include: {
      Patient: { select: { allergies: true, firstName: true, lastName: true, notes: true } },
      prescriptions: true,
    },
  });
}

export async function createAppointment(data: Prisma.AppointmentCreateInput) {
  return await prisma.appointment.create({ data });
}

export async function updateAppointment(appointmentId: number, data: Prisma.AppointmentUpdateInput) {
  return await prisma.appointment.update({ where: { id: appointmentId }, data });
}

export async function deleteAppointment(appointmentId: number) {
  return await prisma.appointment.delete({ where: { id: appointmentId } });
}
