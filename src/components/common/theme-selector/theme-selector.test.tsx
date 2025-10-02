import { fireEvent, render, screen } from '@testing-library/react';
import { useTheme } from 'next-themes';

import { ThemeSelector } from './theme-selector';

jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}));

describe('ThemeSelector', () => {
  it('should render the component', () => {
    const mockUseTheme = useTheme as jest.Mock;
    mockUseTheme.mockReturnValue({
      theme: 'system',
      setTheme: jest.fn(),
    });
    render(<ThemeSelector />);

    expect(screen.getByText(/system/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/system/i));
  });

  it('should update theme when clicking', () => {
    const mockUseTheme = useTheme as jest.Mock;
    mockUseTheme.mockReturnValue({
      theme: 'system',
      setTheme: jest.fn(),
    });
    render(<ThemeSelector />);

    const button = screen.getByText(/system/i);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.getByText('Themes')).toBeInTheDocument();
    expect(screen.getByText('Default')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Default'));
    expect(mockUseTheme().setTheme).toHaveBeenCalledWith('light');
  });
});
