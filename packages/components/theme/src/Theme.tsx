import React from 'react';
import {
  presetGpnDark,
  presetGpnDefault,
  presetGpnDisplay,
  Theme as BaseTheme,
  ThemePreset,
  ThemeProps,
} from '@gpn-design/uikit/Theme';

export type VegaThemeProps = {
  preset: ThemePreset;
  children: React.ReactNode;
} & ThemeProps;

const Theme: React.FC<ThemeProps> = ({ children, preset, ...restProps }) => {
  return (
    <BaseTheme preset={preset} {...restProps}>
      {children}
    </BaseTheme>
  );
};

export { Theme, presetGpnDark, presetGpnDefault, presetGpnDisplay, ThemePreset };
