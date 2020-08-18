import React, { useRef, useState } from 'react';
import { Circle } from 'react-konva';
import { useOnChange } from '@gpn-prototypes/vega-hooks';
import Konva from 'konva';

import { useCanvas } from '../../context';
import { BaseProps } from '../../types';

type KonvaCircleProps = Omit<React.ComponentProps<typeof Circle>, 'x' | 'y' | 'width' | 'height'>;

interface ConnectorProps extends KonvaCircleProps, Omit<BaseProps, 'label'> {
  onActiveChange(newActive: boolean): void;
}

const RADIUS = 6;
const INITIAL_STROKE = 'rgba(255, 255, 255, 0.2)';
const STROKE_ON_HOVER = '#fff';
const INITIAL_FILL = '#161A1D';

export const Connector: React.FC<ConnectorProps> & { radius: typeof RADIUS } = (props) => {
  const {
    position: { x, y },
    fill: fillProp,
    stroke: strokeProp,
    onActiveChange,
    ...rest
  } = props;

  const [isActive, setActive] = useState(false);
  const [stroke, setStroke] = useState(INITIAL_STROKE);

  const { updateCursor, stageRef } = useCanvas();

  const ref = useRef<Konva.Circle>(null);

  const handleMouseUp = (): void => {
    setStroke(INITIAL_STROKE);
    setActive(false);
    updateCursor('default');
    if (stageRef.current) {
      stageRef.current.removeEventListener('mouseup', handleMouseUp);
    }
  };

  useOnChange(isActive, () => {
    onActiveChange(isActive);
  });

  const handleMouseDown = (): void => {
    // нужно чтобы событие начинало слушаться только когда мы нажали и удерживаем мышку на коннекторе
    if (stageRef.current) {
      stageRef.current.addEventListener('mouseup', handleMouseUp);
    }
    setStroke(STROKE_ON_HOVER);
    setActive(true);
  };

  const handleMouseEnter = (): void => {
    setStroke(STROKE_ON_HOVER);
    updateCursor('pointer');
  };

  const handleMouseLeave = (): void => {
    if (!isActive) {
      setStroke(INITIAL_STROKE);
      updateCursor('default');
    }
  };

  return (
    <Circle
      {...rest}
      x={x}
      y={y}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      fill={fillProp ?? INITIAL_FILL}
      ref={ref}
      stroke={strokeProp ?? stroke}
      strokeWidth={2}
      radius={RADIUS}
    />
  );
};

Connector.radius = RADIUS;
