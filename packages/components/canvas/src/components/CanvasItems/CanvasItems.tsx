import React from 'react';

import { useCanvas } from '../../context';
import { Canvas } from '../../entities';
import { CanvasTree, KonvaMouseEvent } from '../../types';
import { CanvasItem, getAbsoluteConnectorsPosition } from '../CanvasItem';

type CanvasItemsProps = {
  canvas: Canvas;
};

export const CanvasItems: React.FC<CanvasItemsProps> = (props) => {
  const { canvas } = props;
  const {
    stageRef,
    activeData,
    setActiveData,
    abortActiveData,
    setConnectingLinePoints,
    connectingLinePoints,
  } = useCanvas();

  const moveItemToTop = (tree: CanvasTree): void => {
    canvas.setTrees(new Set(Canvas.moveToTop(tree, canvas.extract())));
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

  const handleItemMouseUp = (item: CanvasTree): void => {
    if (activeData) {
      const items: [CanvasTree, CanvasTree] =
        activeData.connector.type === 'parent' ? [item, activeData.item] : [activeData.item, item];
      canvas.connect(...items);
      abortActiveData();
    }
  };

  const handleConnectionLineClick = (parent: CanvasTree, child: CanvasTree): void => {
    const children = Canvas.moveToTop(child.getId(), parent.getChildren());
    canvas.setChildrenIds(parent, children);
    moveItemToTop(child);
  };

  const handleItemMouseEnter = (item: CanvasTree): void => {
    const { parent, children } = getAbsoluteConnectorsPosition(item);

    if (activeData !== null && connectingLinePoints !== null) {
      if (activeData.connector.type === 'parent') {
        setConnectingLinePoints({
          ...connectingLinePoints,
          child: children,
        });
      }

      if (activeData.connector.type === 'children') {
        setConnectingLinePoints({
          ...connectingLinePoints,
          child: parent,
        });
      }
    }
  };

  const handleItemMouseMove = (e: KonvaMouseEvent, item: CanvasTree): void => {
    const data = item.getData();
    const cancelBubbleMouseOver =
      activeData !== null &&
      activeData?.item.canConnectedWith(item) &&
      !(activeData.connector.type === 'parent' && data.type === 'end') &&
      !(activeData.connector.type === 'children' && data.type === 'root');

    if (cancelBubbleMouseOver) {
      e.cancelBubble = true;
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
            onDragStart={(): void => moveItemToTop(tree)}
            onClick={(): void => moveItemToTop(tree)}
            onMouseUp={(): void => handleItemMouseUp(tree)}
            onMouseEnter={(): void => handleItemMouseEnter(tree)}
            onMouseMove={(e): void => handleItemMouseMove(e, tree)}
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
