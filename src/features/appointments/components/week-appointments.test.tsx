import { render, screen } from '@testing-library/react';

import { getThisWeekAppointments } from '@/backend/queries/appointments';

import { WeekAppointments } from './week-appointments';

jest.mock('@/backend/queries/appointments', () => ({
  getThisWeekAppointments: jest.fn(),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <a href="/appointment/1">{children}</a>,
}));

describe('WeekAppointments', () => {
  it('renders appointment items when appointments exist', async () => {
    (getThisWeekAppointments as jest.Mock).mockResolvedValueOnce([
      {
        id: 1,
        date: '01 Oct 2025 10:00',
        description: 'Checkup',
        name: 'John Doe',
      },
    ]);
    render(await WeekAppointments());
    expect(screen.getByText('01 Oct 2025 10:00')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Checkup')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('renders empty state when no appointments', async () => {
    (getThisWeekAppointments as jest.Mock).mockResolvedValueOnce([]);
    render(await WeekAppointments());
    expect(screen.getByText('No appointments this week')).toBeInTheDocument();
  });
});
