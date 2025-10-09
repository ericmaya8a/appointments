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
