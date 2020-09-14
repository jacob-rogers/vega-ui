import React, { useEffect, useRef } from 'react';
import { Group, Rect } from 'react-konva';
import Konva from 'konva';

import { Text } from '../Text';

import { metrics } from './metrics';
import { ObjectElement } from './ObjectElement';
import { Content } from './types';

type ObjectElementProps = {
  x: number;
  y: number;
  name: string;
  height: number;
  containerHeight: number;
  content: Content[];
};

export const Event: React.FC<ObjectElementProps> = (props) => {
  const { x, y, name, height, containerHeight, content } = props;

  const refEventGroup = useRef<Konva.Group>(null);

  useEffect(() => {
    if (refEventGroup.current) {
      refEventGroup.current.cache();

      const layer = refEventGroup.current.getLayer();

      if (layer) {
        layer.batchDraw();
      }
    }
  }, []);

  const eventNameWidth =
    metrics.step.event.width - metrics.step.event.padding.left - metrics.step.event.padding.right;

  return (
    <Group x={x} y={y}>
      <Group ref={refEventGroup}>
        <Rect width={metrics.step.event.width} height={height} fill={metrics.step.event.fill} />
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

        return <ObjectElement key={object.id} x={objPosX} y={objPosY} name={object.name} />;
      })}
    </Group>
  );
};
