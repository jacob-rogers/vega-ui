import { useEffect, useState } from 'react';

import { useMount } from '../use-mount';
import { useUnmount } from '../use-unmount';

type API<T> = [T, (value: T) => void];

export function useLocalStorage<T>(key: string, initialValue: T): API<T> {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const handleStorageUpdate = (e: StorageEvent): void => {
    console.log(e.newValue, storedValue);
    if (typeof e.newValue === 'string' && e.newValue !== JSON.stringify(storedValue)) {
      setStoredValue(JSON.parse(e.newValue));
    }
  };

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [storedValue, key]);

  useMount(() => {
    window.addEventListener('storage', handleStorageUpdate);
  });

  useUnmount(() => {
    window.removeEventListener('storage', handleStorageUpdate);
  });

  const setValue = (value: T): void => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
  };

  return [storedValue, setValue];
}
