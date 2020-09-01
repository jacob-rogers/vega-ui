import { LIST_PADDING, STEP_HEIGHT, STEP_WIDTH } from '../../constants';
import { CanvasTree } from '../../entities';
import { Position } from '../../types';

type ConnectorsPosition = {
  parent: Position;
  children: Position;
};

const getRelativeYPosition = (step: CanvasTree): number =>
  step.getData().type === 'step' ? LIST_PADDING : STEP_HEIGHT / 2;

export const getAbsoluteConnectorsPosition = (step: CanvasTree): ConnectorsPosition => {
  const { position, width } = step.getData();
  const y = getRelativeYPosition(step) + position.y;

  return {
    parent: {
      x: position.x,
      y,
    },
    children: {
      x: (width ?? STEP_WIDTH) + position.x,
      y,
    },
  };
};

export const getRelativeConnectorsPosition = (step: CanvasTree): ConnectorsPosition => {
  const y = getRelativeYPosition(step);
  const { width } = step.getData();
  return {
    parent: {
      x: 0,
      y,
    },
    children: {
      x: width ?? STEP_WIDTH,
      y,
    },
  };
};
