import type Task from '../types/Task';
import type { TaskAction } from '../types/TaskAction';
import { useLocalStorageReducer } from './useLocalStorageReducer';

export const useTodos = () => {
  const [tasks, dispatch] = useLocalStorageReducer('tasks', tasksReducer, []);

  const add = (name: string) => {
    dispatch({ type: 'ADD', name });
  };

  const edit = (task: Task) => {
    dispatch({ type: 'EDIT', task });
  };

  const toggleDone = (id: number) => {
    dispatch({ type: 'TOGGLE_DONE', id });
  };

  const remove = (id: number) => {
    dispatch({ type: 'DELETE', id });
  };

  return { tasks, add, edit, toggleDone, remove };
};

const tasksReducer = (tasks: Task[], action: TaskAction): Task[] => {
  switch (action.type) {
    case 'ADD': {
      return [{ id: Date.now(), title: action.name, done: false, deadline: '', description: '' }, ...tasks];
    }
    case 'EDIT': {
      return tasks.map(task => (task.id === action.task.id ? action.task : task));
    }
    case 'TOGGLE_DONE': {
      return tasks.map(task => (task.id === action.id ? { ...task, done: !task.done } : task));
    }
    case 'DELETE': {
      return tasks.filter(task => task.id !== action.id);
    }
  }
};
