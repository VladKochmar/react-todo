import { useEffect, useState } from 'react';
import { getItem, setItem } from '../utils/localStorage';

type Theme = 'light' | 'dark';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = getItem('theme') as Theme | null;
    if (saved) return saved;

    const preferedDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return preferedDark ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme };
};
