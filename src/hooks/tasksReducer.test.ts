import { describe, it, expect } from 'vitest';
import { tasksReducer } from './useTodos';
import type { TaskAction } from '../types/TaskAction';
import type Task from '@/types/Task';

describe('tasksReducer', () => {
  it('adds a new task', () => {
    const state: Task[] = [];
    const action: TaskAction = { type: 'ADD', name: 'Test task' as const };

    const newState = tasksReducer(state, action);

    expect(newState).toHaveLength(1);
    expect(newState[0].title).toBe('Test task');
    expect(newState[0].done).toBe(false);
  });

  it('edits an existing task', () => {
    const state = [{ id: 1, title: 'Task', done: false }];
    const action: TaskAction = { type: 'EDIT', task: { ...state[0], title: 'Edited Task', done: true } };

    const newState = tasksReducer(state, action);
    expect(newState[0].title).toBe('Edited Task');
    expect(newState[0].done).toBe(true);
  });

  it('toggles to "Done"', () => {
    const state = [{ id: 1, title: 'Task', done: false }];
    const action: TaskAction = { type: 'TOGGLE_DONE', id: 1 };

    const newState = tasksReducer(state, action);
    expect(newState[0].done).toBe(true);
  });

  it('removes an existing task', () => {
    const state = [{ id: 1, title: 'Task', done: false }];
    const action: TaskAction = { type: 'DELETE', id: 1 };

    const newState = tasksReducer(state, action);
    expect(newState).toHaveLength(0);
  });
});
