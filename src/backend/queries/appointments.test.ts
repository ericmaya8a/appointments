import { findAppointmentById, getAppointmentsByDate } from '@/lib/db/appointment';

import { getAppointmentById, getThisWeekAppointments } from './appointments';

jest.mock('@/lib/db/appointment', () => ({
  getAppointmentsByDate: jest.fn(),
  findAppointmentById: jest.fn(),
}));

jest.mock('next/cache', () => ({
  cacheLife: jest.fn(),
}));

describe('Appointments', () => {
  describe('getThisWeekAppointments', () => {
    it('returns formatted appointments for this week', async () => {
      const mockAppointments = [
        {
          id: 1,
          from: new Date(2025, 9, 8, 12, 30),
          to: new Date(2025, 9, 8, 13, 0),
          description: 'Checkup',
          Patient: { firstName: 'John', lastName: 'Doe' },
        },
        {
          id: 2,
          from: new Date(2025, 9, 13, 12, 30),
          to: new Date(2025, 9, 13, 13, 30),
          description: 'Consultation',
          Patient: { firstName: 'Jane', lastName: 'Smith' },
        },
      ];
      (getAppointmentsByDate as jest.Mock).mockResolvedValueOnce(mockAppointments);

      const result = await getThisWeekAppointments();
      expect(getAppointmentsByDate).toHaveBeenCalled();
      expect(result).toEqual({
        data: [
          { date: '08 Oct 2025 12:30 - 13:00', description: 'Checkup', id: 1, name: 'John Doe' },
          { date: '13 Oct 2025 12:30 - 13:30', description: 'Consultation', id: 2, name: 'Jane Smith' },
        ],
        success: true,
      });
    });

    it('returns an error', async () => {
      (getAppointmentsByDate as jest.Mock).mockRejectedValueOnce(new Error('Something went wrong!'));

      const result = await getThisWeekAppointments();
      expect(getAppointmentsByDate).toHaveBeenCalled();
      expect(result).toEqual({
        error: 'Something went wrong!',
        success: false,
      });
    });
  });

  describe('getAppointmentById', () => {
    it('returns formatted appointment data', async () => {
      const mockAppointment = {
        id: 1,
        from: new Date(2025, 9, 8, 12, 30),
        to: new Date(2025, 9, 8, 13, 0),
        description: 'Checkup',
        symptoms: 'none',
        diagnosis: 'healthy',
        Patient: { firstName: 'John', lastName: 'Doe', allergies: 'N/A', notes: 'none' },
        prescriptions: [
          { id: 'p-1', content: 'prescription-1' },
          { id: 'p-2', content: 'prescription-2' },
        ],
      };
      (findAppointmentById as jest.Mock).mockResolvedValue(mockAppointment);

      const result = await getAppointmentById('1');
      expect(findAppointmentById).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        success: true,
        data: {
          appointmentData: {
            date: '08 Oct 2025 12:30 - 13:00',
            description: 'Checkup',
            diagnosis: 'healthy',
            symptoms: 'none',
          },
          patientData: {
            allergies: 'N/A',
            name: 'John Doe',
            notes: 'none',
          },
          prescriptions: [
            { id: 'p-1', content: 'prescription-1' },
            { id: 'p-2', content: 'prescription-2' },
          ],
        },
      });
    });

    it('returns an error', async () => {
      (findAppointmentById as jest.Mock).mockRejectedValue(new Error('Something went wrong!'));

      const result = await getAppointmentById('a-1');
      expect(result).toEqual({
        success: false,
        error: 'Something went wrong!',
      });
    });
  });
});
