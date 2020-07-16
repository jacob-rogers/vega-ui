import React, { createContext, ReactPortal, RefObject, useContext } from 'react';
import { createPortal } from 'react-dom';
import {
  PortalParams,
  PortalsAPI,
  PortalsMap,
  useMount,
  usePortals,
  useUnmount,
} from '@gpn-prototypes/vega-hooks';

import { getThemeByName, Theme, useTheme } from './ThemeRoot';

export type PortalRef = RefObject<PortalsMap>;

type PortalContextProps = PortalsAPI;

type RenderPortalWithTheme = (children: React.ReactNode, container: Element) => ReactPortal;

export const PortalsContext = createContext<PortalContextProps>({
  ref: { current: {} },
  append: () => {},
  remove: () => {},
  createContainer: () => {},
});

export const usePortal = (
  params: PortalParams = { name: 'portalsRoot' },
): {
  portal: HTMLDivElement | null | undefined;
} => {
  const { ref, append, createContainer, remove } = useContext(PortalsContext);

  if (!ref.current[params.name]) {
    createContainer(params);
  }

  useMount(() => {
    append(params);
  });

  useUnmount(() => {
    remove(params.name);
  });

  return { portal: ref.current[params.name] };
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

type PortalsRootProps = {
  initialPortals: PortalParams[];
};

export const PortalsRoot: React.FC<PortalsRootProps> = (props) => {
  const { children, initialPortals } = props;

  const { ref, append, createContainer, remove } = usePortals(initialPortals);

  return (
    <>
      <PortalsContext.Provider value={{ ref, append, createContainer, remove }}>
        {children}
      </PortalsContext.Provider>
    </>
  );
};
