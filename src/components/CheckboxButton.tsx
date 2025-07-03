import type { FC } from 'react';
import { Check } from 'lucide-react';

interface CheckboxButtonProps {
  checked: boolean;
  onCheck: () => void;
}

const CheckboxButton: FC<CheckboxButtonProps> = ({ checked, onCheck }) => {
  return (
    <button
      onClick={() => onCheck()}
      className="flex items-center justify-center w-5 h-5 rounded outline-0 border-2 border-gray-200 dark:border-gray-700 cursor-pointer transition-colors duration-300 hover:border-gray-400 focus:border-gray-400"
      aria-label="Toggle task">
      {checked && <Check className="text-muted dark:text-gray-400" />}
    </button>
  );
};

export default CheckboxButton;
