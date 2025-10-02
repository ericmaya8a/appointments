import { render, screen } from '@testing-library/react';

import RootLayout from './layout';

jest.mock('@/components/providers/theme-provider', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-theme-provider">{children}</div>
  ),
}));

describe('RootLayout', () => {
  it('renders children and main navigation', () => {
    render(<RootLayout>Test Child</RootLayout>);

    expect(screen.getByTestId('mock-theme-provider')).toBeInTheDocument();
    expect(screen.getByText('Test Child')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
