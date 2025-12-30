import { render, screen, waitFor } from '@testing-library/react';
import { ComponentType, lazy } from 'react';

import AppointmentDetailsPage from './page';

jest.mock('@/features/appointment-details/components/appointment-details', () => ({
  AppointmentDetails: function MockAppointmentDetails() {
    return <div data-testid="appointment-details">Appointment Details</div>;
  },
}));

describe('Appointment Details Page', () => {
  it('should render the Appointment Details page', async () => {
    render(<AppointmentDetailsPage params={Promise.resolve({ appointmentId: 'p-1' })} />);

    (await waitFor(() => expect(screen.getByTestId('appointment-details')))).toBeInTheDocument();
  });

  it('should show the loading state', async () => {
    jest.resetModules();
    jest.doMock('@/features/appointment-details/components/appointment-details', () => ({
      AppointmentDetails: lazy(
        () =>
          new Promise<{ default: ComponentType }>((resolve) =>
            setTimeout(
              () => resolve({ default: () => <div data-testid="appointment-details">Appointment Details</div> }),
              100,
            ),
          ),
      ),
    }));

    const DetailsPage = (await import('./page')).default;

    render(<DetailsPage params={Promise.resolve({ appointmentId: 'p-1' })} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
