import type { FC } from 'react';
import { ClipboardList } from 'lucide-react';
import Button from './Button';

interface EmptyStateProps {
  onFocusInput: () => void;
}

const EmptyState: FC<EmptyStateProps> = ({ onFocusInput }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center text-muted dark:text-gray-400">
      <ClipboardList className="w-12 h-12 mb-4 text-gray-400" />
      <h2 className="text-lg font-semibold mb-1">You have no tasks yet</h2>
      <p className="text-sm mb-4">Click the button below to create your first task</p>
      <Button onClick={onFocusInput} className="text-sm px-4 py-2">
        ➕ Add a task
      </Button>
    </div>
  );
};

export default EmptyState;
