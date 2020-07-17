import { useEffect, useLayoutEffect, useRef } from 'react';

import { SplitOrientation } from '../grid';

export function useActiveCursorStyles(isActive: boolean, split: SplitOrientation): void {
  useLayoutEffect(() => {
    if (isActive) {
      document.body.style.setProperty('cursor', split === 'horizontal' ? 'ew-resize' : 'ns-resize');
      document.body.style.setProperty('user-select', 'none');
    } else {
      document.body.style.removeProperty('cursor');
      document.body.style.removeProperty('user-select');
    }
  }, [isActive, split]);
}

export function usePrevious<T>(value: T): T {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

export function useAfterResize(active: boolean, callback: VoidFunction): void {
  const callbackRef = useRef(callback);
  const prevActive = usePrevious(active);

  callbackRef.current = callback;

  useEffect(() => {
    if (prevActive && !active) {
      callbackRef.current();
    }
  }, [active, prevActive]);
}

export type MovementEvent = MouseEvent;

interface MovementHandlers {
  onMove(event: MovementEvent): void;
  onEnd(event: MovementEvent): void;
}

const noop = (): void => {};

export function useGlobalMovementHandlers(active: boolean, handlers: MovementHandlers): void {
  const cleanupRef = useRef(noop);
  const handlersRef = useRef(handlers);

  handlersRef.current = handlers;

  useLayoutEffect(() => {
    if (active) {
      const moveListener = (event: MouseEvent): void => {
        handlersRef.current.onMove(event);
      };

      const outListener = (event: MouseEvent): void => {
        handlersRef.current.onEnd(event);
      };

      document.body.addEventListener('mousemove', moveListener);
      document.body.addEventListener('mouseup', outListener);

      cleanupRef.current = (): void => {
        document.body.removeEventListener('mousemove', moveListener);
        document.body.removeEventListener('mouseup', outListener);
      };
    }

    return (): void => {
      if (cleanupRef.current !== noop) {
        cleanupRef.current();
        cleanupRef.current = noop;
      }
    };
  }, [active]);
}
