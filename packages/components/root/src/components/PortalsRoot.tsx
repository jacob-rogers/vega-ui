import React, { createContext, Dispatch, useContext, useReducer } from 'react';
import { useUnmount } from '@gpn-prototypes/vega-hooks';

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

type PortalsRootProps = {
  initialPortals?: PortalParams[];
  children: React.ReactNode;
};

export const PortalsRoot: React.FC<PortalsRootProps> = (props) => {
  const { initialPortals = [], children } = props;

  const [portalsState, updatePortals] = useReducer(portalsReducer, {
    portals: [...initialPortals],
  });

  useUnmount(() => {
    portalsState.portals.forEach((portal) => {
      updatePortals({ type: 'remove', params: portal });
    });
  });

  return (
    <PortalsContext.Provider value={{ portalsState, updatePortals }}>
      {portalsState.portals.map(({ id, ...rest }: PortalParams) => (
        <div {...rest} key={id} id={id} />
      ))}
      {children}
    </PortalsContext.Provider>
  );
};
