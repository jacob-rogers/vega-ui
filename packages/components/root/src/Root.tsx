import React, { useRef } from 'react';

import {
  PortalRef,
  PortalsContext,
  PortalsRoot,
  ThemeName,
  ThemeRoot,
  usePortal,
  useTheme,
} from './components';

export type RootProps = {
  defaultTheme?: ThemeName;
  children: React.ReactNode;
};

const Root: React.FC<RootProps> = (props) => {
  const { defaultTheme, children } = props;

  const ref: PortalRef = useRef({ default: null });

  return (
    <ThemeRoot themeName={defaultTheme}>
      <PortalsRoot innerRef={ref} id="portalRoot" />
      <PortalsContext.Provider value={ref}>{children}</PortalsContext.Provider>
    </ThemeRoot>
  );
};

export { Root, useTheme, usePortal };
