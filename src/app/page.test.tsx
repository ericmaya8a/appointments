import { render, screen } from '@testing-library/react';

import Home from './page';

describe('Home Page', () => {
  it('should render the home page', () => {
    render(<Home />);

    expect(screen.getByRole('heading', { name: /appointments/i, level: 1 })).toBeInTheDocument();
  });
});
