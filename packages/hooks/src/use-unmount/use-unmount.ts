import { useEffect } from 'react';

export function useUnmount(fn: Function): void {
  useEffect(() => {
    return (): void => {
      fn();
    };
  }, [fn]);
}
