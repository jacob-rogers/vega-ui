import React, { useEffect, useRef } from 'react';
import { Group, Image, Rect } from 'react-konva';
import Konva from 'konva';

import { useImage } from '../../hooks';
import { BaseProps } from '../../types';
import { Text } from '../Text';

import arrowDownSVG from './ArrowDown.svg';
import dashedCircleSVG from './DashedCircle.svg';
import { metrics } from './metrics';
import { getStepReferencePoints } from './utils';

export type ListProps = Omit<BaseProps, 'height'> & React.ComponentProps<typeof Group>;

const setup = {
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
};

export const List: React.FC<ListProps> = (props) => {
  const {
    position,
    // label, // Починить передачу значений
    onPositionChange = (): void => {},
    draggable = true,
    children,
    // stroke = 'rgba(255, 255, 255, 0.2)', // Починить выделение
    ...rest
  } = props;

  const [arrowDown] = useImage(arrowDownSVG);
  const [dashedCircle] = useImage(dashedCircleSVG);

  const refEventGroup = useRef<Konva.Group>(null);

  useEffect(() => {
    if (refEventGroup.current) {
      refEventGroup.current.cache();

      // TODO: разобраться в каких случаях нужно вызывать этот метод
      // refEventGroup.current.getLayer().batchDraw();
    }
  }, []);

  const { stepHeight, eventPoints } = getStepReferencePoints(setup.events);

  const stepNameWidth = metrics.step.width - metrics.step.padding.left - metrics.step.padding.right;

  const eventNameWidth =
    metrics.step.event.width - metrics.step.event.padding.left - metrics.step.event.padding.right;

  const objectNameWidth =
    metrics.step.object.width -
    metrics.step.object.padding.left -
    metrics.step.object.padding.right;

  return (
    <Group
      {...rest}
      x={position.x}
      y={position.y}
      width={metrics.step.width}
      draggable={draggable}
      onDragMove={(e): void => onPositionChange(e.target.position())}
    >
      <Rect
        cornerRadius={metrics.step.cornerRadius}
        stroke={metrics.step.stroke}
        strokeWidth={2}
        width={metrics.step.width}
        height={stepHeight}
      />
      <Text
        label={setup.name}
        width={stepNameWidth}
        position={{ x: metrics.step.padding.left, y: metrics.step.padding.top }}
        fontSize={metrics.step.name.fontSize}
        lineHeight={metrics.step.name.lineHeight}
        fill={metrics.step.name.fill}
        wrap="none"
        ellipsis
      />
      <Image image={arrowDown} x={metrics.step.arrow.left} y={metrics.step.arrow.top} />
      {setup.events.map((event, index) => {
        const { posY: eventPosY, height: eventHeight, containerHeight } = eventPoints[index];
        const eventPosX = metrics.step.padding.left;

        return (
          <Group x={eventPosX} y={eventPosY} key={event.id}>
            <Group ref={refEventGroup}>
              <Rect
                width={metrics.step.event.width}
                height={eventHeight}
                fill={metrics.step.event.fill}
              />
              <Rect
                position={{
                  x: metrics.step.event.padding.left,
                  y: metrics.step.event.headerHeight,
                }}
                width={metrics.step.container.width}
                height={containerHeight}
                fill="#fff"
                globalCompositeOperation="destination-out"
              />
            </Group>
            <Text
              label={event.name}
              position={{ x: metrics.step.event.padding.left, y: metrics.step.event.padding.top }}
              width={eventNameWidth}
              fontSize={metrics.step.event.name.fontSize}
              lineHeight={metrics.step.event.name.lineHeight}
              fill={metrics.step.event.name.fill}
              wrap="none"
              ellipsis
            />
            {event.content.map((object, objectIndex) => {
              const objPosX = metrics.step.event.padding.left + metrics.step.container.padding.left;
              const objPosY =
                metrics.step.event.headerHeight +
                metrics.step.container.padding.top +
                (metrics.step.object.height + metrics.step.object.marginBottom) * objectIndex;

              return (
                <Group x={objPosX} y={objPosY} key={object.id}>
                  <Rect
                    width={metrics.step.object.width}
                    height={metrics.step.object.height}
                    fill={metrics.step.object.fill}
                    cornerRadius={metrics.step.object.cornerRadius}
                  />
                  <Image
                    image={dashedCircle}
                    x={metrics.step.object.icon.left}
                    y={metrics.step.object.icon.top}
                  />
                  <Text
                    label={object.name}
                    position={{
                      x: metrics.step.object.padding.left,
                      y: metrics.step.object.padding.top,
                    }}
                    width={objectNameWidth}
                    fontSize={metrics.step.object.name.fontSize}
                    lineHeight={metrics.step.object.name.lineHeight}
                    fill={metrics.step.object.name.fill}
                    wrap="none"
                    ellipsis
                  />
                </Group>
              );
            })}
          </Group>
        );
      })}
      {children}
    </Group>
  );
};
