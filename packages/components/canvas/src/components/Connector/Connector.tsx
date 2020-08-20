import React, { useRef, useState } from 'react';
import { Circle } from 'react-konva';
import { useOnChange } from '@gpn-prototypes/vega-hooks';
import Konva from 'konva';

import { useCanvas } from '../../context';
import { BaseProps, ConnectorType, Position } from '../../types';

type KonvaCircleProps = Omit<React.ComponentProps<typeof Circle>, 'x' | 'y' | 'width' | 'height'>;

interface ConnectorProps extends KonvaCircleProps, Omit<BaseProps, 'label'> {
  type: 'parent' | 'children';
  isActive: boolean | null;
  onChangeActive: (type: ConnectorType) => void;
  position: Required<Position>;
  disabled?: boolean;
}

export const RADIUS = 6;
const INITIAL_STROKE = 'rgba(255, 255, 255, 0.2)';
const STROKE_ON_HOVER = '#fff';
const INITIAL_FILL = '#161A1D';

export const Connector: React.FC<ConnectorProps> = (props) => {
  const {
    position,
    fill: fillProp,
    stroke: strokeProp,
    isActive,
    onChangeActive,
    type,
    disabled = false,
    ...rest
  } = props;

  const [stroke, setStroke] = useState(INITIAL_STROKE);

  const { setCursor } = useCanvas();

  const ref = useRef<Konva.Circle>(null);

  useOnChange(isActive, () => {
    setStroke(isActive ? STROKE_ON_HOVER : INITIAL_STROKE);
  });

  const handleMouseEnter = (): void => {
    setCursor('pointer');
    if (stroke !== STROKE_ON_HOVER) {
      setStroke(STROKE_ON_HOVER);
    }
  };

  const handleMouseLeave = (): void => {
    if (!isActive) {
      if (stroke !== INITIAL_STROKE) {
        setStroke(INITIAL_STROKE);
      }
      setCursor('default');
    }
  };

  const handleChangeActive = (): void | undefined => {
    if (disabled) {
      return undefined;
    }
    return onChangeActive(type);
  };

  return (
    <Circle
      {...rest}
      x={position.x}
      y={position.y}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleChangeActive}
      fill={fillProp ?? INITIAL_FILL}
      ref={ref}
      stroke={strokeProp ?? stroke}
      strokeWidth={2}
      radius={RADIUS}
    />
  );
};
