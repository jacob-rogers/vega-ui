import React, { HTMLAttributes } from 'react';

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

export const usePortalDomNode = (
  parentSelector = 'body',
  params: HTMLAttributes<HTMLDivElement> = {},
): OptionalElement<HTMLDivElement> => {
  const ref = React.useRef<OptionalElement<HTMLDivElement>>(null);

  if (ref.current === null) {
    ref.current = document.createElement('div');
  }

  useIsomorphicEffect(() => {
    const keys = Object.keys(params) as Array<keyof HTMLAttributes<HTMLDivElement>>;
    keys.forEach((param) => {
      if (ref.current !== null) {
        ref.current.setAttribute(param, params[param]);
      }
    });
  }, [params]);

  useIsomorphicEffect(() => {
    const parent = getParentNode(parentSelector);

    if (ref.current && parent) {
      parent.appendChild(ref.current);
    }

    return (): void => {
      if (ref.current && parent) {
        parent.removeChild(ref.current);
      }
    };
  }, [parentSelector]);

  return ref.current;
};
