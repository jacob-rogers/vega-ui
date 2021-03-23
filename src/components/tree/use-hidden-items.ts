import { useState } from 'react';

import { StateSaverService } from './entities/StateSaverService';
import { HiddenItem } from './types';

type UseHiddenItems = {
  hiddenItems: HiddenItem[];
  handleHideItem(item: HiddenItem, onHideItem: ((items: HiddenItem[]) => void) | undefined): void;
  handleRestoreHiddenItem(item: HiddenItem): void;
};

export const useHiddenItems = (projectId?: string): UseHiddenItems => {
  const [hiddenItems, setHiddenItems] = useState<HiddenItem[]>([]);

  const stateSaverService = new StateSaverService();
  stateSaverService.setProjectId(projectId);

  const savedHiddenElements = stateSaverService.getHiddenElements();

  const handleHideItem = (item: HiddenItem, onHideItem: (items: HiddenItem[]) => void): void => {
    if (hiddenItems?.find((hiddenItem) => hiddenItem.id === item.id)) {
      const newState = hiddenItems.filter((hiddenItem) => hiddenItem.id !== item.id);

      setHiddenItems([...newState]);

      stateSaverService.setHiddenElements(newState.map((hiddenItem) => hiddenItem.id));

      if (onHideItem) {
        onHideItem([...newState, item]);
      }
      return;
    }

    const newHiddenItems = [...hiddenItems, item];
    setHiddenItems(newHiddenItems);

    stateSaverService.setHiddenElements(newHiddenItems.map((hiddenItem) => hiddenItem.id));

    if (onHideItem) {
      onHideItem(newHiddenItems);
    }
  };

  const handleRestoreHiddenItem = (item: HiddenItem) => {
    if (
      savedHiddenElements.includes(item.id) &&
      !hiddenItems.find((hiddenItem) => hiddenItem.id === item.id)
    ) {
      setHiddenItems([...hiddenItems, item]);
    }
  };

  return {
    hiddenItems,
    handleHideItem,
    handleRestoreHiddenItem,
  };
};
