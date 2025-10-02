import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';

import RootLayout from './layout';

jest.mock('./layout', () => ({
  __esModule: true,
  default: ({ children }: { children: ReactNode }) => <main data-testid="theme-provider">{children}</main>,
}));

describe('RootLayout', () => {
  it('renders children and main navigation', () => {
    render(<RootLayout>Test Child</RootLayout>);

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});
