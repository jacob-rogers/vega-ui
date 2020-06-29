import React, { createContext, useContext } from 'react';

import {
  PortalParams,
  PortalsRoot,
  ThemeName,
  ThemeRoot,
  usePortals,
  useTheme,
} from './components';

export type RootProps = {
  initialPortals?: PortalParams[];
  initialTheme?: ThemeName;
  rootId: string;
  children: React.ReactNode;
};

type RootContextProps = {
  rootId?: string;
};

const RootContext = createContext<RootContextProps>({});

const useRoot = (): RootContextProps => useContext(RootContext);

const Root: React.FC<RootProps> = (props) => {
  const { rootId, initialPortals, initialTheme, children } = props;
  return (
    <div id={rootId}>
      <RootContext.Provider value={{ rootId }}>
        <ThemeRoot themeName={initialTheme}>
          <PortalsRoot initialPortals={initialPortals}>{children}</PortalsRoot>
        </ThemeRoot>
      </RootContext.Provider>
    </div>
  );
};

export { Root, useTheme, usePortals, useRoot };
