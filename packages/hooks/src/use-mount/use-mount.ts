import { useEffect, useRef } from 'react';

export function useMount(fn: Function = (): void => {}): React.RefObject<boolean> {
  const isMountedRef = useRef(false);
  const fnRef = useRef(fn);

  useEffect(() => {
    const result = fnRef.current();
    isMountedRef.current = true;

    return (): void => {
      if (typeof result === 'function') {
        result();
      }
      isMountedRef.current = false;
    };
  }, []);
  return isMountedRef;
}
