import React from 'react';

import { DropZone, HiddenItem, TargetData } from './types';

type TreeApi = {
  treeContainerWidth?: number | string;
  showIndentGuides: boolean;
  selectedItems: TargetData[];
  hiddenItems: HiddenItem[] | null;
  contextMenuTarget: React.RefObject<HTMLElement> | null;
  withVisibilitySwitcher?: boolean;
  withDropZoneIndicator?: boolean;
  actionItemComponents?: React.ReactElement[];
  icons?: {
    [iconId: string]: React.ReactElement;
  };
  isDndEnable: boolean;
  projectId?: string;
  onContextMenu?(event: React.MouseEvent, ref: React.RefObject<HTMLElement>): void;
  onDragStart?(event: React.DragEvent, dragItem: TargetData): void;
  onDragEnter?(event: React.DragEvent, dropZoneItem: TargetData & { isDropZone: boolean }): void;
  onDragOver?(event: React.DragEvent): void;
  onDragDrop?(event: React.DragEvent): void;
  onDragLeave?(event: React.DragEvent, id: string): void;
  onDragEnd?(event: React.DragEvent): void;
  dropZone?: DropZone | null;
  onSelectItem?: (selectedItem: TargetData) => void;
  onHideItem?: (item: HiddenItem) => void;
  onRestoreHiddenItem?: (item: HiddenItem) => void;
};

const TreeContext = React.createContext<TreeApi>({
  withVisibilitySwitcher: true,
  showIndentGuides: true,
  selectedItems: [],
  contextMenuTarget: null,
  hiddenItems: [],
  isDndEnable: true,
});

export default TreeContext;
