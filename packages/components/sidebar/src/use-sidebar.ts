import { useReducer } from 'react';

type State = {
  isOpen: boolean;
  isMinimized: boolean;
};

type Action = {
  type: string;
};

type SidebarAPI = {
  state: State;
  open: () => void;
  close: () => void;
  maximize: () => void;
  minimize: () => void;
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'open':
      return { ...state, isOpen: true };
    case 'close':
      return { ...state, isOpen: false };
    case 'maximize':
      return { ...state, isMinimized: false };
    case 'minimize':
      return { ...state, isMinimized: true };
    default:
      throw new Error('Unknown action type');
  }
}

export function useSidebar(initialState = { isOpen: true, isMinimized: false }): SidebarAPI {
  const [state, dispatch] = useReducer(reducer, initialState);
  const open = (): void => dispatch({ type: 'open' });
  const close = (): void => dispatch({ type: 'close' });
  const maximize = (): void => dispatch({ type: 'maximize' });
  const minimize = (): void => dispatch({ type: 'minimize' });

  return {
    state,
    open,
    close,
    maximize,
    minimize,
  };
}
