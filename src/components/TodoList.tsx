import { type FC } from 'react';
import TodoItem from './TodoItem';
import type Task from '../types/Task';

interface TodoListProps {
  tasks: Task[];
  onEdit: (id: number) => void;
  onToggleDone: (id: number) => void;
  onRemove: (id: number) => void;
}

const TodoList: FC<TodoListProps> = ({ tasks, onEdit, onToggleDone, onRemove }) => {
  return (
    <ul className="rounded-[8px] border border-gray-200 dark:border-gray-700 transition-colors duration-300 not-last:mb-3">
      {tasks.map(task => (
        <TodoItem key={task.id} task={task} onEdit={onEdit} onToggleDone={onToggleDone} onRemove={onRemove} />
      ))}
    </ul>
  );
};

export default TodoList;
