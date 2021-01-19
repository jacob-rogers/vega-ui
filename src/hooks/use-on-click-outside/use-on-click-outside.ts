import { useEffect } from 'react';

import { usePreviousRef } from '../use-previous-ref';

const TOUCHSTART = 'touchstart';
const CLICK = 'mousedown';

type HandledEvents = [typeof TOUCHSTART, typeof CLICK];

type HandledEventsType = HandledEvents[number];

type PossibleEvent = {
  [Type in HandledEventsType]: HTMLElementEventMap[Type];
}[HandledEventsType];

type Handler = (event: PossibleEvent) => void;

const events: HandledEvents = [TOUCHSTART, CLICK];

const getEventListenerOptions = (event: HandledEventsType): Record<string, boolean> | undefined => {
  if (event !== TOUCHSTART) {
    return undefined;
  }

  return { passive: true };
};

type Args = {
  ref: React.RefObject<HTMLElement> | React.RefObject<HTMLElement>[];
  handler: Handler;
};

export function useOnClickOutside({ ref, handler }: Args): void {
  const handlerRef = usePreviousRef<Handler>(handler);
  const refs = Array.isArray(ref) ? ref : [ref];

  useEffect(() => {
    // eslint-disable-next-line consistent-return
    function listener(event: PossibleEvent): void {
      if (handlerRef && handlerRef.current) {
        if (
          refs.length === 0 ||
          !handlerRef.current ||
          refs.some(
            (r) => r.current instanceof HTMLElement && r.current.contains(event.target as Node),
          )
        ) {
          return undefined;
        }

        handlerRef.current(event);
      }
    }

    events.forEach((event) => {
      document.addEventListener(event, listener, getEventListenerOptions(event));
    });

    return (): void => {
      events.forEach((event) => {
        document.removeEventListener(
          event,
          listener,
          getEventListenerOptions(event) as EventListenerOptions,
        );
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handler, ref]);
}
