import Konva from 'konva';

import { Tree } from './entities/Tree';

export type Position = {
  x: number;
  y: number;
};

export type Coordinates = { parent: Position; child: Position };

export type Size = { width: number; height: number };

export type RectParams = Position & Size;

export type BaseProps = {
  position: Position;
  name: string;
  fill?: string;
  height?: number;
  width?: number;
  onPositionChange?: (position: Position, positionDelta: Position) => void;
};

export type KonvaMouseEvent = Konva.KonvaEventObject<MouseEvent>;
export type KonvaDragEvent = Konva.KonvaEventObject<DragEvent>;

export type ConnectorType = 'parent' | 'children';
export type ConnectorActivateData = { type: ConnectorType; position: Position };

export type ItemConnectorData = {
  type: ConnectorType;
  position: Position;
};

export type ActiveData = {
  item: CanvasTree;
  connector: ItemConnectorData;
};

export type SelectedData =
  | { type: 'item'; ids: string[] }
  | { type: 'line'; parentId: string; childId: string };

export type ItemType = 'step' | 'root' | 'end';

export type Connection = 'children' | 'parent';

export type CanvasData = {
  title: string;
  type: ItemType;
  position: Position;
  width?: number;
};

export type CanvasTree = Tree<CanvasData>;
export type CanvasSet = Set<CanvasTree>;

export type CanvasUpdate =
  | { type: 'add-tree'; id: string }
  | { type: 'change'; id: string; changes: Partial<CanvasData> }
  | { type: 'change-multiple'; ids: string[]; changes: Partial<CanvasData>[] }
  | { type: 'remove-tree'; id: string }
  | { type: 'remove-trees'; ids: string[] }
  | { type: 'disconnect-tree'; id: string }
  | { type: 'connect-tree'; parentId: string; childId: string }
  | { type: 'clear' }
  | { type: 'update-children'; id: string; newChildrenIds: string[] }
  | { type: 'update-trees'; newTrees: CanvasTree[] };
