import { render, screen, waitFor } from '@testing-library/react';
import { ComponentType, lazy } from 'react';

import Home from './page';

jest.mock('@/features/appointments/components/week-appointments', () => ({
  WeekAppointments: function MockWeekAppointments() {
    return <div data-testid="week-appointments">Week appointments</div>;
  },
}));

describe('Home Page', () => {
  it('should render the home page', async () => {
    render(<Home />);

    expect(screen.getByRole('heading', { name: /appointments/i, level: 1 })).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('week-appointments')).toBeInTheDocument();
    });
  });

  it('should show loading state initially', async () => {
    jest.resetModules();
    jest.doMock('@/features/appointments/components/week-appointments', () => ({
      WeekAppointments: lazy(
        () =>
          new Promise<{ default: ComponentType }>((resolve) =>
            setTimeout(
              () => resolve({ default: () => <div data-testid="week-appointments">Week appointments</div> }),
              100,
            ),
          ),
      ),
    }));
    const HomePage = (await import('./page')).default;

    render(<HomePage />);

    expect(screen.getByRole('heading', { name: /appointments/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByTestId('week-appointments-skeleton')).toBeInTheDocument();
  });
});
