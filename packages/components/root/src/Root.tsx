import React from 'react';

import {
  PortalParams,
  PortalsRoot,
  ThemeName,
  ThemeRoot,
  usePortals,
  useTheme,
} from './components';

export type RootProps = {
  defaultTheme?: ThemeName;
  children: React.ReactNode;
  portalParams?: PortalParams[];
};

const Root: React.FC<RootProps> = (props) => {
  const { defaultTheme, children, portalParams } = props;
  return (
    <div>
      <ThemeRoot themeName={defaultTheme}>
        <PortalsRoot portalParams={portalParams}>{children}</PortalsRoot>
      </ThemeRoot>
    </div>
  );
};

export { Root, useTheme, usePortals };
