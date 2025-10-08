import { getAppointmentsByDate } from '@/dal/appointment';

import { getThisWeekAppointments } from './appointments';

jest.mock('@/dal/appointment', () => ({
  getAppointmentsByDate: jest.fn(),
}));

describe('getThisWeekAppointments', () => {
  it('returns formatted appointments for this week', async () => {
    const mockAppointments = [
      {
        id: 1,
        date: new Date(2025, 9, 8, 12, 30),
        description: 'Checkup',
        Patient: { firstName: 'John', lastName: 'Doe' },
      },
      {
        id: 2,
        date: new Date(2025, 9, 13, 12, 30),
        description: 'Consultation',
        Patient: { firstName: 'Jane', lastName: 'Smith' },
      },
    ];
    (getAppointmentsByDate as jest.Mock).mockResolvedValueOnce(mockAppointments);

    const result = await getThisWeekAppointments();
    expect(getAppointmentsByDate).toHaveBeenCalled();
    expect(result).toEqual([
      {
        id: 1,
        date: '08 Oct 2025 12:30',
        description: 'Checkup',
        name: 'John Doe',
      },
      {
        id: 2,
        date: '13 Oct 2025 12:30',
        description: 'Consultation',
        name: 'Jane Smith',
      },
    ]);
  });
});
