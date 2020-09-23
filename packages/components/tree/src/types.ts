import React from 'react';

export type TargetData = {
  ref: React.RefObject<HTMLElement | HTMLLIElement> | null;
  id: string;
};

export interface BaseNode {
  id: string;
  parentId?: string;
  iconId?: string | number;
  rootRef?: React.RefObject<HTMLElement>;
  isDraggable?: boolean;
  isDropZone?: boolean;
}

export type DropZone = {
  ref: React.RefObject<HTMLElement> | null;
  accessible: boolean;
  id: string;
};

export interface TreeItem extends BaseNode {
  name: string;
  nodeList: Array<TreeItem>;
}

export interface TreeLeaf extends BaseNode {
  name: string;
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
  showIndentGuides?: boolean;
  onRenameItem?: () => void;
  onDuplicateItem?: () => void;
  onDeleteItem?: () => void;
  onPasteItem?: (transferringIds: string[], receivingId: string) => void;
};

export type NavigationEyeProps = {
  hidden: boolean;
  onHide: (event: React.MouseEvent | React.KeyboardEvent) => void;
};
