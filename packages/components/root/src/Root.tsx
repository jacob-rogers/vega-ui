import React from 'react';

import {
  PortalParams,
  PortalsRoot,
  ThemeName,
  ThemeRoot,
  usePortal,
  usePortals,
  useTheme,
} from './components';

export type RootProps = {
  initialPortals?: PortalParams[];
  defaultTheme?: ThemeName;
  rootId: string;
  children: React.ReactNode;
};

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

export { Root, useTheme, usePortals, usePortal };
