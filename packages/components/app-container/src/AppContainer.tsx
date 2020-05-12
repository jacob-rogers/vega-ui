import React from 'react';
import { useMount, useUnmount } from '@vega-ui/hooks';

import { AppContainerManager } from './AppContainerManager';

const defaultPortalRootId = 'portalRootSelector';
const defaultRootId = 'rootSelector';

type AppContainerProps = {
  appContainerManager: AppContainerManager;
  className?: string;
  portalClassName?: string;
} & JSX.IntrinsicElements['div'];

type AppContainerManagerContext = {
  appContainerManager: AppContainerManager;
};

export const AppContainerContext = React.createContext<AppContainerManagerContext>({
  appContainerManager: new AppContainerManager(defaultRootId, defaultPortalRootId),
});

export const useAppContainerManager = (): AppContainerManager => {
  const { appContainerManager } = React.useContext(AppContainerContext);
  return appContainerManager;
};

export const AppContainer: React.FC<AppContainerProps> = ({
  appContainerManager,
  children,
  className,
  portalClassName,
  ...rest
}) => {
  useMount(() => {
    appContainerManager.createPortalRoot({ className: portalClassName });
  });

  useUnmount(() => {
    appContainerManager.removePortalRoot();
  });

  return (
    <div className={className} id={appContainerManager.rootId} {...rest}>
      <AppContainerContext.Provider value={{ appContainerManager }}>
        {children}
      </AppContainerContext.Provider>
    </div>
  );
};
