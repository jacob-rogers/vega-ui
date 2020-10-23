import { useLayoutEffect, useMemo, useRef, useState } from 'react';

type MovementEvent = MouseEvent;

interface MovementHandlers {
  onMove(event: MovementEvent): void;
  onEnd(event: MovementEvent): void;
}

const noop = (): void => {};

export function useForceUpdate(): VoidFunction {
  const [, setState] = useState({});

  return useMemo(
    (): VoidFunction => (): void => {
      setState({});
    },
    [],
  );
}

export function useActiveCursorStyles(isActive: boolean, split: 'vertical' | 'horizontal'): void {
  useLayoutEffect(() => {
    if (isActive) {
      document.body.style.setProperty('cursor', split === 'horizontal' ? 'ns-resize' : 'ew-resize');
      document.body.style.setProperty('user-select', 'none');
    } else {
      document.body.style.removeProperty('cursor');
      document.body.style.removeProperty('user-select');
    }
  }, [isActive, split]);
}

export function useGlobalMovementHandlers(active: boolean, handlers: MovementHandlers): void {
  const cleanupRef = useRef(noop);
  const handlersRef = useRef(handlers);

  handlersRef.current = handlers;

  useLayoutEffect(() => {
    if (active) {
      const moveListener = (event: MouseEvent): void => {
        if (event.buttons === 0) {
          /*
            Если пользователь при ресайзе увёл курсор за пределы окна браузера,
            отпустил кнопку, а затем вернул курсор, то считаем, что ресайз закончен.
          */
          handlersRef.current.onEnd(event);
        } else {
          handlersRef.current.onMove(event);
        }
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
