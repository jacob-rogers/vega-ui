import React from 'react';

import {
  presetGpnDark,
  presetGpnDefault,
  presetGpnDisplay,
  Theme,
  ThemePreset,
} from '../../packages/components/theme/src';

type ThemeName = 'gpnDefault' | 'gpnDark' | 'gpnDisplay';

type Parameters = {
  themes: ThemeName;
};

type Theme = {
  name: string;
  value: ThemeName;
  color: string;
  default?: boolean;
};

type VegaThemeDecoratorProps = {
  themeName: ThemeName;
  className: string;
};

function getThemeByName(themeName: ThemeName): ThemePreset {
  const obj = {
    gpnDefault: presetGpnDefault,
    gpnDark: presetGpnDark,
    gpnDisplay: presetGpnDisplay,
  };
  return obj[themeName] || presetGpnDefault;
}

export const VegaThemeDecorator: React.FC<VegaThemeDecoratorProps> = (props) => {
  const { children, themeName } = props;

  return (
    <Theme preset={getThemeByName(themeName)}>
      {children}
      <div id="modalRoot" />
    </Theme>
  );
};
