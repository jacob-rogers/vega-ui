import React from 'react';

import { Root } from '../../packages/components/root/src';

type ThemeName = 'default' | 'dark' | 'display';

type VegaThemeDecoratorProps = {
  themeName: ThemeName;
  className: string;
};

export const VegaRootDecorator: React.FC<VegaThemeDecoratorProps> = (props) => {
  const { children, themeName } = props;

  return <Root defaultTheme={themeName}>{children}</Root>;
};
