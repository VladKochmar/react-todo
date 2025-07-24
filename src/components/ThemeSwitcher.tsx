import { Moon, Sun } from 'lucide-react';
import type { FC } from 'react';
import { useTheme } from '../hooks/useTheme';

const ThemeSwitcher: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="cursor-pointer w-9 h-9 inline-flex items-center justify-center text-muted dark:text-gray-400 bg-white dark:bg-gray-800 rounded-[50%] border border-gray-200 dark:border-gray-700 transition-colors duration-300 hover:border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
      aria-label="Toggle theme">
      {theme === 'dark' ? <Sun data-testid="lucide-sun" /> : <Moon data-testid="lucide-moon" />}
    </button>
  );
};

export default ThemeSwitcher;
