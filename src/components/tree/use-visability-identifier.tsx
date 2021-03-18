import React, { useContext, useEffect, useState } from 'react';

import cnTree from './cn-tree';
import TreeContext from './context';
import NavigationDot from './NavigationDotSvg';
import TreeNavigationEye from './TreeNavigationEye';
import { HiddenItem, NavigationEyeProps } from './types';

type VisibilityIdentifierAPI = {
  renderVisibilitySwitcher: () => React.ReactElement;
  isHidden: boolean;
};

const children = 'children';
const parent = 'parent';
type UseVisibilityIdentifier = {
  item: HiddenItem;
  handleHide: (event: React.MouseEvent | React.KeyboardEvent) => void;
};
type VisibilityIdentifierData = typeof children | typeof parent | null;

export const useVisibilityIdentifier = ({
  item,
  handleHide,
}: UseVisibilityIdentifier): VisibilityIdentifierAPI => {
  const { hiddenItems } = useContext(TreeContext);

  const [
    visibilityIdentifierData,
    setVisibilityIdentifierData,
  ] = useState<VisibilityIdentifierData | null>(null);

  useEffect(() => {
    if (hiddenItems?.find((hiddenItem) => hiddenItem.id === item.id)) {
      setVisibilityIdentifierData(parent);

      return;
    }

    const isHiddenAsChild = hiddenItems?.some((_item) => {
      const isValidElms =
        _item.ref.current instanceof HTMLElement && item.ref.current instanceof HTMLElement;

      if (!isValidElms) {
        return undefined;
      }

      return _item.ref.current?.contains(item.ref.current);
    });

    if (isHiddenAsChild) {
      setVisibilityIdentifierData(children);

      return;
    }

    setVisibilityIdentifierData(null);
  }, [item, hiddenItems]);

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
