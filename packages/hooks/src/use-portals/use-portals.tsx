import React, { useRef } from 'react';

const isServer = typeof window === 'undefined';

export const useIsomorphicEffect = isServer ? React.useEffect : React.useLayoutEffect;

type OptionalElement<T extends Element> = T | null;

function getParentNode(selector: string): OptionalElement<Element> {
  const isIDSelector = selector[0] === '#';
  const parentNode = isIDSelector
    ? document.getElementById(selector.substr(1))
    : document.querySelector(selector);

  return parentNode;
}

export type PortalParams = {
  parentSelector?: string;
  name: string;
  className?: string;
};

export type PortalsMap = {
  [key: string]: HTMLDivElement;
};

export type PortalsAPI = {
  ref: React.MutableRefObject<PortalsMap>;
  createContainer(portal: PortalParams): void;
  append(portal: PortalParams): void;
  remove(portalName: string): void;
};

export const usePortals = (portals: PortalParams[] | PortalParams): PortalsAPI => {
  const params = Array.isArray(portals) ? portals : [portals];

  const ref = useRef<PortalsMap>({});

  const createPortalContainer = (portal: PortalParams): void => {
    if (ref.current[portal.name] === undefined) {
      ref.current[portal.name] = document.createElement('div');
    }

    if (portal.className) {
      ref.current[portal.name].className = portal.className;
    }

    ref.current[portal.name].id = portal.name;
  };

  const appendPortal = (portal: PortalParams): void => {
    const currentPortal = ref.current[portal.name];
    const parent = portal.parentSelector ? getParentNode(portal.parentSelector) : document.body;
    if (currentPortal && parent && !parent.contains(currentPortal)) {
      parent.appendChild(currentPortal);
    }
  };

  const removePortal = (portalName: string): void => {
    const parent = ref.current[portalName].parentElement;

    if (parent) {
      parent.removeChild(ref.current[portalName]);
    }
  };

  if (Object.keys(ref.current).length === 0) {
    params.forEach((portal) => {
      createPortalContainer(portal);
    });
  }

  useIsomorphicEffect(() => {
    params.forEach((portal) => {
      appendPortal(portal);
    });

    return (): void => {
      params.forEach(({ name }) => {
        removePortal(name);
      });
    };
  }, [params]);

  return {
    ref,
    createContainer: createPortalContainer,
    append: appendPortal,
    remove: removePortal,
  };
};
