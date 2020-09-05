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
  rootRef?: React.RefObject<HTMLElement>;
  selectedItems?: React.RefObject<HTMLElement>[] | null;
  isDraggable?: boolean;
  dndConstraintFor?: 'upper' | 'lower' | 'both';

  onDragStart?(event: React.DragEvent, ref: React.Ref<HTMLElement>): void;

  onDragOver?(event: React.DragEvent, ref: React.Ref<HTMLElement>): void;

  onDragDrop?(event: React.DragEvent): void;

  onDragEnd?(event: React.DragEvent): void;

  onContextMenu?(event: React.MouseEvent, ref: React.RefObject<HTMLElement>): void;

  onRenameItem?: () => void;
  onCopyItem?: () => void;
  onDeleteItem?: () => void;
  onPasteItem?: () => void;
  onSelectItem?: (ref: React.RefObject<HTMLElement | HTMLDivElement>) => void;
  hiddenItems?: React.RefObject<HTMLElement>[] | null;
  onHideItem?: (ref: React.RefObject<HTMLElement | HTMLLIElement>) => void;
}

export interface NodeItem extends BaseNode {
  nodeList?: NodeItem[] | LeafTree[] | Array<NodeItem | LeafTree>;
  children?: React.ReactNode;
  dropZone?: React.Ref<HTMLElement> | null;
}

export type RootProps = [NodeItem];

export interface LeafTree extends BaseNode {
  name: string;
}

export type NavigationEyeProps = {
  hidden: boolean;
  onHide: (event: React.MouseEvent | React.KeyboardEvent) => void;
};
