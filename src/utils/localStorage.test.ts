import { describe, it, expect, beforeEach } from 'vitest';
import { getItem, setItem, removeItem } from './localStorage';

describe('localStorage utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('gets item from localStorage', () => {
    localStorage.setItem('testKey', JSON.stringify({ age: 20 }));
    const value = getItem('testKey');
    expect(value).toStrictEqual({ age: 20 });
  });

  it('return null if key not found', () => {
    const value = getItem('missedKey');
    expect(value).toBeNull();
  });

  it('sets item in localStorage', () => {
    setItem('testKey', { name: 'Alice' });
    const rawValue = localStorage.getItem('testKey');
    expect(rawValue).toBe(JSON.stringify({ name: 'Alice' }));
  });

  it('removes item from localStorage', () => {
    localStorage.setItem('testKey', 'value');
    removeItem('testKey');
    expect(localStorage.getItem('testKey')).toBeNull();
  });
});
