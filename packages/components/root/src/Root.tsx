import React, { createContext, useContext } from 'react';

import {
  PortalParams,
  PortalsRoot,
  ThemeName,
  ThemeRoot,
  usePortals,
  useTheme,
} from './components';

type RootProps = {
  initialPortals?: PortalParams[];
  initialTheme?: ThemeName;
  rootId: string;
  children: React.ReactNode;
};

type RootContextProps = {
  usePortals: typeof usePortals;
  useTheme: typeof useTheme;
  rootId?: string;
};

const RootContext = createContext<RootContextProps>({ usePortals, useTheme });

export const useRoot = (): RootContextProps => useContext(RootContext);

export const Root: React.FC<RootProps> = (props) => {
  const { rootId, initialPortals, initialTheme, children } = props;
  return (
    <div id={rootId}>
      <RootContext.Provider value={{ usePortals, useTheme, rootId }}>
        <ThemeRoot themeName={initialTheme}>
          <PortalsRoot rootId={rootId} initialPortals={initialPortals}>
            {children}
          </PortalsRoot>
        </ThemeRoot>
      </RootContext.Provider>
    </div>
  );
};
