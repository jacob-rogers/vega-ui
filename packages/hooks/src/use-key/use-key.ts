import { useCallback, useEffect } from 'react';

import { HandledEventsType, Handler, PossibleEvent } from './types';

type Opts = {
  keyevent?: HandledEventsType;
  element?: Document | Element;
};

export const useKey = (
  keys: Array<string | number>,
  callback: Handler,
  { keyevent = 'keyup', element = document }: Opts = {},
): void => {
  const handleEvent = useCallback(
    (event: PossibleEvent): void => {
      if (keys.includes(event.which) || keys.includes(event.code) || keys.includes(event.key)) {
        callback(event);
      }
    },
    [callback, keys],
  );

  useEffect(() => {
    element.addEventListener(keyevent, handleEvent as EventListener);
    return (): void => {
      element.removeEventListener(keyevent, handleEvent as EventListener);
    };
  }, [handleEvent, keyevent, element]);
};
