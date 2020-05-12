import React from 'react';
import { useMount, useUnmount } from '@vega-ui/hooks';

type AppContainerProps = {
  rootId?: string;
  portalRootId?: string;
  className?: string;
  portalClassName?: string;
};

export const AppContainer: React.FC<AppContainerProps> = ({
  rootId,
  portalRootId,
  children,
  className,
  portalClassName,
}) => {
  useMount(() => {
    const portalRoot = document.createElement('div');
    portalRoot.id = portalRootId as string;
    if (typeof portalClassName === 'string') {
      portalRoot.className = portalClassName;
    }
    document.body.appendChild(portalRoot);
  });

  useUnmount(() => {
    const portalRoot = document.querySelector(`#${portalRootId}`);
    if (portalRoot) {
      document.body.removeChild(portalRoot);
    }
  });

  return (
    <div className={className} id={rootId}>
      {children}
    </div>
  );
};

AppContainer.defaultProps = {
  rootId: 'rootSelector',
  portalRootId: 'portalRootSelector',
};
