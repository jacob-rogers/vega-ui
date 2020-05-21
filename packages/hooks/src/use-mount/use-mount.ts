import { useEffect, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function useMount(fn: Function = (): void => {}): React.RefObject<boolean> {
  const isMountedRef = useRef(false);

  useEffect(() => {
    fn();
    isMountedRef.current = true;

    return (): void => {
      isMountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return isMountedRef;
}
