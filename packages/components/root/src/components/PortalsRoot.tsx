import React, { createContext, Dispatch, useContext, useReducer } from 'react';
import { useUnmount } from '@gpn-prototypes/vega-hooks';

type Portal = { id: string };

type State = {
  portals: Portal[];
  rootId: string;
};

export type PortalParams = {
  className?: string;
  id: string;
};

type ActionReducer =
  | { type: 'add'; params: PortalParams }
  | { type: 'remove'; params: { id: string } };

const createElement = (params: PortalParams, rootId: string): void => {
  const portal = document.getElementById(params.id);
  if (portal) {
    return;
  }

  const newPortal = document.createElement('div');
  if (params.className) {
    newPortal.className = params.className;
  }
  newPortal.id = params.id;

  const root = document.getElementById(rootId);
  if (root) {
    root.appendChild(newPortal);
  }
};

const removeElement = (params: { id: string }, rootId: string): void => {
  const portal = document.getElementById(params.id);
  const root = document.getElementById(rootId);

  if (portal && root) {
    root.removeChild(portal);
  }
};

const initialState: State = {
  portals: [],
  rootId: '',
};

function portalsReducer(state: State, action: ActionReducer): State {
  const { type } = action;
  const { id } = action.params;

  if (type === 'add') {
    createElement(action.params, state.rootId);
    return {
      ...state,
      portals: [...state.portals, { id: action.params.id }],
    };
  }

  if (type === 'remove') {
    removeElement(action.params, state.rootId);
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
  rootId: string;
};

export const PortalsRoot: React.FC<PortalsRootProps> = (props) => {
  const { initialPortals = [], children, rootId } = props;

  const [portalsState, updatePortals] = useReducer(portalsReducer, {
    portals: [...initialPortals],
    rootId,
  });

  useUnmount(() => {
    portalsState.portals.forEach((portal) => {
      updatePortals({ type: 'remove', params: portal });
    });
  });

  return (
    <PortalsContext.Provider value={{ portalsState, updatePortals }}>
      {portalsState.portals.map((value: PortalParams) => (
        <div id={value.id} />
      ))}
      {children}
    </PortalsContext.Provider>
  );
};
