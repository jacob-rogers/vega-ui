import { metrics } from '../../metrics';
import { CanvasTree, Position } from '../../types';

type ConnectorsPosition = {
  parent: Position;
  children: Position;
};

const getRelativeYPosition = (step: CanvasTree): number => {
  if (step.getData().type === 'step') {
    return metrics.step.connector.position.y;
  }

  return metrics.extremePoint.height / 2;
};

export const getAbsoluteConnectorsPosition = (step: CanvasTree): ConnectorsPosition => {
  const { position, width = metrics.step.width } = step.getData();
  const y = getRelativeYPosition(step) + position.y;

  return {
    parent: {
      x: position.x,
      y,
    },
    children: {
      x: position.x + width,
      y,
    },
  };
};

export const getRelativeConnectorsPosition = (step: CanvasTree): ConnectorsPosition => {
  const { width = metrics.step.width } = step.getData();
  const y = getRelativeYPosition(step);

  return {
    parent: {
      x: 0,
      y,
    },
    children: {
      x: width,
      y,
    },
  };
};
