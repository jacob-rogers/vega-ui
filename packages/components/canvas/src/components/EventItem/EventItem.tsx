import React, { useMemo, useRef } from 'react';
import { Group, Rect } from 'react-konva';
import { KonvaEventObject } from 'konva/types/Node';

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
  const {
    id,
    position,
    draggable,
    onDragStart,
    eventData,
    onPositionChange,
    onClick,
    ...rest
  } = props;

  const lastPosition = useRef({ x: position.x, y: position.y });

  const {
    updateContentRect,
    stage,
    layer,
    tempLayer,
    lastDropZoneShape,
    setLastDropZoneShape,
  } = useCanvas();

  const eventNameWidth =
    metrics.event.width - metrics.event.padding.left - metrics.event.padding.right;

  const handleDragStart = (evt: KonvaEventObject<DragEvent>) => {
    // if (evt.target.attrs.name !== 'EventItem') {
    //   return;
    // }
    evt.target.moveTo(tempLayer);
    layer?.draw();
  };

  const handleDragMove = (evt: KonvaEventObject<DragEvent>) => {
    const newPosition = evt.target.position();

    const delta = {
      x: newPosition.x - lastPosition.current.x,
      y: newPosition.y - lastPosition.current.y,
    };

    lastPosition.current = { x: newPosition.x, y: newPosition.y };

    // const { name } = evt.target.attrs;
    //
    // if (name !== 'EventItem') {
    //   return;
    // }

    const pos = stage?.getPointerPosition();
    const previousElement = lastDropZoneShape;

    if (!pos) {
      return;
    }

    const currentElement = layer?.getIntersection(pos, '.StepItem');

    console.log(currentElement, previousElement);

    if (previousElement && currentElement) {
      if (previousElement !== currentElement) {
        previousElement.fire(
          'dragleave',
          {
            type: 'dragleave',
            target: previousElement,
            evt: evt.evt,
          },
          true,
        );

        currentElement.fire(
          'dragenter',
          {
            type: 'dragenter',
            target: currentElement,
            evt: evt.evt,
          },
          true,
        );

        setLastDropZoneShape(currentElement);
      }
    } else if (!previousElement && currentElement) {
      setLastDropZoneShape(currentElement);

      currentElement.fire(
        'dragenter',
        {
          type: 'dragenter',
          target: currentElement,
          evt: evt.evt,
        },
        true,
      );
    } else if (previousElement && !currentElement) {
      previousElement.fire(
        'dragleave',
        {
          type: 'dragleave',
          target: previousElement,
          evt: evt.evt,
        },
        true,
      );

      setLastDropZoneShape(null);
    }

    onPositionChange(newPosition, delta);

    onDragStart(evt);
  };

  const throttled = useMemo(
    () => throttle((e: KonvaEventObject<DragEvent>) => handleDragMove(e), 1000),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stage, lastDropZoneShape],
  );

  // const handleDragEnter = (evt: KonvaEventObject<DragEvent>) => {
  //   evt.evt.stopPropagation();
  //   console.log(evt, 'drag-enter');
  //
  //   onClick(evt);
  // };

  const handleDragLeave = () => {
    // view.updateState({
    //   selectedData: null,
    // });

    console.log('drag-leave');
  };

  const handleDrop = (evt: KonvaEventObject<DragEvent>) => {
    console.log(evt, 'drop');
  };

  const handleDragEnd = (evt: KonvaEventObject<DragEvent>) => {
    console.log(evt, 'drag-end');
    const { name } = evt.target.attrs;

    if (name !== 'EventItem') {
      return;
    }

    const previousElement = lastDropZoneShape;

    const pos = stage?.getPointerPosition();

    if (!pos) {
      return;
    }

    const currentElement = layer?.getIntersection(pos, '.StepItem');

    if (currentElement) {
      previousElement?.fire(
        'drop',
        {
          type: 'drop',
          target: previousElement,
          evt: evt.evt,
        },
        true,
      );

      setLastDropZoneShape(null);
      evt.target.moveTo(layer);
      layer?.draw();
    }

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
      // onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
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
