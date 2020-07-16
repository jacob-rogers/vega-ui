import React from 'react';
import { PortalParams } from '@gpn-prototypes/vega-hooks';

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
  initialPortals?: PortalParams[];
};

const Root: React.FC<RootProps> = (props) => {
  const { defaultTheme, children, initialPortals = [] } = props;

  return (
    <ThemeRoot themeName={defaultTheme}>
      <PortalsRoot initialPortals={initialPortals}>{children}</PortalsRoot>
    </ThemeRoot>
  );
};

export { Root, useTheme, usePortal, usePortalRender };
