import { act, render, screen } from '@testing-library/react';

import { getAppointmentById } from '@/backend/queries/appointments';

import { AppointmentDetails } from './appointment-details';

jest.mock('@/backend/queries/appointments', () => ({
  getAppointmentById: jest.fn(),
}));

describe('AppointmentDetails', () => {
  it('renders the appointment details when id is numeric and data exists', async () => {
    (getAppointmentById as jest.Mock).mockResolvedValue(
      Promise.resolve({
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
            { id: 'p-1', content: 'prescription-1', appointmentId: 1 },
            { id: 'p-2', content: 'prescription-2', appointmentId: 2 },
          ],
        },
      }),
    );
    await act(() => {
      render(<AppointmentDetails params={Promise.resolve({ appointmentId: '1' })} />);
    });
    expect(screen.getByText('Date: 08 Oct 2025 12:30 - 13:00')).toBeInTheDocument();
    expect(screen.getByText('Patient: John Doe')).toBeInTheDocument();
    expect(screen.getByText('prescription-1')).toBeInTheDocument();
    expect(screen.getByText('prescription-2')).toBeInTheDocument();
  });

  it('shows invalid id error when id is not numeric', async () => {
    await act(() => render(<AppointmentDetails params={Promise.resolve({ appointmentId: 'a-1' })} />));
    expect(screen.getByText(/Invalid appointment Id: a-1/)).toBeInTheDocument();
  });

  it('shows API error when getAppointmentById returns success:false', async () => {
    (getAppointmentById as jest.Mock).mockReturnValue(
      Promise.resolve({
        success: false,
        error: 'Not Found',
      }),
    );
    await act(() => render(<AppointmentDetails params={Promise.resolve({ appointmentId: '2' })} />));
    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });

  it('shows No data when API returns success true but no data', async () => {
    (getAppointmentById as jest.Mock).mockReturnValue(
      Promise.resolve({
        success: true,
        data: null,
      }),
    );
    await act(() => render(<AppointmentDetails params={Promise.resolve({ appointmentId: '3' })} />));
    expect(screen.getByText('No data')).toBeInTheDocument();
  });
});
