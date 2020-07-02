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
  defaultTheme?: ThemeName;
  rootId: string;
  children: React.ReactNode;
};

type RootContextProps = {
  rootId?: string;
};

const RootContext = createContext<RootContextProps>({});

const useRoot = (): RootContextProps => useContext(RootContext);

const Root: React.FC<RootProps> = (props) => {
  const { rootId, initialPortals, defaultTheme, children } = props;
  return (
    <div id={rootId}>
      <ThemeRoot themeName={defaultTheme}>
        <PortalsRoot initialPortals={initialPortals}>{children}</PortalsRoot>
      </ThemeRoot>
    </div>
  );
};

export { Root, useTheme, usePortals, useRoot };
