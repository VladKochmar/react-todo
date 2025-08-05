import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useLocalStorageReducer } from './useLocalStorageReducer';
import * as storege from '../utils/localStorage';
import type { TaskAction } from '../types/TaskAction';

type Task = { id: number; title: string };
type State = Task[];

const reducer = (state: State, action: TaskAction): State => {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: 2, title: action.name }];
    default:
      return state;
  }
};

describe('useLocalStorageReducer', () => {
  const key = 'tasks';
  const initial: State = [];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(storege, 'setItem').mockImplementation(() => {});
  });

  it('initialazes state from localStorage if available', () => {
    const savedState = [{ id: 1, title: 'Task 1' }];
    vi.spyOn(storege, 'getItem').mockReturnValue(savedState);

    const { result } = renderHook(() => useLocalStorageReducer<State>(key, reducer, initial));
    expect(result.current[0]).toEqual(savedState);
  });

  it('uses initialState if localStorage is empty', () => {
    vi.spyOn(storege, 'getItem').mockReturnValue(null);

    const { result } = renderHook(() => useLocalStorageReducer<State>(key, reducer, initial));
    expect(result.current[0]).toEqual(initial);
  });

  it('updates the state and localStorage when dispatch is called', () => {
    vi.spyOn(storege, 'getItem').mockReturnValue([]);

    const { result } = renderHook(() => useLocalStorageReducer<State>(key, reducer, initial));

    const newTask = { id: 2, title: 'Task 2' };

    act(() => {
      result.current[1]({ type: 'ADD', name: newTask.title });
    });

    expect(result.current[0]).toEqual([newTask]);
    expect(storege.setItem).toHaveBeenCalledWith(key, [newTask]);
  });
});
