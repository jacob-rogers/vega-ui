import React from 'react';

export interface BaseNode {
  name?: string;
  id?: string | number;
  iconId?: string | number;
  icons?: {
    [iconId: string]: React.ReactElement;
  };
  isDndEnable?: boolean;
  isContextMenuEnable?: boolean;
  withVisibilitySwitcher?: boolean;
  isShownLeftLines?: boolean;
  rootRef?: React.RefObject<HTMLElement>;
  selectedItems?: React.RefObject<HTMLElement>[] | null;
  isDraggable?: boolean;
  dndConstraintFor?: 'upper' | 'lower' | 'both';
  functionIcons?: React.ReactElement[];

  onDragStart?(event: React.DragEvent, ref: React.Ref<HTMLElement>): void;

  onDragEnter?(event: React.DragEvent, ref: React.Ref<HTMLElement>): void;

  onDragOver?(event: React.DragEvent): void;

  onDragDrop?(event: React.DragEvent): void;

  onDragEnd?(event: React.DragEvent): void;

  onContextMenu?(event: React.MouseEvent, ref: React.RefObject<HTMLElement>): void;

  onRenameItem?: () => void;
  onCopyItem?: () => void;
  onDeleteItem?: () => void;
  onPasteItem?: (transferringId: string | number, receivingId: string | number) => void;
  onSelectItem?: (ref: React.RefObject<HTMLElement | HTMLDivElement>) => void;
  hiddenItems?: React.RefObject<HTMLElement>[] | null;
  onHideItem?: (ref: React.RefObject<HTMLElement | HTMLLIElement>) => void;
}

export type DropZone = {
  ref: React.RefObject<HTMLElement> | null;
  accessible: boolean;
};

export interface NodeItem extends BaseNode {
  nodeList?: NodeItem[] | LeafTree[] | Array<NodeItem | LeafTree>;
  children?: React.ReactNode;
  dropZone?: DropZone | null;
}

export type RootProps = [NodeItem];

export interface LeafTree extends BaseNode {
  name: string;
}

export type NavigationEyeProps = {
  hidden: boolean;
  onHide: (event: React.MouseEvent | React.KeyboardEvent) => void;
};

export type ContextMenuData = {
  callerRef?: React.Ref<HTMLElement>;
  style?: {
    left: number | string;
    top: number | string;
  };
};

export type ContextMenuProps = {
  contextMenuData: ContextMenuData | null;
  closeContextMenu: () => void;
  handleRename?: () => void;
  handleCopy?: () => void;
  handleDelete?: () => void;
  handlePaste?: (transferringId: string | number, receivingId: string | number) => void;
};

export type ContextMenuListProps = Omit<ContextMenuProps, 'contextMenuData' | 'closeContextMenu'>;
