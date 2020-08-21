import React from "react";

export interface BaseNode {
  name: string,
  id?: string | number,
  handleDragStart?(event: React.DragEvent) : void,
  handleDragOver?(event: React.DragEvent) : void,
  handleDragDrop?(event: React.DragEvent) : void,
}

export interface NodeTreeType extends BaseNode {
  nodeList?: NodeTreeType[],
  leaf?: LeafType[] | LeafType,
  children: React.ReactNode,
}

export interface RootTreeProps extends BaseNode {
  nodeList: NodeTreeType[],
  leaf?: LeafType[] | LeafType,
}

export type LeafType = {
  name: string,
  handleDragStart(event: React.DragEvent) : void,
}
