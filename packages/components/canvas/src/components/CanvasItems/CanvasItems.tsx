import React from 'react';

import { useCanvas } from '../../context';
import { Canvas } from '../../entities';
import { CanvasTree } from '../../types';
import { CanvasItem, getAbsoluteConnectorsPosition } from '../CanvasItem';

type CanvasItemsProps = {
  canvas: Canvas;
};

export const CanvasItems: React.FC<CanvasItemsProps> = (props) => {
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

      canvas.disconnect(child, parent);

      const parentClosest = parentDelta < childDelta;
      if (!parentClosest) {
        setActiveData({
          item: parent,
          connector: {
            type: 'children',
            position: parentConnectors.children,
          },
        });
      } else {
        setActiveData({
          item: child,
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
          <CanvasItem
            item={tree}
            key={tree.getId()}
            onPositionChange={(position): void => canvas.onTreePositionChange(tree, position)}
            onWidthUpdate={(width): void => canvas.setData(tree, { width })}
            onMouseDown={(): void => handleStepMouseDown(tree)}
            onConnectionLineMouseDown={handleConnectionLineMouseDown}
            parents={tree.getParents().map((parent) => canvas.searchTree(parent))}
            stepChildren={tree.getChildren().map((child) => canvas.searchTree(child))}
          />
        );
      })}
    </>
  );
};
