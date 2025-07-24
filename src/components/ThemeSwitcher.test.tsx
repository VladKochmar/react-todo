import ThemeSwitcher from './ThemeSwitcher';
import * as useThemeHook from '../hooks/useTheme';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ThemeSwitcher', () => {
  it('renders Moon icon when theme is light', () => {
    vi.spyOn(useThemeHook, 'useTheme').mockReturnValue({
      theme: 'light',
      toggleTheme: vi.fn(),
    });

    render(<ThemeSwitcher />);

    expect(screen.getByLabelText(/toggle theme/i)).toBeInTheDocument();
    expect(screen.getByTestId('lucide-moon')).toBeInTheDocument();
  });

  it('renders Sun icon when theme is dark', () => {
    vi.spyOn(useThemeHook, 'useTheme').mockReturnValue({
      theme: 'dark',
      toggleTheme: vi.fn(),
    });

    render(<ThemeSwitcher />);

    expect(screen.getByLabelText(/toggle theme/i)).toBeInTheDocument();
    expect(screen.getByTestId('lucide-sun')).toBeInTheDocument();
  });

  it('calls toggleTheme when switch button is clicked', async () => {
    const toggleThemeMock = vi.fn();

    vi.spyOn(useThemeHook, 'useTheme').mockReturnValue({
      theme: 'light',
      toggleTheme: toggleThemeMock,
    });

    render(<ThemeSwitcher />);

    const button = screen.getByRole('button', { name: /toggle theme/i });
    await userEvent.click(button);

    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
  });
});
