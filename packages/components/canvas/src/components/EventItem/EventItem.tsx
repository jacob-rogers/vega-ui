import React, { useRef } from 'react';
import { Group, Rect } from 'react-konva';

import { useCanvas } from '../../context';
import { metrics } from '../../metrics';
import { KonvaDragEvent, KonvaMouseEvent, Position } from '../../types';
import { Text } from '../Text';

import { EventData } from './types';

export type EventItemProps = {
  id: string;
  name: string;
  position: Position;
  stroke?: string;
  draggable: boolean;
  onClick: (e: KonvaMouseEvent) => void;
  onMouseEnter: (e: KonvaMouseEvent) => void;
  onMouseMove: (e: KonvaMouseEvent) => void;
  onMouseLeave: (e: KonvaMouseEvent) => void;
  onMouseUp: (e: KonvaMouseEvent) => void;
  onDragStart: (e: KonvaDragEvent) => void;
  onPositionChange: (position: Position, positionDelta: Position) => void;
  eventData: EventData;
};

export const EventItem: React.FC<EventItemProps> = (props) => {
  const { id, position, draggable, onDragStart, eventData, onPositionChange, ...rest } = props;

  const lastPosition = useRef({ x: position.x, y: position.y });

  const { updateContentRect } = useCanvas();

  const eventNameWidth =
    metrics.event.width - metrics.event.padding.left - metrics.event.padding.right;

  return (
    <Group
      {...rest}
      id={id}
      name="EventItem"
      x={position.x}
      y={position.y}
      width={metrics.event.width}
      height={metrics.event.emptyHeight}
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
        cornerRadius={metrics.event.cornerRadius}
        width={metrics.event.width}
        height={metrics.event.emptyHeight}
        fill={metrics.event.fill}
        fillEnabled
      />
      <Text
        label={eventData.name}
        width={eventNameWidth}
        position={{ x: metrics.event.padding.left, y: metrics.event.padding.top }}
        fontSize={metrics.event.name.fontSize}
        lineHeight={metrics.event.name.lineHeight}
        fill={metrics.event.name.fill}
        wrap="none"
        ellipsis
      />
    </Group>
  );
};
