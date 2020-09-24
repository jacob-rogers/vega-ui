import Konva from 'konva';

import { Notifier } from './entities/Notifier';
import { Tree } from './entities/Tree';

export type Position = {
  x: number;
  y: number;
};

export type BaseProps = {
  position: Position;
  label: string;
  fill?: string;
  height?: number;
  width?: number;
  onPositionChange?: (position: Position) => void;
};

export type CanvasTree = Tree<CanvasData>;

export type CanvasSet = Set<CanvasTree>;

export type KonvaMouseEvent = Konva.KonvaEventObject<MouseEvent>;

export type ConnectorType = 'parent' | 'children';

export type ItemConnectorData = {
  type: ConnectorType;
  position: Position;
};

export type ActiveData = {
  item: CanvasTree;
  connector: ItemConnectorData;
};

export type SelectedData =
  | { type: 'item'; id: string }
  | { type: 'line'; parentId: string; childId: string };

export type ItemType = 'step' | 'root' | 'end';

export type CanvasData = {
  title: string;
  type: ItemType;
  position: Position;
  width?: number;
};

export type Connection = 'children' | 'parent';

export type CanvasUpdate =
  | { type: 'add-tree'; id: string }
  | { type: 'change'; id: string; changes: Partial<CanvasData> }
  | { type: 'remove-tree'; id: string }
  | { type: 'disconnect-tree'; id: string }
  | { type: 'connect-tree'; parentId: string; childId: string }
  | { type: 'clear' }
  | { type: 'update-children'; id: string; newChildren: string[] }
  | { type: 'update-trees'; newTrees: CanvasTree[] };

export type CanvasNotifier = Notifier<CanvasUpdate>;

export type Coordinates = { parent: Position; child: Position };
export type Size = { width: number; height: number };

export type ContentRect = Position & Size;
