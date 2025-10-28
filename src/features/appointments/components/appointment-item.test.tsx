import { render, screen } from '@testing-library/react';

import { AppointmentItem } from './appointment-item';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <a href="/appointment/1">{children}</a>,
}));

describe('AppointmentItem', () => {
  it('should render the appointment', () => {
    render(
      <AppointmentItem
        item={{
          id: 1,
          date: '01 Oct 2025 10:00',
          description: 'Checkup',
          name: 'John Doe',
        }}
      />,
    );

    expect(screen.getByText('01 Oct 2025 10:00')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Checkup')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
