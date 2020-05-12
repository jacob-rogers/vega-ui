import { useEffect, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function useMount(fn: Function = (): void => {}): React.RefObject<boolean> {
  const ref = useRef(fn);
  const isMountedRef = useRef(false);

  useEffect(() => {
    ref.current();
    isMountedRef.current = true;
  }, []);
  return isMountedRef;
}
