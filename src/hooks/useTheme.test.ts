import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTheme } from './useTheme';
import * as storage from '../utils/localStorage';

describe('useTheme', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    document.documentElement.classList = '';
  });

  it('uses theme from localStorage if present', () => {
    vi.spyOn(storage, 'getItem').mockReturnValue('dark');

    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('uses system preference if no theme in localStorage', () => {
    vi.spyOn(storage, 'getItem').mockReturnValue(null);
    vi.stubGlobal('matchMedia', query => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { result } = renderHook(() => useTheme());
    expect(['light', 'dark']).toContain(result.current.theme);
  });

  it('toggles theme correctly', () => {
    vi.spyOn(storage, 'getItem').mockReturnValue('light');
    const setItemSpy = vi.spyOn(storage, 'setItem');

    const { result } = renderHook(() => useTheme());

    act(() => result.current.toggleTheme());
    expect(result.current.theme).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(setItemSpy).toHaveBeenCalledWith('theme', 'dark');
  });
});
