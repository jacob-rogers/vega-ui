import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  presetGpnDark,
  presetGpnDefault,
  presetGpnDisplay,
  Theme,
  ThemePreset,
} from '@gpn-prototypes/vega-theme';

export type ThemeName = 'gpnDefault' | 'gpnDark' | 'gpnDisplay';

type ThemeProps = {
  themeName?: ThemeName;
  children: ReactNode;
};

function getThemeByName(themeName: ThemeName): ThemePreset {
  const obj = {
    gpnDefault: presetGpnDefault,
    gpnDark: presetGpnDark,
    gpnDisplay: presetGpnDisplay,
  };
  return obj[themeName] || presetGpnDefault;
}

type ThemeContextProps = {
  theme: ThemeName;
  setTheme: Dispatch<SetStateAction<ThemeName>>;
};

const ThemeContext = createContext<ThemeContextProps>({
  theme: 'gpnDefault',
  setTheme: () => {},
});

export const useTheme = (): ThemeContextProps => useContext(ThemeContext);

export const ThemeRoot: React.FC<ThemeProps> = (props) => {
  const { themeName = 'gpnDefault', children } = props;
  const [theme, setTheme] = useState(themeName);

  const preset = getThemeByName(themeName);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Theme preset={preset}>{children}</Theme>
    </ThemeContext.Provider>
  );
};
