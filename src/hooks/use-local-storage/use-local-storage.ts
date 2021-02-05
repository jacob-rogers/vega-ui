import { useEffect, useState } from 'react';

import { useMount } from '../use-mount';

type Setter<T> = (value: T | ((value: T) => T)) => void;

type API<T> = [T, Setter<T>];

export function useLocalStorage<T>(key: string, initialValue: T): API<T> {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const handleStorageUpdate = (e: StorageEvent): void => {
    // istanbul ignore else
    if (
      typeof e.newValue === 'string' &&
      e.newValue !== JSON.stringify(storedValue) &&
      e.key === key
    ) {
      setStoredValue(JSON.parse(e.newValue));
    }
  };

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [storedValue, key]);

  useMount(() => {
    window.addEventListener('storage', handleStorageUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageUpdate);
    };
  });

  const setValue: Setter<T> = (value): void => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
  };

  return [storedValue, setValue];
}
