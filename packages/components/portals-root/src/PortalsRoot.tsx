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
  getContainer: () => HTMLElement | null;
};

export const PortalsRootContext = React.createContext<PortalsRootContext>({
  containerId: defaultContainerId,
});

export const usePortalsRoot = (): PortalsRootAPI => {
  const { containerId } = React.useContext(PortalsRootContext);

  const getContainer = (): HTMLElement | null => document.getElementById(containerId);

  return {
    getContainer,
    containerId,
  };
};

export const PortalsRoot: React.FC<PortalsRootProps> = ({
  containerId = defaultContainerId,
  children,
  className,
}) => {
  const containerRef = React.useRef<HTMLElement | null>(document.getElementById(containerId));

  const createPortalRoot = (): HTMLElement => {
    if (containerRef.current === null) {
      const portalContainer = document.createElement('div');
      portalContainer.id = containerId;
      if (className) {
        portalContainer.className = className;
      }
      document.body.appendChild(portalContainer);
      return portalContainer;
    }
    return containerRef.current;
  };

  useMount(() => {
    const container = createPortalRoot();
    containerRef.current = container;
  });

  return (
    <PortalsRootContext.Provider value={{ containerId }}>{children}</PortalsRootContext.Provider>
  );
};
