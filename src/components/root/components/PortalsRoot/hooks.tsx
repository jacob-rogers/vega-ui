import React, { useCallback, useContext } from 'react';
import { createPortal } from 'react-dom';

import { PortalParams, useMount, useUnmount } from '../../../../hooks';
import { getThemeByName, Theme, useTheme } from '../ThemeRoot';

import { PortalsContext } from './PortalsRootContext';
import { RenderPortalWithTheme } from './types';

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

  const renderPortalWithTheme = useCallback(
    (children: React.ReactNode, container: Element, className?: string) => {
      return createPortal(
        <Theme preset={getThemeByName(theme)} className={className}>
          {children}
        </Theme>,
        container,
      );
    },
    [theme],
  );

  return { renderPortalWithTheme };
};
