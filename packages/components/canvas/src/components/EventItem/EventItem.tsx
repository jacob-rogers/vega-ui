import React, { useMemo, useRef } from 'react';
import { Group, Rect } from 'react-konva';
import Konva from 'konva';
import { KonvaEventObject } from 'konva/types/Node';
import { Shape, ShapeConfig } from 'konva/types/Shape';

import { useCanvas } from '../../context';
import { KonvaDragEvent, KonvaMouseEvent, Position } from '../../types';
import { throttle } from '../../utils';
import { Text } from '../Text';

import { metrics } from './metrics';
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
  children: JSX.Element;
  eventData: EventData;
};

export const EventItem: React.FC<EventItemProps> = (props) => {
  const { id, position, draggable, onDragStart, eventData, onPositionChange, ...rest } = props;

  const lastPosition = useRef({ x: position.x, y: position.y });
  const lastDropZoneShapeRef = useRef<Konva.Group | Shape<ShapeConfig> | null>(null);
  const currentDropZoneShapeRef = useRef<Konva.Group | Shape<ShapeConfig> | null>(null);

  const lastDropZoneShape = lastDropZoneShapeRef.current;
  const currentDropZoneShape = currentDropZoneShapeRef.current;

  const setLastDropZoneShape = (value: Konva.Group | Shape<ShapeConfig> | null) => {
    lastDropZoneShapeRef.current = value;
  };

  const setCurrentDropZoneShape = (value: Konva.Group | Shape<ShapeConfig> | null) => {
    currentDropZoneShapeRef.current = value;
  };

  const { updateContentRect, stage, layer, tempLayer } = useCanvas();

  const eventNameWidth =
    metrics.event.width - metrics.event.padding.left - metrics.event.padding.right;

  const handleDragStart = (evt: KonvaEventObject<DragEvent>) => {
    onDragStart(evt);
    evt.target.moveTo(tempLayer);
    layer?.batchDraw();
  };

  const handleDragMove = (evt: KonvaEventObject<DragEvent>) => {
    const newPosition = evt.target.position();

    const delta = {
      x: newPosition.x - lastPosition.current.x,
      y: newPosition.y - lastPosition.current.y,
    };

    lastPosition.current = { x: newPosition.x, y: newPosition.y };

    const pos = stage?.getPointerPosition();

    if (!pos) {
      return;
    }

    setCurrentDropZoneShape(layer?.getIntersection(pos, '.StepItem'));

    if (lastDropZoneShape && currentDropZoneShape) {
      if (lastDropZoneShape !== currentDropZoneShape) {
        lastDropZoneShape.fire(
          'dragleave',
          {
            type: 'dragleave',
            target: lastDropZoneShape,
            evt: evt.evt,
          },
          true,
        );

        currentDropZoneShape.fire(
          'dragenter',
          {
            type: 'dragenter',
            target: currentDropZoneShape,
            evt: evt.evt,
          },
          true,
        );

        setLastDropZoneShape(currentDropZoneShape);
      }
    } else if (!lastDropZoneShape && currentDropZoneShape) {
      setLastDropZoneShape(currentDropZoneShape);

      currentDropZoneShape.fire(
        'dragenter',
        {
          type: 'dragenter',
          target: currentDropZoneShape,
          evt: evt.evt,
        },
        true,
      );
    } else if (lastDropZoneShape && !currentDropZoneShape) {
      lastDropZoneShape.fire(
        'dragleave',
        {
          type: 'dragleave',
          target: lastDropZoneShape,
          evt: evt.evt,
        },
        true,
      );

      setLastDropZoneShape(null);
    }

    onPositionChange(newPosition, delta);
  };

  const throttled: (evt: KonvaEventObject<DragEvent>) => void = useMemo(
    () => throttle((e: KonvaEventObject<DragEvent>) => handleDragMove(e), 250),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stage, lastDropZoneShape, currentDropZoneShape],
  );

  const handleDragEnd = (evt: KonvaEventObject<DragEvent>) => {
    const pos = stage?.getPointerPosition();

    if (!pos) {
      return;
    }

    setCurrentDropZoneShape(layer?.getIntersection(pos, '.StepItem'));

    if (currentDropZoneShape) {
      lastDropZoneShape?.fire(
        'drop',
        {
          type: 'drop',
          target: lastDropZoneShape,
          evt: evt.evt,
          draggingTarget: evt,
        },
        true,
      );
    }

    setLastDropZoneShape(null);
    evt.target.moveTo(layer);
    layer?.draw();
    tempLayer?.draw();

    updateContentRect();
  };

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
      onDragEnd={handleDragEnd}
      onDragStart={(e): void => {
        const newPosition = e.target.position();
        lastPosition.current = { x: newPosition.x, y: newPosition.y };

        handleDragStart(e);
      }}
      onDragMove={throttled}
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
