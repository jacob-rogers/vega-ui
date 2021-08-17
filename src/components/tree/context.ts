import React from 'react';

import { ContextMenuTarget, DropZone, HiddenItem, TargetData } from './types';

type TreeApi = {
  treeContainerWidth?: number | string;
  showIndentGuides: boolean;
  selectedItems: TargetData[];
  hiddenItems: HiddenItem[] | null;
  checkedItems: string[];
  intermediateItems: string[];
  contextMenuTarget: ContextMenuTarget | null;
  withVisibilitySwitcher?: boolean;
  withCheckElementSwitcher?: boolean;
  withDropZoneIndicator?: boolean;
  actionItemComponents?: React.ReactElement[];
  icons?: {
    [iconId: string]: React.ReactElement;
  };
  isDndEnable: boolean;
  projectId?: string;
  onContextMenu?(event: React.MouseEvent, target: ContextMenuTarget): void;
  onDragStart?(event: React.DragEvent, dragItem: TargetData): void;
  onDragEnter?(event: React.DragEvent, dropZoneItem: TargetData & { isDropZone: boolean }): void;
  onDragOver?(event: React.DragEvent): void;
  onDragDrop?(event: React.DragEvent): void;
  onDragLeave?(event: React.DragEvent, id: string): void;
  onDragEnd?(event: React.DragEvent): void;
  dropZone?: DropZone | null;
  onSelectItem?: (selectedItem: TargetData) => void;
  onHideItem?: (item: HiddenItem) => void;
  onCheckItem?: (item: string) => void;
  onRestoreHiddenItem?: (item: HiddenItem) => void;
  onRestoreCheckedItem?: (item: HiddenItem) => void;
};

const TreeContext = React.createContext<TreeApi>({
  withVisibilitySwitcher: true,
  withCheckElementSwitcher: true,
  showIndentGuides: true,
  selectedItems: [],
  contextMenuTarget: null,
  hiddenItems: [],
  checkedItems: [],
  intermediateItems: [],
  isDndEnable: true,
});

export default TreeContext;
