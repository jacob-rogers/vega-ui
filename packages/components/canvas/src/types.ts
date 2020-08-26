import Konva from 'konva';

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

export type KonvaMouseEvent = Konva.KonvaEventObject<MouseEvent>;

export type ConnectorType = 'parent' | 'children';
