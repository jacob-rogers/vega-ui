import React, { useState } from 'react';

import { metrics } from '../../metrics';
import { ConnectorActivateData, ConnectorType, Position } from '../../types';
import { ConnectorView } from '../ConnectorView';

type ConnectorProps = {
  id: string;
  type: ConnectorType;
  position: Position;
  isSelected: boolean;
  isActive: boolean;
  isСonnectionPossible: boolean;
  isDisabled: boolean;
  onActivate: (e: ConnectorActivateData) => void;
};

export const Connector: React.FC<ConnectorProps> = (props) => {
  const {
    id,
    type,
    position,
    isSelected,
    isActive,
    isСonnectionPossible,
    isDisabled,
    onActivate,
  } = props;

  const [stroke, setStroke] = useState(metrics.connector.stroke);

  const handleMouseEnter = (): void => {
    if (!isDisabled) {
      setStroke(metrics.connector.strokeActive);
    }
  };

  const handleMouseLeave = (): void => {
    setTimeout(() => {
      setStroke(metrics.connector.stroke);
    }, 0);
  };

  const handleActivate = (): void => {
    onActivate({ type, position });
  };

  const getStroke = (): string => {
    if (isSelected) {
      return metrics.connector.strokeSelected;
    }

    if (isActive || isСonnectionPossible) {
      return metrics.connector.strokeActive;
    }

    return stroke;
  };

  return (
    <ConnectorView
      id={id}
      position={position}
      stroke={getStroke()}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onMouseDown={handleActivate}
    />
  );
};
