import React from 'react';
import { Circle } from 'react-konva';

import { metrics } from '../../metrics';
import { Position } from '../../types';

type ConnectorViewProps = {
  id: string;
  position: Position;
  stroke: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onMouseDown: () => void;
};

export const ConnectorView: React.FC<ConnectorViewProps> = (props) => {
  const { id, position, stroke, onMouseEnter, onMouseLeave, onMouseDown } = props;

  return (
    <Circle
      id={id}
      x={position.x}
      y={position.y}
      stroke={stroke}
      strokeWidth={metrics.connector.strokeWidth}
      fill={metrics.connector.fill}
      radius={metrics.connector.radius}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
    />
  );
};
