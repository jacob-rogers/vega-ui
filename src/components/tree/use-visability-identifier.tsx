import React, { useEffect, useState } from 'react';

import { stateSaverService } from './entities/StateSaverService';
import cnTree from './cn-tree';
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
  hiddenItems?: HiddenItem[] | null;
};
type VisibilityIdentifierData = typeof children | typeof parent | null;

export const useVisibilityIdentifier = ({
  item,
  handleHide,
  hiddenItems,
}: UseVisibilityIdentifier): VisibilityIdentifierAPI => {
  const savedHiddenItemsIds = stateSaverService.getHiddenElements();

  const [
    visibilityIdentifierData,
    setVisibilityIdentifierData,
  ] = useState<VisibilityIdentifierData | null>(null);

  useEffect(() => {
    if (hiddenItems?.includes(item) || savedHiddenItemsIds.includes(item.id)) {
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
  }, [item, hiddenItems, savedHiddenItemsIds]);

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
