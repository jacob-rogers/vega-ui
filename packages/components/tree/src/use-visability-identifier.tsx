import React, { useEffect, useState } from 'react';

import NavigationDot from '../NavigationDotSvg';

import cnTree from './cn-tree';
import TreeNavigationEye from './TreeNavigationEye';
import { NavigationEyeProps } from './types';

type VisibilityIdentifierAPI = {
  renderVisibilitySwitcher: () => React.ReactElement;
  isHidden: boolean;
};

const children = 'children';
const parent = 'parent';
type UseVisibilityIdentifier = {
  ref: React.RefObject<HTMLElement>;
  handleHide: (event: React.MouseEvent | React.KeyboardEvent) => void;
  hiddenItems?: React.RefObject<HTMLElement>[] | null;
};
type VisibilityIdentifierData = typeof children | typeof parent | null;

export const useVisibilityIdentifier = ({
  ref,
  handleHide,
  hiddenItems,
}: UseVisibilityIdentifier): VisibilityIdentifierAPI => {
  const [
    visibilityIdentifierData,
    setVisibilityIdentifierData,
  ] = useState<VisibilityIdentifierData | null>(null);

  useEffect(() => {
    if (hiddenItems?.includes(ref)) {
      setVisibilityIdentifierData(parent);

      return;
    }

    const isHiddenAsChild = hiddenItems?.some((_ref) => {
      const isValidElms = _ref.current instanceof HTMLElement && ref.current instanceof HTMLElement;

      if (!isValidElms) {
        return undefined;
      }

      return _ref.current?.contains(ref.current);
    });

    if (isHiddenAsChild) {
      setVisibilityIdentifierData(children);

      return;
    }

    setVisibilityIdentifierData(null);
  }, [ref, hiddenItems]);

  const renderVisibilitySwitcher = (): React.ReactElement<NavigationEyeProps> => {
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
    renderVisibilitySwitcher,
    isHidden: !!visibilityIdentifierData,
  };
};
