import React from 'react';

import { useCanvas } from '../../context';
import { Canvas, CanvasTree } from '../../entities';
import { getAbsoluteConnectorsPosition, StepView } from '../StepView';

type StepListProps = {
  canvas: Canvas;
};

export const StepList: React.FC<StepListProps> = (props) => {
  const { canvas } = props;
  const { stageRef, setActiveData } = useCanvas();

  const handleStepMouseDown = (tree: CanvasTree): void => {
    const steps = canvas.extract().slice();
    const index = steps.indexOf(tree);
    steps.splice(index, 1);
    steps.push(tree);
    canvas.setTrees(new Set(steps));
  };

  const handleConnectionLineMouseDown = (parent: CanvasTree, child: CanvasTree): void => {
    if (stageRef.current) {
      const parentConnectors = getAbsoluteConnectorsPosition(parent);
      const childConnectors = getAbsoluteConnectorsPosition(child);
      const pointerPosition = stageRef.current.getPointerPosition();
      const pointerX = Number(pointerPosition?.x);
      const parentDelta = pointerX - parentConnectors.children.x;
      const childDelta = childConnectors.parent.x - pointerX;

      canvas.disconnect(child);

      const parentClosest = parentDelta < childDelta;
      if (!parentClosest) {
        setActiveData({
          step: parent,
          connector: {
            type: 'children',
            position: parentConnectors.children,
          },
        });
      } else {
        setActiveData({
          step: child,
          connector: {
            type: 'parent',
            position: childConnectors.parent,
          },
        });
      }
    }
  };

  return (
    <>
      {canvas.extract().map((tree) => {
        return (
          <StepView
            step={tree}
            key={tree.getId()}
            onPositionChange={(position): void => canvas.onTreePositionChange(tree, position)}
            onWidthUpdate={(width): void => canvas.setData(tree, { width })}
            onMouseDown={(): void => handleStepMouseDown(tree)}
            onConnectionLineMouseDown={handleConnectionLineMouseDown}
            parent={canvas.searchTree(tree.getParent())}
            stepChildren={tree.getChildren().map((child) => canvas.searchTree(child))}
          />
        );
      })}
    </>
  );
};
