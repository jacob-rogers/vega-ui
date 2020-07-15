import React, { createContext, ReactPortal, RefObject, useContext, useRef } from 'react';
import { createPortal } from 'react-dom';
import { usePortals } from '@gpn-prototypes/vega-hooks';

import { getThemeByName, Theme, useTheme } from './ThemeRoot';

export type PortalRef = RefObject<{
  [key: string]: HTMLDivElement;
}>;

type DivProps = JSX.IntrinsicElements['div'];

export type PortalParams = {
  className?: string;
  id: string;
} & DivProps;

type PortalContextProps = {
  portals: PortalRef;
};

type RenderPortalWithTheme = (children: React.ReactNode, container: Element) => ReactPortal;

export const PortalsContext = createContext<PortalContextProps>({
  portals: { current: {} },
});

export const usePortal = (
  name = 'default',
): {
  portal: HTMLDivElement | null | undefined;
} => {
  const { portals } = useContext(PortalsContext);

  const getPortal = (): HTMLDivElement | null | undefined => {
    if (portals.current !== null && name in portals.current) {
      return portals.current[name];
    }

    return undefined;
  };

  return { portal: getPortal() };
};

export const usePortalRender = (): { renderPortalWithTheme: RenderPortalWithTheme } => {
  const { theme } = useTheme();

  const renderPortalWithTheme = React.useCallback(
    (children: React.ReactNode, container: Element) => {
      return createPortal(<Theme preset={getThemeByName(theme)}>{children}</Theme>, container);
    },
    [theme],
  );

  return { renderPortalWithTheme };
};

export const PortalsRoot: React.FC<PortalParams> = (props) => {
  const { children } = props;

  const { ref } = usePortals([
    {
      name: 'default',
      parentSelector: 'body',
    },
  ]);

  return (
    <>
      <PortalsContext.Provider value={{ portals: ref }}>{children}</PortalsContext.Provider>
    </>
  );
};
