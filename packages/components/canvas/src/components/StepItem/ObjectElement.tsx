import React from 'react';
import { Group, Image, Rect } from 'react-konva';
import { KonvaMouseEvent } from '@gpn-prototypes/vega-ui';

import { useCanvas } from '../../context';
import { useImage } from '../../hooks';
import { metrics } from '../../metrics';
import { Text } from '../Text';

import dashedCircleSVG from './DashedCircle.svg';

type ObjectElementProps = {
  x: number;
  y: number;
  name: string;
  id: string;
  eventId: string;
  stepId?: string;
};

export const ObjectElement: React.FC<ObjectElementProps> = (props) => {
  const [dashedCircle] = useImage(dashedCircleSVG);

  const { x, y, name, id, eventId, stepId } = props;

  const { setSelectedData, selectedData } = useCanvas();
  const isSelected = selectedData?.type === 'domainObject' && selectedData.objectId === id;

  const objectNameWidth =
    metrics.step.object.width -
    metrics.step.object.padding.left -
    metrics.step.object.padding.right;

  const handleClick = (e: KonvaMouseEvent) => {
    e.cancelBubble = true;

    if (!isSelected) {
      setSelectedData({ type: 'domainObject', eventId, objectId: id, stepId });
    }
  };

  return (
    <Group x={x} y={y} onClick={handleClick}>
      <Rect
        strokeEnabled={isSelected}
        stroke={metrics.step.object.strokeSelected}
        strokeWidth={metrics.step.object.strokeWidth}
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
