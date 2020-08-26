import React from 'react';
import { Line } from 'react-konva';

import { Position } from '../../types';
import { RADIUS } from '../Connector';

type ConnectionLineProps = {
  parentPosition: Position;
  childPosition: Position;
};

export const ConnectionLine: React.FC<ConnectionLineProps> = (props) => {
  const { parentPosition: parent, childPosition: child } = props;

  const dx = child.x - parent.x;
  const dy = child.y - child.y;

  const angle = Math.atan2(-dy, dx);

  const arrowStart = {
    x: parent.x + -RADIUS * Math.cos(angle + Math.PI),
    y: parent.y + RADIUS * Math.sin(angle + Math.PI),
  };

  const arrowEnd = {
    x: child.x + -RADIUS * Math.cos(angle),
    y: child.y + RADIUS * Math.sin(angle),
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
