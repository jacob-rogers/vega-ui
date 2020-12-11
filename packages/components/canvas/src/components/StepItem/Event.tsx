import React, { useEffect, useRef } from 'react';
import { Group, Rect } from 'react-konva';
import Konva from 'konva';

import { useCanvas } from '../../context';
import { metrics } from '../../metrics';
import { KonvaMouseEvent } from '../../types';
import { Text } from '../Text';

import { ObjectElement } from './ObjectElement';
import { Content } from './types';

type ObjectElementProps = {
  id: string;
  x: number;
  y: number;
  name: string;
  height: number;
  containerHeight: number;
  content: Content[];
  stepId: string;
};

export const Event: React.FC<ObjectElementProps> = (props) => {
  const { x, y, name, height, containerHeight, content, stepId, id } = props;

  const refEventGroup = useRef<Konva.Group>(null);
  const { setSelectedData, selectedData } = useCanvas();

  const isSelected =
    selectedData?.type === 'event' && selectedData.eventId === id && selectedData.itemId === stepId;

  useEffect(() => {
    if (refEventGroup.current) {
      refEventGroup.current.cache();

      const layer = refEventGroup.current.getLayer();

      if (layer) {
        layer.batchDraw();
      }
    }
  }, [isSelected, containerHeight, content]);

  const eventNameWidth =
    metrics.step.event.width - metrics.step.event.padding.left - metrics.step.event.padding.right;

  const handleClick = (e: KonvaMouseEvent) => {
    e.cancelBubble = true;

    if (!isSelected) {
      setSelectedData({ type: 'event', itemId: stepId, eventId: id });
    }
  };

  return (
    <Group id={id} stepId={stepId} name="EventContent" x={x} y={y} onClick={handleClick}>
      <Group ref={refEventGroup}>
        <Rect
          strokeEnabled={isSelected}
          stroke={metrics.step.event.strokeSelected}
          strokeWidth={metrics.step.strokeWidth}
          width={metrics.step.event.width}
          height={height}
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
        label={name}
        position={{ x: metrics.step.event.padding.left, y: metrics.step.event.padding.top }}
        width={eventNameWidth}
        fontSize={metrics.step.event.name.fontSize}
        lineHeight={metrics.step.event.name.lineHeight}
        fill={metrics.step.event.name.fill}
        wrap="none"
        ellipsis
      />
      {content.map((object, objectIndex) => {
        const objPosX = metrics.step.event.padding.left + metrics.step.container.padding.left;
        const objPosY =
          metrics.step.event.headerHeight +
          metrics.step.container.padding.top +
          (metrics.step.object.height + metrics.step.object.marginBottom) * objectIndex;

        return (
          <ObjectElement
            key={object.id}
            x={objPosX}
            y={objPosY}
            name={object.name}
            id={object.id}
            eventId={id}
            stepId={stepId}
          />
        );
      })}
    </Group>
  );
};
