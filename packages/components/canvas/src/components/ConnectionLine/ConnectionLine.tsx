import React from 'react';
import { Line } from 'react-konva';

import { Position } from '../../types';
import { Connector } from '../Connector';

const RADIUS = Connector.radius;

type ConnectionLineProps = {
  parentPosition: Position;
  childPosition: Position;
};

export const ConnectionLine: React.FC<ConnectionLineProps> = (props) => {
  const { parentPosition: parent, childPosition: child } = props;

  const dx = Number(child.x) - Number(parent.x);
  const dy = Number(child.y) - Number(child.y);

  const angle = Math.atan2(-dy, dx);

  const arrowStart = {
    x: Number(parent.x) + -RADIUS * Math.cos(angle + Math.PI),
    y: Number(parent.y) + RADIUS * Math.sin(angle + Math.PI),
  };

  const arrowEnd = {
    x: Number(child.x) + -RADIUS * Math.cos(angle),
    y: Number(child.y) + RADIUS * Math.sin(angle),
  };

  return (
    <Line
      tension={0.2}
      points={[arrowStart.x, arrowStart.y, arrowEnd.x, arrowEnd.y]}
      stroke="#fff"
      fill="#fff"
      strokeWidth={3}
      pointerWidth={6}
    />
  );
};
