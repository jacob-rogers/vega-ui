import React from 'react';

import { PortalsRoot, ThemeName, ThemeRoot, usePortal, useTheme } from './components';

export type RootProps = {
  defaultTheme?: ThemeName;
  children: React.ReactNode;
};

const Root: React.FC<RootProps> = (props) => {
  const { defaultTheme, children } = props;
  return (
    <ThemeRoot themeName={defaultTheme}>
      <PortalsRoot id="portalRoot" />
      {children}
    </ThemeRoot>
  );
};

export { Root, useTheme, usePortal };
