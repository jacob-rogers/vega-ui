import React from 'react';
import { Line } from 'react-konva';

import { useCanvas } from '../../context';
import { KonvaMouseEvent, Position } from '../../types';
import { RADIUS } from '../Connector';

type ConnectionLineViewProps = {
  parent: Position;
  child: Position;
  onMouseDown?: (e: KonvaMouseEvent) => void;
  onClick?: (e: KonvaMouseEvent) => void;
  fill?: string;
};

export const ConnectionLineView: React.FC<ConnectionLineViewProps> = (props) => {
  const { parent, child, onMouseDown, onClick, fill = '#fff' } = props;

  const { setCursor } = useCanvas();

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
      fill={fill}
      stroke={fill}
      strokeWidth={3}
      onMouseDown={onMouseDown}
      onClick={onClick}
      onMouseEnter={(): void => {
        setCursor('pointer');
      }}
      onMouseLeave={(): void => {
        setCursor('default');
      }}
      pointerWidth={6}
    />
  );
};
