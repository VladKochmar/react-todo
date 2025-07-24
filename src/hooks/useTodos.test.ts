import { useTodos } from './useTodos';
import * as storage from '../utils/localStorage';
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('useTodos', () => {
  beforeEach(() => {
    vi.spyOn(storage, 'getItem').mockReturnValue([]);
    vi.spyOn(storage, 'setItem').mockImplementation(() => {});
  });

  it('adds a new task', () => {
    const { result } = renderHook(() => useTodos());

    act(() => result.current.add('New task'));

    expect(result.current.tasks.length).toBe(1);
    expect(result.current.tasks[0].title).toBe('New task');
  });

  it('edits an existing task', () => {
    const { result } = renderHook(() => useTodos());

    act(() => result.current.add('Task 1'));
    act(() => result.current.edit({ ...result.current.tasks[0], title: 'Edited task' }));

    expect(result.current.tasks[0].title).toBe('Edited task');
  });

  it('removes an existing task', () => {
    const { result } = renderHook(() => useTodos());

    act(() => result.current.add('New task'));

    const taskId = result.current.tasks[0].id;
    act(() => result.current.remove(taskId));

    expect(result.current.tasks.length).toBe(0);
  });

  it('toggles to "Done"', () => {
    const { result } = renderHook(() => useTodos());

    act(() => result.current.add('New task'));

    const taskId = result.current.tasks[0].id;
    act(() => result.current.toggleDone(taskId));

    expect(result.current.tasks[0].done).toBe(true);
  });
});
