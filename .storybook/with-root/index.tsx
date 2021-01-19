import React from 'react';

import { Root, useTheme } from '../../src/components';

import './whitepaper.css';

type ThemeName = 'default' | 'dark' | 'display';

type VegaThemeDecoratorProps = {
  themeName: ThemeName;
  className: string;
};

const StorybookThemeRoot: React.FC<VegaThemeDecoratorProps> = ({ themeName, children }) => {
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    if (themeName !== theme) {
      setTheme(themeName);
    }
  }, [themeName, theme, setTheme]);

  return <>{children}</>;
};

export const VegaRootDecorator: React.FC<VegaThemeDecoratorProps> = (props) => {
  const { themeName } = props;

  return (
    <Root initialPortals={[{ name: 'portalRoot' }]} defaultTheme={themeName}>
      <StorybookThemeRoot {...props} />
    </Root>
  );
};
