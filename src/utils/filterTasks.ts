import type Task from '../types/Task';

export const filterTasks = (tasks: Task[], filter: string): Task[] => {
  switch (filter) {
    case 'Active':
      return tasks.filter(task => !task.done);
    case 'Completed':
      return tasks.filter(task => task.done);
    case 'All':
      return tasks;
    default:
      throw new Error('Filter not found!');
  }
};
