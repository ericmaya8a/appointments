import { render, screen } from '@testing-library/react';

import { MainNavigation } from './main-navigation';

describe('MainNavigation', () => {
  it('should render the component', () => {
    render(<MainNavigation />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText(/select a theme/i)).toBeInTheDocument();
  });
});
