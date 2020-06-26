import React, { createContext, useContext } from 'react';

import { PortalParams, PortalsRoot, usePortals } from './components';

type RootProps = {
  initialPortals?: PortalParams[];
  children: React.ReactNode;
};

type RootContextProps = {
  usePortals: typeof usePortals;
};

const RootContext = createContext<RootContextProps>({ usePortals });

export const useRoot = (): RootContextProps => useContext(RootContext);

export const Root: React.FC<RootProps> = (props) => {
  return (
    <RootContext.Provider value={{ usePortals }}>
      <PortalsRoot initialPortals={props.initialPortals}>{props.children}</PortalsRoot>
    </RootContext.Provider>
  );
};
