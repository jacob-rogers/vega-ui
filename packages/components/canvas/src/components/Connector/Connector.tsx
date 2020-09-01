import React, { useState } from 'react';
import { useOnChange } from '@gpn-prototypes/vega-hooks';

import { CONNECTOR_DEFAULT_COLOR, CONNECTOR_HOVER_COLOR, SELECTED_COLOR } from '../../constants';
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
const INITIAL_FILL = '#161A1D';

export const Connector: React.FC<ConnectorProps> = (props) => {
  const { id, onActiveChange, isActive, isSelected, position, type } = props;

  const [stroke, setStroke] = useState(CONNECTOR_DEFAULT_COLOR);

  const { setCursor } = useCanvas();

  useOnChange(isActive, () => {
    setStroke(isActive ? CONNECTOR_HOVER_COLOR : CONNECTOR_DEFAULT_COLOR);
  });

  const handleMouseEnter = (): void => {
    setCursor('pointer');
    if (stroke !== CONNECTOR_HOVER_COLOR) {
      setStroke(CONNECTOR_HOVER_COLOR);
    }
  };

  const handleMouseLeave = (): void => {
    if (!isActive) {
      if (stroke !== CONNECTOR_DEFAULT_COLOR) {
        setStroke(CONNECTOR_DEFAULT_COLOR);
      }
      setCursor('default');
    }
  };

  const handleChangeActive = (): void => {
    return onActiveChange({ type });
  };

  const getStroke = (): string => {
    if (isSelected) {
      return SELECTED_COLOR;
    }

    if (isActive) {
      return CONNECTOR_HOVER_COLOR;
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
