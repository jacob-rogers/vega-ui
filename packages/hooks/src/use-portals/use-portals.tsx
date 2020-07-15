import React, { HTMLAttributes, useRef } from 'react';

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

type PortalParams = {
  parentSelector?: string;
  name: string;
  className?: string;
};

type PortalsMap = {
  [key: string]: HTMLDivElement;
};

type UsePortalsAPI = {
  ref: React.MutableRefObject<PortalsMap>;
};

export const usePortals = (portals: PortalParams[]): UsePortalsAPI => {
  const ref = useRef<PortalsMap>({});

  portals.forEach((portal) => {
    if (ref.current[portal.name] === undefined) {
      ref.current[portal.name] = document.createElement('div');
    }

    if (portal.className) {
      ref.current[portal.name].className = portal.className;
    }
  });

  useIsomorphicEffect(() => {
    portals.forEach((portal) => {
      const currentPortal = ref.current[portal.name];
      const parent = portal.parentSelector ? getParentNode(portal.parentSelector) : document.body;
      if (currentPortal && parent) {
        parent.appendChild(currentPortal);
      }
    });

    return (): void => {
      Object.keys(ref.current).forEach((portalName) => {
        const parent = ref.current[portalName].parentElement;

        if (parent) {
          parent.removeChild(ref.current[portalName]);
        }
      });
    };
  }, [portals]);

  return { ref };
};
