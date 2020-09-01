import React, { useState } from 'react';
import { useOnChange } from '@gpn-prototypes/vega-hooks';

import { useCanvas } from '../../context';
import { ConnectorType, Position } from '../../types';
import { ConnectorView } from '../ConnectorView';

export type ConnectorEvent = { type: ConnectorType };

type ConnectorProps = {
  id: string;
  isActive?: boolean;
  onActiveChange: (e: ConnectorEvent) => void;
  isSelected?: boolean;
  position: Position;
  type: ConnectorType;
};

export const RADIUS = 6;
const INITIAL_STROKE = 'rgba(255, 255, 255, 0.2)';
export const STROKE_ON_SELECTED = '#0078D2';
const STROKE_ON_HOVER = '#fff';
const INITIAL_FILL = '#161A1D';

export const Connector: React.FC<ConnectorProps> = (props) => {
  const { id, onActiveChange, isActive, isSelected, position, type } = props;

  const [stroke, setStroke] = useState(INITIAL_STROKE);

  const { setCursor } = useCanvas();

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

  const handleChangeActive = (): void => {
    return onActiveChange({ type });
  };

  const getStroke = (): string => {
    if (isSelected) {
      return STROKE_ON_SELECTED;
    }

    if (isActive) {
      return STROKE_ON_HOVER;
    }

    return stroke;
  };

  return (
    <ConnectorView
      id={id}
      stroke={getStroke()}
      fill={INITIAL_FILL}
      position={position}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onMouseDown={handleChangeActive}
    />
  );
};
