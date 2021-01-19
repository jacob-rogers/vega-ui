import React from 'react';

import { PortalParams } from '../../hooks';

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
  initialPortals?: PortalParams[];
  className?: string;
  children: React.ReactNode;
};

const Root: React.FC<RootProps> = (props) => {
  const { defaultTheme, initialPortals = [], className, children } = props;

  return (
    <ThemeRoot themeName={defaultTheme} className={className}>
      <PortalsRoot initialPortals={initialPortals}>{children}</PortalsRoot>
    </ThemeRoot>
  );
};

export { Root, ThemeRoot, useTheme, usePortal, usePortalRender };
