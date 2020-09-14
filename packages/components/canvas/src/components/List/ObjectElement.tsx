import React from 'react';
import { Group, Image, Rect } from 'react-konva';

import { useImage } from '../../hooks';
import { Text } from '../Text';

import dashedCircleSVG from './DashedCircle.svg';
import { metrics } from './metrics';

type ObjectElementProps = {
  x: number;
  y: number;
  name: string;
};

export const ObjectElement: React.FC<ObjectElementProps> = (props) => {
  const [dashedCircle] = useImage(dashedCircleSVG);

  const { x, y, name } = props;

  const objectNameWidth =
    metrics.step.object.width -
    metrics.step.object.padding.left -
    metrics.step.object.padding.right;

  return (
    <Group x={x} y={y}>
      <Rect
        width={metrics.step.object.width}
        height={metrics.step.object.height}
        cornerRadius={metrics.step.object.cornerRadius}
        fill={metrics.step.object.fill}
      />
      <Image
        image={dashedCircle}
        x={metrics.step.object.icon.left}
        y={metrics.step.object.icon.top}
      />
      <Text
        label={name}
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
};
