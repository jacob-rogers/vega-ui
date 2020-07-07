import React, { createContext, RefObject, useContext } from 'react';
import { createPortal } from 'react-dom';

import { getThemeByName, Theme, useTheme } from './ThemeRoot';

export type PortalRef = RefObject<{ default: HTMLDivElement | null }>;

type DivProps = JSX.IntrinsicElements['div'];

export type PortalParams = {
  className?: string;
  id: string;
  innerRef: PortalRef;
} & DivProps;

type PortalContextProps = PortalRef;

export const PortalsContext = createContext<PortalContextProps>({ current: null });

export const usePortal = (): PortalContextProps => useContext(PortalsContext);

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
