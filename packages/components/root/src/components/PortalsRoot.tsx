import React, { createContext, Dispatch, useContext, useReducer } from 'react';
import { useMount, useUnmount } from '@gpn-prototypes/vega-hooks';

type Portal = { name: string; id: string };

type State = {
  portals: Portal[];
};

export type PortalParams = {
  className?: string;
  name: string;
  id: string;
};

type ActionReducer =
  | { type: 'add'; params: PortalParams }
  | { type: 'remove'; params: { id: string } };

const createElement = (params: PortalParams): void => {
  const portal = document.getElementById(params.id);
  if (portal) {
    return;
  }

  const newPortal = document.createElement('div');
  if (params.className) {
    newPortal.className = params.className;
  }
  newPortal.id = params.id;
  document.body.appendChild(newPortal);
};

const removeElement = (params: { id: string }): void => {
  const portal = document.getElementById(params.id);

  if (portal) {
    document.body.removeChild(portal);
  }
};

const initialState: State = {
  portals: [],
};

function portalsReducer(state: State, action: ActionReducer): State {
  const { type } = action;
  const { id } = action.params;

  if (type === 'add' && 'name' in action.params) {
    createElement(action.params);
    return {
      portals: [...state.portals, { id: action.params.id, name: action.params.name }],
    };
  }

  if (type === 'remove') {
    removeElement(action.params);
    return {
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
  const [portalsState, updatePortals] = useReducer(portalsReducer, initialState);
  const { initialPortals = [], children } = props;

  useMount(() => {
    if (typeof document !== 'undefined') {
      initialPortals.forEach((portalParams: PortalParams) => {
        updatePortals({ type: 'add', params: portalParams });
      });
    }
  });

  useUnmount(() => {
    portalsState.portals.forEach((portal: Portal) => {
      updatePortals({ type: 'remove', params: { id: portal.id } });
    });
  });

  return (
    <PortalsContext.Provider value={{ portalsState, updatePortals }}>
      {children}
    </PortalsContext.Provider>
  );
};
