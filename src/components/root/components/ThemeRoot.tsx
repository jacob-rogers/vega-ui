import React, { createContext, ReactNode, useContext, useState } from 'react';

import { presetGpnDark, presetGpnDefault, presetGpnDisplay, Theme, ThemePreset } from '../../theme';

export type ThemeName = 'default' | 'dark' | 'display';

type ThemeRootProps = {
  themeName?: ThemeName;
  className?: string;
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

export const ThemeRoot: React.FC<ThemeRootProps> = (props) => {
  const { themeName = 'default', className, children } = props;
  const [theme, setTheme] = useState(themeName);

  const preset = getThemeByName(theme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Theme preset={preset} className={className}>
        {children}
      </Theme>
    </ThemeContext.Provider>
  );
};

export { Theme, getThemeByName };
