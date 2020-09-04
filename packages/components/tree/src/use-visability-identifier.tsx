import React, { useEffect, useState } from 'react';

import cnTree from './cn-tree';
import TreeNavigationEye from './TreeNavigationEye';
import { NavigationEyeProps } from './types';

const NavigationDot: React.FC = () => (
  <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="2" cy="2" r="2" fill="white" fillOpacity="0.3" />
  </svg>
);

const children = 'children';
const parent = 'parent';
type UseVisibilityIdentifier = {
  ref: React.RefObject<HTMLElement>;
  handleHide: (event: React.MouseEvent | React.KeyboardEvent) => void;
  hiddenItems?: React.RefObject<HTMLElement>[] | null;
};
type VisibilityIdentifierData = 'children' | 'parent' | null;

export const useVisibilityIdentifier = ({
  ref,
  handleHide,
  hiddenItems,
}: UseVisibilityIdentifier) => {
  const [
    visibilityIdentifierData,
    setVisibilityIdentifierData,
  ] = useState<VisibilityIdentifierData | null>(null);

  useEffect(() => {
    if (hiddenItems?.includes(ref)) {
      setVisibilityIdentifierData(parent);

      return;
    }

    if (
      hiddenItems?.some((_ref: React.RefObject<HTMLElement>) => {
        return _ref.current?.contains(ref.current as Node);
      })
    ) {
      setVisibilityIdentifierData(children);

      return;
    }

    setVisibilityIdentifierData(null);
  }, [ref, hiddenItems]);

  const renderNavigationIcon = (): React.ReactElement<NavigationEyeProps> => {
    if (visibilityIdentifierData === children) {
      return (
        <button className={cnTree('NavigationDot')} type="button">
          <NavigationDot />
        </button>
      );
    }

    return <TreeNavigationEye hidden={!!visibilityIdentifierData} onHide={handleHide} />;
  };

  return {
    renderNavigationIcon,
    visibilityIdentifierData,
  };
};
