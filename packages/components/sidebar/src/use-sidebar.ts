import { useMemo, useReducer } from 'react';

type State = {
  isOpen: boolean;
  isMinimized: boolean;
};

enum ActionType {
  open,
  close,
  maximize,
  minimize,
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
    default:
      throw new UnreachableCaseError(action.type);
  }
}

export function useSidebar(initialState = { isOpen: false, isMinimized: false }): SidebarAPI {
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
