import React from 'react';
import { useMount, useUnmount } from '@gpn-prototypes/vega-hooks';

import { AppContainerManager } from './AppContainerManager';

const defaultPortalcontainerId = 'portalRootSelector';
const defaultcontainerId = 'rootSelector';

type AppContainerProps = {
  appContainerManager: AppContainerManager;
  className?: string;
  portalRootClassName?: string;
} & JSX.IntrinsicElements['div'];

type AppContainerManagerContext = {
  appContainerManager: AppContainerManager;
};

export const AppContainerContext = React.createContext<AppContainerManagerContext>({
  appContainerManager: new AppContainerManager(defaultcontainerId, defaultPortalcontainerId),
});

export const useAppContainerManager = (): AppContainerManager => {
  const { appContainerManager } = React.useContext(AppContainerContext);
  return appContainerManager;
};

export const AppContainer: React.FC<AppContainerProps> = ({
  appContainerManager,
  children,
  className,
  portalRootClassName,
  ...rest
}) => {
  useMount(() => {
    if (appContainerManager.portalcontainerId) {
      appContainerManager.createPortalRoot({ className: portalRootClassName });
    }
  });

  useUnmount(() => {
    appContainerManager.removePortalRoot();
  });

  return (
    <div className={className} id={appContainerManager.containerId} {...rest}>
      <AppContainerContext.Provider value={{ appContainerManager }}>
        {children}
      </AppContainerContext.Provider>
    </div>
  );
};
