import React, { RefObject } from 'react';

export type TargetData = {
  ref: React.RefObject<HTMLElement> | null;
  id: string;
  isDraggable: boolean;
};

export type DropZone = {
  ref: React.RefObject<HTMLElement> | null;
  accessible: boolean;
  id: string;
};

export interface TreeItem<T = unknown> {
  name: string;
  nodeList: Array<TreeItem<T>>;
  id: string;
  parentId?: string;
  iconId?: string | number;
  rootRef?: React.RefObject<HTMLElement>;
  isDraggable?: boolean;
  isDropZone?: boolean;
  isExpanded?: boolean;
}

export type ContextMenuItem = {
  callback: (id: string) => void;
  title: string;
  key: string;
  withSeparator?: boolean;
};

export type TreeProps<T = unknown> = {
  nodeList: TreeItem<T>[];
  contextMenuItems?: ContextMenuItem[];
  icons?: {
    [iconId: string]: React.ReactElement;
  };
  dndConstraintFor?: 'upper' | 'lower' | 'both';
  actionItemComponents?: React.ReactElement[];
  isDndEnable?: boolean;
  isContextMenuEnable?: boolean;
  withVisibilitySwitcher?: boolean;
  withDropZoneIndicator?: boolean;
  showIndentGuides?: boolean;
  withMultiSelect?: boolean;
  onRenameItem?: () => void;
  onDuplicateItem?: () => void;
  onDeleteItem?: () => void;
  onPasteItem?: (transferringIds: string[], receivingId: string) => void;
  onDragStart?: (transferringElems: Array<TargetData>) => void;
  onDragEnd?: () => void;
  onSelectItem?: (items: TargetData[]) => void;
  onHideItem?: (items: RefObject<HTMLElement>[]) => void;
};

export type NavigationEyeProps = {
  hidden: boolean;
  onHide: (event: React.MouseEvent | React.KeyboardEvent) => void;
};
