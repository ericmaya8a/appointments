import { render, screen } from '@testing-library/react';

import { EmptyError } from './empty-error';

describe('EmptyError', () => {
  it('should render the component with the error message', () => {
    render(<EmptyError error="Something went wrong!" />);
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText(/something went wrong!/i)).toBeInTheDocument();
  });
});
