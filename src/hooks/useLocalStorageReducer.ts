import { useEffect, useReducer, type Dispatch } from 'react';
import { getItem, setItem } from '../utils/localStorage';
import type { TaskAction } from '../types/TaskAction';

export const useLocalStorageReducer = <T>(key: string, reducer: (state: T, action: TaskAction) => T, initialState: T): [T, Dispatch<TaskAction>] => {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const stored = getItem(key) as T;
    return stored ?? initialState;
  });

  useEffect(() => {
    setItem(key, state);
  }, [key, state]);

  return [state, dispatch];
};
