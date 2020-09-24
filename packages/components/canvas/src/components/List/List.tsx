import React from 'react';
import { Group, Image, Rect } from 'react-konva';

import { useCanvas } from '../../context';
import { useImage } from '../../hooks';
import { BaseProps } from '../../types';
import { Text } from '../Text';

import arrowDownSVG from './ArrowDown.svg';
import { Event } from './Event';
import { metrics } from './metrics';
import { StepData } from './types';
import { getStepReferencePoints } from './utils';

export type ListProps = Omit<BaseProps, 'height'> & React.ComponentProps<typeof Group>;

const stepData = {
  type: 'step',
  id: 0,
  name: 'Шаг 1',
  events: [
    {
      id: 0,
      name: 'Сейсмика 1',
      content: [
        { type: 'object', id: 0, name: 'Залежь - 79' },
        { type: 'object', id: 1, name: 'Залежь - 19' },
        { type: 'object', id: 2, name: 'Залежь - 89' },
      ],
    },
  ],
} as StepData;

export const List: React.FC<ListProps> = (props) => {
  const {
    position,
    // label, // Для данных используется заглушка stepData
    onPositionChange = (): void => {},
    draggable = true,
    children,
    fill = '#22272B',
    stroke = 'rgba(255, 255, 255, 0.2)',
    ...rest
  } = props;

  const [arrowDown] = useImage(arrowDownSVG);

  const { stepHeight, eventPoints } = getStepReferencePoints(stepData.events);

  const stepNameWidth = metrics.step.width - metrics.step.padding.left - metrics.step.padding.right;

  const { updateContentRect } = useCanvas();

  return (
    <Group
      {...rest}
      name="List"
      x={position.x}
      y={position.y}
      width={metrics.step.width}
      height={stepHeight}
      draggable={draggable}
      onDragMove={(e): void => onPositionChange(e.target.position())}
      onDragEnd={updateContentRect}
    >
      <Rect
        cornerRadius={metrics.step.cornerRadius}
        stroke={stroke}
        strokeWidth={2}
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
