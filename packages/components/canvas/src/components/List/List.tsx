import React, { useEffect, useRef } from 'react';
import { Group, Image, Rect } from 'react-konva';
import Konva from 'konva';

import { useImage } from '../../hooks';
import { BaseProps } from '../../types';
import { Text } from '../Text';

import arrowDownIcon from './ArrowDown.svg';
import oilIcon from './Oil.svg';

export type ListProps = Omit<BaseProps, 'height'> & React.ComponentProps<typeof Group>;

const metrics = {
  step: {
    cornerRadius: 2,
    stroke: 'rgba(255, 255, 255, 0.2)',
    strokeSelected: '#0AA5FF',
    strokeWidth: 2,
    width: 251,
    emptyHeight: 47,
    padding: {
      top: 8,
      left: 12,
      bottom: 12,
    },
    name: {
      marginBottom: 12,
      fontSize: 14,
      lineHeight: 1.4,
      fill: '#FAFAFA',
    },
    event: {
      width: 227,
      fill: '#22272B',
      marginBottom: 8,
      padding: {
        top: 10,
        left: 12,
        bottom: 12,
      },
      name: {
        marginBottom: 12,
        fontSize: 14,
        lineHeight: 1.4,
        fill: '#FAFAFA',
      },
      container: {
        width: 203,
        padding: {
          top: 4,
          left: 4,
          bottom: 4,
        },
      },
    },
    object: {
      width: 195,
      height: 32,
      marginBottom: 4,
      cornerRadius: 2,
      fill: '#4f5255',
      padding: {
        top: 6,
        left: 11,
        bottom: 5,
      },
      name: {
        fontSize: 14,
        lineHeight: 1.5,
        fill: '#FAFAFA',
      },
    },
    arrow: {
      top: 12,
      right: 12,
      width: 12,
    },
  },
};

const setup = {
  type: 'step',
  name: 'Шаг 1',
  events: [
    {
      name: 'Сейсмика',
      content: [
        { type: 'object', name: 'Залежь - 79' },
        { type: 'object', name: 'Залежь - 19' },
        { type: 'object', name: 'Залежь - 89' },
      ],
    },
  ],
};

type Events = {
  name: string;
  content: {
    type: string;
    name: string;
  }[];
};

// Получаются не красивые значения вроде 19.599999999999998 вместо 19 в дизайне

const getTextHeight = (fontSize: number, lineHeight: number): number => {
  return fontSize * lineHeight;
};

const stepHeader =
  metrics.step.padding.top +
  getTextHeight(metrics.step.name.fontSize, metrics.step.name.lineHeight) +
  metrics.step.name.marginBottom;

const eventHeader =
  metrics.step.event.padding.top +
  getTextHeight(metrics.step.name.fontSize, metrics.step.name.lineHeight) +
  metrics.step.name.marginBottom;

const containerPaddings =
  metrics.step.event.container.padding.top + metrics.step.event.container.padding.bottom;

const objectHeight =
  metrics.step.object.padding.top +
  getTextHeight(metrics.step.object.name.fontSize, metrics.step.object.name.lineHeight) +
  metrics.step.object.padding.bottom;

const getStepHeight = (events: Events[]): number => {
  if (events.length === 0) {
    return metrics.step.emptyHeight;
  }

  /* Добавить условие для пустого события/пустых событий */

  let eventsSumHeight = metrics.step.event.marginBottom * (events.length - 1);

  for (let i = 0; i < events.length; i += 1) {
    const objectNum = events[i].content.length;

    const containerHeight =
      containerPaddings +
      objectHeight * objectNum +
      metrics.step.object.marginBottom * (objectNum - 1);

    const eventHeight = eventHeader + containerHeight + metrics.step.event.padding.bottom;

    eventsSumHeight += eventHeight;
  }

  const stepHeight = stepHeader + eventsSumHeight + metrics.step.padding.bottom;

  return stepHeight;
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
  const [arrowDown] = useImage(arrowDownIcon);
  const [oil] = useImage(oilIcon);

  const refEventGroup = useRef<Konva.Group>(null);

  useEffect(() => {
    if (refEventGroup.current) {
      refEventGroup.current.cache();

      // refEventGroup.current.getLayer().batchDraw();
    }
  }, []);

  const stepHeight = getStepHeight(setup.events);
  const arrowDownPosX = metrics.step.width - metrics.step.arrow.width - metrics.step.arrow.right;

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
        position={{ x: metrics.step.padding.left, y: metrics.step.padding.top }}
        fontSize={metrics.step.name.fontSize}
        lineHeight={metrics.step.name.lineHeight}
        fill={metrics.step.name.fill}
      />
      {arrowDown && <Image image={arrowDown} x={arrowDownPosX} y={metrics.step.arrow.top} />}
      {setup.events.map((event) => {
        const eventPosX = metrics.step.padding.left;
        const eventPosY = stepHeader; // Нужно доработать для нескольких мероприятий

        return (
          <Group x={eventPosX} y={eventPosY}>
            <Group ref={refEventGroup}>
              <Rect
                position={{ x: 0, y: 0 }}
                width={metrics.step.event.width}
                height={165}
                fill={metrics.step.event.fill}
              />
              <Rect
                position={{ x: metrics.step.event.padding.left, y: eventHeader }}
                width={metrics.step.event.container.width}
                height={112}
                fill="#fff"
                globalCompositeOperation="destination-out"
              />
            </Group>
            <Text
              label={event.name}
              position={{ x: metrics.step.event.padding.left, y: metrics.step.event.padding.top }}
              fontSize={metrics.step.event.name.fontSize}
              lineHeight={metrics.step.event.name.lineHeight}
              fill={metrics.step.event.name.fill}
            />
            {event.content.map((object, index) => {
              const objPosX =
                metrics.step.event.padding.left + metrics.step.event.container.padding.left;
              const objPosY =
                eventHeader +
                metrics.step.event.container.padding.top +
                (objectHeight + metrics.step.object.marginBottom) * index;

              return (
                <Group x={objPosX} y={objPosY}>
                  <Rect
                    position={{ x: 0, y: 0 }}
                    width={metrics.step.object.width}
                    height={metrics.step.object.height}
                    fill={metrics.step.object.fill}
                    cornerRadius={metrics.step.object.cornerRadius}
                  />
                  {oil && <Image image={oil} x={11} y={11} />}
                  <Text
                    align="center"
                    position={{ x: 28, y: 6 }}
                    verticalAlign="middle"
                    fill="#FAFAFA"
                    label={object.name}
                    fontSize={14}
                    lineHeight={1.5}
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
