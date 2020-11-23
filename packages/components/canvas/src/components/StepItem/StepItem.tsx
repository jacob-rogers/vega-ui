import React, { useRef } from 'react';
import { Group, Image, Rect } from 'react-konva';
import { KonvaEventObject } from 'konva/types/Node';

import { useCanvas } from '../../context';
import { useImage } from '../../hooks';
import { metrics } from '../../metrics';
import { KonvaDragEvent, KonvaMouseEvent, Position } from '../../types';
import { Text } from '../Text';

import arrowDownSVG from './ArrowDown.svg';
import { Event } from './Event';
import { StepData } from './types';
import { getStepReferencePoints } from './utils';

export type StepItemProps = {
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
  notifyDropEvent: (dropZoneId: string, draggingId: string) => void;
  children: JSX.Element;
  stepData: StepData;
};

export const StepItem: React.FC<StepItemProps> = (props) => {
  const {
    id,
    position,
    stroke = metrics.step.stroke,
    draggable,
    onDragStart,
    onPositionChange,
    stepData,
    children,
    onClick,
    selectItem,
    notifyDropEvent,
    ...rest
  } = props;

  const lastPosition = useRef({ x: position.x, y: position.y });

  const [arrowDown] = useImage(arrowDownSVG);

  const { updateContentRect, setSelectedData } = useCanvas();

  const { stepHeight, eventPoints } = getStepReferencePoints(stepData.events);

  const stepNameWidth = metrics.step.width - metrics.step.padding.left - metrics.step.padding.right;

  return (
    <Group
      {...rest}
      id={id}
      name="StepItem"
      x={position.x}
      y={position.y}
      onClick={onClick}
      width={metrics.step.width}
      height={stepHeight}
      draggable={draggable}
      onDragStart={(e): void => {
        const newPosition = e.target.position();
        lastPosition.current = { x: newPosition.x, y: newPosition.y };

        onDragStart(e);
      }}
      onDragEnter={(e: KonvaDragEvent): void => {
        e.cancelBubble = true;

        selectItem(e);
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
      onDragLeave={(e: KonvaEventObject<DragEvent>): void => {
        e.cancelBubble = true;

        setSelectedData(null);
      }}
      onDrop={(
        e: KonvaEventObject<DragEvent> & { draggingTarget: KonvaEventObject<DragEvent> },
      ) => {
        const intersectionId = e.target.attrs.id;
        const draggingElementId = e.draggingTarget.target.attrs.id;

        notifyDropEvent(intersectionId, draggingElementId);
      }}
      onDragEnd={updateContentRect}
    >
      <Rect
        cornerRadius={metrics.step.cornerRadius}
        stroke={stroke}
        strokeWidth={metrics.step.strokeWidth}
        width={metrics.step.width}
        height={stepHeight}
      />
      <Text
        label={stepData.name}
        width={stepNameWidth}
        position={{ x: metrics.step.padding.left, y: metrics.step.padding.top }}
        fontSize={metrics.step.name.fontSize}
        lineHeight={metrics.step.name.lineHeight}
        fill={metrics.step.name.fill}
        wrap="none"
        ellipsis
      />
      <Image image={arrowDown} x={metrics.step.icon.left} y={metrics.step.icon.top} />
      {stepData.events.map((event, index) => {
        const { posY: eventPosY, height: eventHeight, containerHeight } = eventPoints[index];
        const eventPosX = metrics.step.padding.left;

        return (
          <Event
            id={event.id}
            key={event.id}
            x={eventPosX}
            y={eventPosY}
            name={event.name}
            stepId={id}
            height={eventHeight}
            containerHeight={containerHeight}
            content={event.content}
          />
        );
      })}
      {children}
    </Group>
  );
};
