import { getAppointmentsByDate } from '@/lib/db/appointment';

import { getThisWeekAppointments } from './appointments';

jest.mock('@/lib/db/appointment', () => ({
  getAppointmentsByDate: jest.fn(),
}));

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
