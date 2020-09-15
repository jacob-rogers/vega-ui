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

  const handleItemDragStart = (item: CanvasTree): void => {
    canvas.setTrees(new Set(Canvas.moveToTop(item, canvas.extract())));
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

      const parentClosest = Math.abs(parentDelta) < Math.abs(childDelta);
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

  const handleConnectionLineClick = (parent: CanvasTree, child: CanvasTree): void => {
    const children = Canvas.moveToTop(child.getId(), parent.getChildren());
    canvas.setChildrenIds(parent, children);
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
            onDragStart={(): void => handleItemDragStart(tree)}
            onConnectionLineMouseDown={handleConnectionLineMouseDown}
            itemParents={canvas.getParents(tree)}
            itemChildren={canvas.getChildren(tree)}
            onConnectionLineClick={handleConnectionLineClick}
          />
        );
      })}
    </>
  );
};
