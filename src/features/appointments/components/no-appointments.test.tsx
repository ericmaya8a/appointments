import { render, screen } from '@testing-library/react';

import { NoAppointments } from './no-appointments';

describe('NoAppointments', () => {
  it('should render the component', () => {
    render(<NoAppointments />);

    expect(screen.getByText('No appointments this week')).toBeInTheDocument();
  });
});
