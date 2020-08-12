import React, { useRef } from 'react';
import { Circle } from 'react-konva';
import Konva from 'konva';

import { useHover } from '../../hooks';
import { BaseProps } from '../../types';

type KonvaCircleProps = Omit<React.ComponentProps<typeof Circle>, 'x' | 'y' | 'width' | 'height'>;

type ConnectorProps = KonvaCircleProps & Omit<BaseProps, 'label'>;

const RADIUS = 6;
const INITIAL_STROKE = 'rgba(255, 255, 255, 0.2)';

export const Connector: React.FC<ConnectorProps> & { radius: typeof RADIUS } = (props) => {
  const {
    position: { x, y },
    ...rest
  } = props;

  const ref = useRef<Konva.Circle>(null);

  const { handleMouseEnter, handleMouseLeave, fill, stroke } = useHover({
    cursor: 'pointer',
    stroke: { hover: '#fff', initial: INITIAL_STROKE },
    fill: { initial: '#161A1D' },
  });

  return (
    <Circle
      {...rest}
      x={x}
      y={y}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      fill={fill}
      ref={ref}
      stroke={stroke}
      strokeWidth={2}
      radius={RADIUS}
    />
  );
};

Connector.radius = RADIUS;
