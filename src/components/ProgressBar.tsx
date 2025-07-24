import type { FC } from 'react';

interface ProgressBarProps {
  total: number;
  completed: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ total, completed }) => {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <>
      <div className="relative w-full h-1.5 bg-gray-200 dark:bg-gray-700 transition-colors duration-300 rounded mb-1">
        <div
          data-testid="progress-bar"
          className="absolute h-1.5 rounded bg-primary transition-all duration-300"
          style={{ width: `${percent}%` }}></div>
      </div>
      <div className="flex justify-between text-muted dark:text-gray-400 text-sm mb-3">
        <span>{percent}% complete</span>
        <span>
          {completed} of {total} tasks
        </span>
      </div>
    </>
  );
};

export default ProgressBar;
