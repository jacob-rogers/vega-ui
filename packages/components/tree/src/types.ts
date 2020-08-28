import React from 'react';

export interface BaseNode {
  name: string;
  id?: string | number;
  selectedItems?: React.Ref<HTMLElement>[] | null;
  isDraggable?: boolean;
  onlyDropZone?: boolean;
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
}

export interface NodeTreeType extends BaseNode {
  nodeList?: NodeTreeType[];
  children?: React.ReactNode;
  dropZone?: React.Ref<HTMLElement> | null;
}

export interface RootTreeProps extends BaseNode {
  nodeList: NodeTreeType[];
}

export type LeafType = BaseNode;
