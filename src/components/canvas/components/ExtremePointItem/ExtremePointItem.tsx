import React, { useRef, useState } from 'react';
import { Group, Rect } from 'react-konva';
import Konva from 'konva';

import { useMount } from '../../../../hooks';
import { useCanvas } from '../../context';
import { metrics } from '../../metrics';
import { KonvaDragEvent, KonvaMouseEvent, Position } from '../../types';
import { Text } from '../Text';

// TODO: Убрать часть в глобальный ItemProps

export type ExtremePointProps = {
  id: string;
  name: string;
  position: Position;
  stroke?: string;
  draggable: boolean;
  selectItem: (e: KonvaMouseEvent) => void;
  onClick: (e: KonvaMouseEvent) => void;
  onMouseEnter: (e: KonvaMouseEvent) => void;
  onMouseMove: (e: KonvaMouseEvent) => void;
  onMouseLeave: (e: KonvaMouseEvent) => void;
  onMouseUp: (e: KonvaMouseEvent) => void;
  onDragStart: (e: KonvaDragEvent) => void;
  onPositionChange: (position: Position, positionDelta: Position) => void;
  children: JSX.Element;
  onWidthUpdate?: (width: number) => void;
};

export const ExtremePointItem: React.FC<ExtremePointProps> = (props) => {
  const {
    id,
    name,
    position,
    stroke,
    draggable,
    onDragStart,
    onPositionChange,
    children,
    onWidthUpdate,
    ...rest
  } = props;

  const textRef = useRef<Konva.Text>(null);
  const lastPosition = useRef<Position>({ x: position.x, y: position.y });

  const [width, setWidth] = useState(0);

  const { updateContentRect } = useCanvas();

  useMount(() => {
    if (textRef.current) {
      const newWidth =
        textRef.current.getTextWidth() +
        metrics.extremePoint.padding.left +
        metrics.extremePoint.padding.right;

      setWidth(newWidth);
      if (onWidthUpdate) {
        onWidthUpdate(newWidth);
      }
    }
  });

  return (
    <Group
      {...rest}
      id={id}
      name="ExtremePointItem"
      x={position.x}
      y={position.y}
      width={width}
      height={metrics.extremePoint.height}
      draggable={draggable}
      onDragStart={(e): void => {
        const newPosition = e.target.position();
        lastPosition.current = { x: newPosition.x, y: newPosition.y };

        onDragStart(e);
      }}
      onDragMove={(e): void => {
        const newPosition = e.target.position();

        const delta = {
          x: newPosition.x - lastPosition.current.x,
          y: newPosition.y - lastPosition.current.y,
        };

        lastPosition.current = { x: newPosition.x, y: newPosition.y };

        onPositionChange(newPosition, delta);
      }}
      onDragEnd={updateContentRect}
    >
      <Rect
        cornerRadius={metrics.extremePoint.cornerRadius}
        stroke={stroke}
        strokeWidth={metrics.extremePoint.strokeWidth}
        strokeEnabled={Boolean(stroke)}
        width={width}
        height={metrics.extremePoint.height}
        fill={metrics.extremePoint.fill}
      />
      <Text
        innerRef={textRef}
        label={name}
        height={metrics.extremePoint.height}
        position={{ x: metrics.extremePoint.padding.left, y: 0 }}
        verticalAlign="middle"
        fontSize={metrics.extremePoint.name.fontSize}
        lineHeight={metrics.step.name.lineHeight}
        fill={metrics.extremePoint.name.fill}
      />
      {children}
    </Group>
  );
};
