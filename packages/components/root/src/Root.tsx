import React from 'react';

import {
  PortalsRoot,
  ThemeName,
  ThemeRoot,
  usePortal,
  usePortalRender,
  useTheme,
} from './components';

export type RootProps = {
  defaultTheme?: ThemeName;
  children: React.ReactNode;
};

const Root: React.FC<RootProps> = (props) => {
  const { defaultTheme, children } = props;

  return (
    <ThemeRoot themeName={defaultTheme}>
      <PortalsRoot id="portalRoot">{children}</PortalsRoot>
    </ThemeRoot>
  );
};

export { Root, useTheme, usePortal, usePortalRender };
