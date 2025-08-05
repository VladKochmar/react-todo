import { describe, it, expect } from 'vitest';
import { filterTasks } from './filterTasks';
import type Task from '../types/Task';

const mockTasks: Task[] = [
  { id: 1, title: 'Task 1', done: false },
  { id: 2, title: 'Task 2', done: true },
  { id: 3, title: 'Task 3', done: false },
];

describe('filterTasks', () => {
  it('returns only active tasks when filter is "Active"', () => {
    const result = filterTasks(mockTasks, 'Active');
    expect(result).toEqual([
      { id: 1, title: 'Task 1', done: false },
      { id: 3, title: 'Task 3', done: false },
    ]);
  });

  it('returns only completed tasks when filter is "Completed"', () => {
    const result = filterTasks(mockTasks, 'Completed');
    expect(result).toEqual([{ id: 2, title: 'Task 2', done: true }]);
  });

  it('returns all tasks when filter is "All"', () => {
    const result = filterTasks(mockTasks, 'All');
    expect(result).toEqual(mockTasks);
  });

  it('throws error on uknown filter', () => {
    expect(() => filterTasks(mockTasks, 'something')).toThrow('Filter not found!');
  });
});
