import React, { useRef } from 'react';
import { Group, Image, Rect } from 'react-konva';

import { useCanvas } from '../../context';
import { useImage } from '../../hooks';
import { metrics } from '../../metrics';
import { KonvaDragEvent, KonvaMouseEvent, Position } from '../../types';
import { Text } from '../Text';

import arrowDownSVG from './ArrowDown.svg';
import { Event } from './Event';
import { StepData } from './types';
import { getStepReferencePoints } from './utils';

export type ListProps = {
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
  stepData: StepData;
};

export const List: React.FC<ListProps> = (props) => {
  const {
    id,
    name, // TODO: Для данных используется заглушка stepData
    position,
    stroke = metrics.step.stroke,
    draggable,
    onDragStart,
    onPositionChange,
    stepData,
    children,
    ...rest
  } = props;

  const lastPosition = useRef({ x: position.x, y: position.y });

  const [arrowDown] = useImage(arrowDownSVG);

  const { updateContentRect } = useCanvas();

  const { stepHeight, eventPoints } = getStepReferencePoints(stepData.events);

  const stepNameWidth = metrics.step.width - metrics.step.padding.left - metrics.step.padding.right;

  return (
    <Group
      {...rest}
      id={id}
      name="List" // TODO: изменить name на Item Step
      x={position.x}
      y={position.y}
      width={metrics.step.width}
      height={stepHeight}
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
            key={event.id}
            x={eventPosX}
            y={eventPosY}
            name={event.name}
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
