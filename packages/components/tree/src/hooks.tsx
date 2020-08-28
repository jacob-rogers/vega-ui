import React, { useEffect } from 'react';

const MOUSEDOWN = 'mousedown';
const TOUCHSTART = 'touchstart';
const CLICK = 'click';

type HandledEvents = [typeof MOUSEDOWN, typeof TOUCHSTART, typeof CLICK];

type HandledEventsType = HandledEvents[number];

export type PossibleEvent = {
  [Type in HandledEventsType]: HTMLElementEventMap[Type];
}[HandledEventsType];

type Handler = (event: PossibleEvent) => void;

export function useOnClickOutside(ref: React.RefObject<HTMLElement>, handler: Handler) {
  useEffect(() => {
    const listener = (event: PossibleEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener(MOUSEDOWN, listener);
    document.addEventListener(TOUCHSTART, listener);

    return () => {
      document.removeEventListener(MOUSEDOWN, listener);
      document.removeEventListener(TOUCHSTART, listener);
    };
  }, [ref, handler]);
}

type KeyUpHandler = (event: WindowEventMap['keydown' | 'keyup']) => void;

export function useMultiSelect(handler: KeyUpHandler) {
  useEffect(() => {
    document.addEventListener('keydown', handler);
    document.addEventListener('keyup', handler);

    return () => {
      document.removeEventListener('keydown', handler);
      document.removeEventListener('keyup', handler);
    };
  }, [handler]);
}
