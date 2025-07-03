import { useState, type FC, type SyntheticEvent } from 'react';
import Button from './Button';
import type Task from '../types/Task';

interface TaskEditFormProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const TaskEditForm: FC<TaskEditFormProps> = ({ task, onEdit }) => {
  const [title, setTitle] = useState(task.title);
  const [deadline, setDeadline] = useState(task.deadline);
  const [description, setDescription] = useState(task.description);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    onEdit({
      ...task,
      title,
      deadline,
      description,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
      <label>
        <span className="text-muted text-sm font-medium">Task name</span>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter the task name"
          className="w-full rounded-[8px] outline-0 border-2 border-gray-200 dark:dark:border-gray-700 focus:border-gray-400 transition-colors duration-300 px-2 py-1"
        />
        {!title.length && <span className="text-red-500 text-sm">Title is required</span>}
      </label>
      <label>
        <span className="text-muted text-sm font-medium">Task deadline</span>
        <input
          type="datetime-local"
          value={deadline}
          onChange={e => setDeadline(e.target.value)}
          placeholder="Enter the task priority"
          className="w-full rounded-[8px] outline-0 border-2 border-gray-200 dark:dark:border-gray-700 focus:border-gray-400 transition-colors duration-300 px-2 py-1"
        />
      </label>
      <label>
        <span className="text-muted text-sm font-medium">Task description</span>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Enter the task description"
          className="w-full rounded-[8px] outline-0 border-2 border-gray-200 dark:dark:border-gray-700 focus:border-gray-400 transition-colors duration-300 px-2 py-1"></textarea>
      </label>
      <Button disabled={!title.length}>Save</Button>
    </form>
  );
};

export default TaskEditForm;
