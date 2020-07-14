import React, { createContext, ReactPortal, RefObject, useContext, useRef } from 'react';
import { createPortal } from 'react-dom';
import { usePortalDomNode } from '@gpn-prototypes/vega-hooks';

import { getThemeByName, Theme, useTheme } from './ThemeRoot';

type PortalNames = 'default';

export type PortalRef = RefObject<Record<PortalNames, HTMLDivElement | null>>;

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
  portals: { current: null },
});

export const usePortal = (
  name: PortalNames = 'default',
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
  const { id, children, ...rest } = props;

  const portalContainer = usePortalDomNode('body', { id, ...rest });

  const ref: PortalRef = useRef({ default: portalContainer });

  if (!portalContainer) {
    return null;
  }

  return (
    <>
      <PortalsContext.Provider value={{ portals: ref }}>{children}</PortalsContext.Provider>
    </>
  );
};
