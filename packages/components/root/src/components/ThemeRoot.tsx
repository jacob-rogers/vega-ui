import React, { createContext, ReactNode, useContext, useState } from 'react';
import {
  presetGpnDark,
  presetGpnDefault,
  presetGpnDisplay,
  Theme,
  ThemePreset,
} from '@gpn-prototypes/vega-theme';

export type ThemeName = 'default' | 'dark' | 'display';

type ThemeProps = {
  themeName?: ThemeName;
  children: ReactNode;
};

function getThemeByName(themeName: ThemeName): ThemePreset {
  const obj = {
    default: presetGpnDefault,
    dark: presetGpnDark,
    display: presetGpnDisplay,
  };
  return obj[themeName] || presetGpnDefault;
}

type ThemeContextProps = {
  theme: ThemeName;
  setTheme(theme: ThemeName): void;
};

const ThemeContext = createContext<ThemeContextProps>({
  theme: 'default',
  setTheme: () => {},
});

export const useTheme = (): ThemeContextProps => useContext(ThemeContext);

export const ThemeRoot: React.FC<ThemeProps> = (props) => {
  const { themeName = 'default', children } = props;
  const [theme, setTheme] = useState(themeName);

  const preset = getThemeByName(themeName);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Theme preset={preset}>{children}</Theme>
    </ThemeContext.Provider>
  );
};
