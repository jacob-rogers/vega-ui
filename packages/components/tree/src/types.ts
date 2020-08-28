import React from 'react';

export interface BaseNode {
  name: string;
  id?: string | number;
  currentDraggingElement?: HTMLElement | null;
  selectedItems?: React.Ref<HTMLElement>[] | null;
  handleDragStart?(event: React.DragEvent): void;
  handleDragOver?(event: React.DragEvent): void;
  handleDragDrop?(event: React.DragEvent): void;
  handleContextMenu?(event: React.MouseEvent, ref: React.Ref<HTMLElement>): void;
  handleRename?: () => void;
  handleCopy?: () => void;
  handleDelete?: () => void;
  handlePaste?: () => void;
  handleSelectItem?: (ref: React.Ref<HTMLElement | HTMLDivElement>) => void;
}

export interface NodeTreeType extends BaseNode {
  nodeList?: NodeTreeType[];
  children?: React.ReactNode;
}

export interface RootTreeProps extends BaseNode {
  nodeList: NodeTreeType[];
}

export type LeafType = BaseNode;
