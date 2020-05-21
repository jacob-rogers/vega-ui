import React from 'react';
import { useMount } from '@gpn-prototypes/vega-hooks';

const defaultContainerId = 'portalRootSelector';

type PortalsRootProps = {
  className?: string;
  containerId?: string;
};

type PortalsRootContext = {
  containerId: string;
};

type PortalsRootAPI = {
  containerId: string;
  setClassName: (className: string) => void;
  getContainer: () => HTMLElement | null;
};

export const PortalsRootContext = React.createContext<PortalsRootContext>({
  containerId: defaultContainerId,
});

export const usePortalsRoot = (): PortalsRootAPI => {
  const { containerId } = React.useContext(PortalsRootContext);

  const getContainer = (): HTMLElement | null => document.getElementById(containerId);

  const setClassName = (className: string): void => {
    const container = getContainer();
    if (container) {
      container.className = className;
    }
  };

  return {
    getContainer,
    containerId,
    setClassName,
  };
};

export const PortalsRoot: React.FC<PortalsRootProps> = ({
  containerId = defaultContainerId,
  children,
  className,
}) => {
  const [container, setContainer] = React.useState(document.getElementById(containerId));

  const createPortalRoot = (): void => {
    if (container === null) {
      const portalContainer = document.createElement('div');
      portalContainer.id = containerId;
      if (className) {
        portalContainer.className = className;
      }
      document.body.appendChild(portalContainer);
      setContainer(portalContainer);
    }
  };

  useMount(() => {
    createPortalRoot();
  });

  if (!container) {
    return null;
  }

  return (
    <PortalsRootContext.Provider value={{ containerId }}>{children}</PortalsRootContext.Provider>
  );
};
