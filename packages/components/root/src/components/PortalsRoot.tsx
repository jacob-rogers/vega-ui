import React, { createContext, RefObject, useContext } from 'react';
import { createPortal } from 'react-dom';

import { getThemeByName, Theme, useTheme } from './ThemeRoot';

type PortalNames = 'default';

export type PortalRef = RefObject<Record<PortalNames, HTMLDivElement | null>>;

type DivProps = JSX.IntrinsicElements['div'];

export type PortalParams = {
  className?: string;
  id: string;
  innerRef: PortalRef;
} & DivProps;

type PortalContextProps = PortalRef;

export const PortalsContext = createContext<PortalContextProps>({ current: null });

export const usePortal = (name: PortalNames = 'default'): HTMLDivElement | null => {
  const portals = useContext(PortalsContext);

  if (portals.current !== null && name in portals.current) {
    return portals.current[name];
  }

  return null;
};

export const PortalsRoot: React.FC<PortalParams> = (props) => {
  const { id, innerRef, ...rest } = props;

  const { theme } = useTheme();

  const setRef = (el: HTMLDivElement | null): void => {
    if (el !== null && innerRef.current) {
      innerRef.current.default = el;
    }
  };

  const content = (
    <Theme preset={getThemeByName(theme)}>
      <div {...rest} ref={setRef} id={id} />
    </Theme>
  );

  return createPortal(content, document.body);
};
