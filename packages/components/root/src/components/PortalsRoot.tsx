import React, { createContext, Dispatch, useContext, useReducer, useRef } from 'react';

type Portal = { id: string };

type State = {
  portals: Portal[];
};

type DivProps = JSX.IntrinsicElements['div'];

export type PortalParams = {
  className?: string;
  id: string;
} & DivProps;

type ActionReducer =
  | { type: 'add'; params: PortalParams }
  | { type: 'remove'; params: { id: string } };

const initialState: State = {
  portals: [],
};

function portalsReducer(state: State, action: ActionReducer): State {
  const { type } = action;
  const { id } = action.params;

  if (type === 'add') {
    if (state.portals.find((p) => p.id === id)) {
      return state;
    }

    return {
      ...state,
      portals: [...state.portals, { ...action.params }],
    };
  }

  if (type === 'remove') {
    return {
      ...state,
      portals: state.portals.filter((p) => p.id !== id),
    };
  }

  return state;
}

type PortalContextProps = {
  portalsState: State;
  updatePortals: Dispatch<ActionReducer>;
};

const PortalsContext = createContext<PortalContextProps>({
  portalsState: initialState,
  updatePortals: () => {},
});

export const usePortals = (): PortalContextProps => useContext(PortalsContext);

export const usePortal = (id: string, params?: Omit<PortalParams, 'id'>): HTMLElement => {
  const ref = useRef<HTMLElement | null>(null);

  const { portalsState, updatePortals } = usePortals();

  const portal = portalsState.portals.find((p) => p.id === id);

  if (!portal) {
    updatePortals({ type: 'add', params: { id, ...params } });
  }

  if (ref.current === null) {
    ref.current = document.getElementById(id);
  }

  return ref.current as HTMLElement;
};

type PortalsRootProps = {
  initialPortals?: PortalParams[];
  children: React.ReactNode;
};

export const PortalsRoot: React.FC<PortalsRootProps> = (props) => {
  const { initialPortals = [], children } = props;

  const [portalsState, updatePortals] = useReducer(portalsReducer, {
    portals: [...initialPortals],
  });

  return (
    <PortalsContext.Provider value={{ portalsState, updatePortals }}>
      {children}
      {portalsState.portals.map(({ id, ...rest }: PortalParams) => (
        <div {...rest} key={id} id={id} />
      ))}
    </PortalsContext.Provider>
  );
};
