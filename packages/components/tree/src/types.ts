import React from 'react';

export interface BaseNode {
  name?: string;
  id?: string | number;
  iconId?: string | number;
  icons?: {
    [iconId: string]: React.ReactElement
  };
  selectedItems?: React.Ref<HTMLElement>[] | null;
  isDraggable?: boolean;
  handleDragStart?(event: React.DragEvent, ref: React.Ref<HTMLElement>): void;
  handleDragOver?(event: React.DragEvent, ref: React.Ref<HTMLElement>): void;
  handleDragDrop?(event: React.DragEvent): void;
  handleDragEnd?(event: React.DragEvent): void;
  handleContextMenu?(event: React.MouseEvent, ref: React.Ref<HTMLElement>): void;
  handleRename?: () => void;
  handleCopy?: () => void;
  handleDelete?: () => void;
  handlePaste?: () => void;
  handleSelectItem?: (ref: React.Ref<HTMLElement | HTMLDivElement>) => void;
  hiddenItems?: React.RefObject<HTMLElement>[] | null;
  handleHideItem?: (ref: React.RefObject<HTMLElement | HTMLLIElement>) => void;
}

export interface NodeTree extends BaseNode {
  nodeList?: NodeTree[];
  children?: React.ReactNode;
  dropZone?: React.Ref<HTMLElement> | null;
}

export type RootProps = [NodeTree]

export interface LeafTree extends BaseNode {
  name: string;
}

export type NavigationEyeProps = {
  hidden: boolean;
  handleHide: (event: React.MouseEvent | React.KeyboardEvent) => void;
}
