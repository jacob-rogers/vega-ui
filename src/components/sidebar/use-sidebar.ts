import { useMemo, useReducer } from 'react';

export type State = {
  isOpen?: boolean;
  isMinimized?: boolean;
};

export enum ActionType {
  open = 'open',
  close = 'close',
  maximize = 'maximize',
  minimize = 'minimize',
}

type Action = {
  type: ActionType;
};

type SidebarAPI = {
  state: State;
  open: () => void;
  close: () => void;
  maximize: () => void;
  minimize: () => void;
};

// istanbul ignore next
class UnreachableCaseError extends Error {
  constructor(val: never) {
    super(`Unreachable case: ${val}`);
  }
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.open:
      return { ...state, isOpen: true };
    case ActionType.close:
      return { ...state, isOpen: false };
    case ActionType.maximize:
      return { ...state, isMinimized: false };
    case ActionType.minimize:
      return { ...state, isMinimized: true };
    // istanbul ignore next
    default:
      throw new UnreachableCaseError(action.type);
  }
}

export function useSidebar(
  initialState: State = { isOpen: false, isMinimized: false },
): SidebarAPI {
  const [state, dispatch] = useReducer(reducer, initialState);

  const callbacks = useMemo(
    () => ({
      open: (): void => dispatch({ type: ActionType.open }),
      close: (): void => dispatch({ type: ActionType.close }),
      maximize: (): void => dispatch({ type: ActionType.maximize }),
      minimize: (): void => dispatch({ type: ActionType.minimize }),
    }),
    [],
  );

  return useMemo(() => ({ state, ...callbacks }), [state, callbacks]);
}
