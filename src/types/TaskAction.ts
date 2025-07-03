import type Task from './Task';

export type TaskAction =
  | { type: 'ADD'; name: string }
  | { type: 'EDIT'; task: Task }
  | { type: 'TOGGLE_DONE'; id: number }
  | { type: 'DELETE'; id: number };
