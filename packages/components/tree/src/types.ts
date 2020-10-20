import React from 'react';

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

export interface TreeItem {
  name: string;
  nodeList: Array<TreeItem>;
  id: string;
  parentId?: string;
  iconId?: string | number;
  rootRef?: React.RefObject<HTMLElement>;
  isDraggable?: boolean;
  isDropZone?: boolean;
  isExpanded?: boolean;
}

export type TreeProps = {
  nodeList: TreeItem[];
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
  onRenameItem?: () => void;
  onDuplicateItem?: () => void;
  onDeleteItem?: () => void;
  onPasteItem?: (transferringIds: string[], receivingId: string) => void;
  onDragStart?: (transferringElems: Array<TargetData>) => void;
  onDragEnd?: () => void;
};

export type NavigationEyeProps = {
  hidden: boolean;
  onHide: (event: React.MouseEvent | React.KeyboardEvent) => void;
};
