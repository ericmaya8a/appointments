import { render, screen } from '@testing-library/react';

import { WeekAppointmentsSkeleton } from './week-appointments-skeleton';

describe('WeekAppointmentsSkeleton', () => {
  it('should render the component', () => {
    render(<WeekAppointmentsSkeleton />);

    expect(screen.getByTestId('week-appointments-skeleton')).toBeInTheDocument();
  });
});
