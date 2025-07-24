import { type FC } from 'react';
import { Trash2, Pencil } from 'lucide-react';
import CheckboxButton from './CheckboxButton';

import type Task from '../types/Task';

interface TodoItemProps {
  task: Task;
  onEdit: (id: number) => void;
  onToggleDone: (id: number) => void;
  onRemove: (id: number) => void;
}

const TodoItem: FC<TodoItemProps> = ({ task, onEdit, onToggleDone, onRemove }) => {
  return (
    <li className="flex items-center gap-x-3 not-last:border-b not-last:border-gray-200 dark:not-last:dark:border-gray-700 transition-colors duration-300 py-3 px-4">
      <CheckboxButton checked={task.done} onCheck={() => onToggleDone(task.id)} />
      <span className="flex-auto">{task.title}</span>
      <button
        aria-label="Open edit task modal window"
        onClick={() => onEdit(task.id)}
        className="cursor-pointer outline-0 text-muted dark:text-gray-400 transition-colors duration-300 hover:text-primary focus:text-primary">
        <Pencil className="w-5 h-5" />
      </button>
      <button
        aria-label="Remove task"
        onClick={() => onRemove(task.id)}
        className="cursor-pointer outline-0 text-muted dark:text-gray-400 transition-colors duration-300 hover:text-red-500 focus:text-red-500">
        <Trash2 className="w-5 h-5" />
      </button>
    </li>
  );
};

export default TodoItem;
