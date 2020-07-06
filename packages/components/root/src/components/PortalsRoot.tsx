import React, { createContext, MutableRefObject, useContext, useRef } from 'react';
import { createPortal } from 'react-dom';

import { getThemeByName, Theme, useTheme } from './ThemeRoot';

type DivProps = JSX.IntrinsicElements['div'];

export type PortalParams = {
  className?: string;
  id: string;
} & DivProps;

type PortalContextProps = MutableRefObject<HTMLDivElement | null>;

const PortalsContext = createContext<PortalContextProps>({ current: null });

export const usePortal = (): PortalContextProps => useContext(PortalsContext);

export const PortalsRoot: React.FC<PortalParams> = (props) => {
  const { id, ...rest } = props;

  const { theme } = useTheme();

  const ref = useRef<HTMLDivElement | null>(null);

  const content = (
    <Theme preset={getThemeByName(theme)}>
      <PortalsContext.Provider value={ref}>
        <div {...rest} id={id} />
      </PortalsContext.Provider>
    </Theme>
  );

  return createPortal(content, document.body);
};
