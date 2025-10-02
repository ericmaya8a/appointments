import { render, screen } from '@testing-library/react';
import { ComponentProps } from 'react';

import { themeMapping } from '@/theme';

import { ThemeProvider } from './theme-provider';

jest.mock('next-themes', () => {
  const actualModule = jest.requireActual('next-themes');
  return {
    ...actualModule,
    ThemeProvider: jest.fn(({ children, ...props }: ComponentProps<typeof ThemeProvider>) => (
      <div data-testid="theme-provider" {...props}>
        {children}
      </div>
    )),
  };
});

describe('ThemeProvider', () => {
  it('should render without crashing', () => {
    render(
      <ThemeProvider themes={Object.keys(themeMapping)}>
        <main>Child</main>
      </ThemeProvider>,
    );

    const themeProvider = screen.getByTestId('theme-provider');
    expect(themeProvider).toBeInTheDocument();
    expect(themeProvider).toHaveAttribute('themes', 'light,dark,system,amber,dark-amber,twitter,dark-twitter');
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveTextContent(/child/i);
  });
});
