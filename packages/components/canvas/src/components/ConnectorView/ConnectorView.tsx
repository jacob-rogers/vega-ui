import React from 'react';
import { Circle } from 'react-konva';

import { BaseProps } from '../../types';

type KonvaCircleProps = Omit<React.ComponentProps<typeof Circle>, 'x' | 'y' | 'width' | 'height'>;

type ConnectorViewProps = KonvaCircleProps & Omit<BaseProps, 'label'>;

export const RADIUS = 6;

export const ConnectorView: React.FC<ConnectorViewProps> = (props) => {
  const { position, fill, stroke, onMouseEnter, onMouseLeave, onMouseDown, ...rest } = props;

  return (
    <Circle
      {...rest}
      x={position.x}
      y={position.y}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      fill={fill}
      stroke={stroke}
      strokeWidth={2}
      radius={RADIUS}
    />
  );
};
