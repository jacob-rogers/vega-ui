import React from 'react';

import { useCanvas } from '../../context';
import { Canvas } from '../../entities';
import { CanvasTree, KonvaMouseEvent, Position } from '../../types';
import { CanvasItem, getAbsoluteConnectorsPosition } from '../CanvasItem';
import { ConnectionLine } from '../ConnectionLine';

type CanvasItemsProps = {
  canvas: Canvas;
  onItemsPositionChanged: (position: Position, delta: Position, tree: CanvasTree) => void;
};

const positionEquals = (pos1: Position, pos2: Position): boolean => {
  return pos1.x === pos2.x && pos1.y === pos2.y;
};

export const CanvasItems: React.FC<CanvasItemsProps> = (props) => {
  const { canvas, onItemsPositionChanged } = props;
  const {
    stage,
    layer,
    activeData,
    setActiveData,
    abortActiveData,
    setConnectingLinePoints,
    connectingLinePoints,
  } = useCanvas();

  const moveItemToTop = (tree: CanvasTree): void => {
    canvas.setTrees(new Set(Canvas.moveToTop(tree, canvas.extract())));
  };

  const checkConnection = (item: CanvasTree): boolean => {
    const data = item.getData();

    return (
      activeData !== null &&
      data.type !== 'event' &&
      activeData.item.canConnectedWith(item) &&
      !(activeData.connector.type === 'children' && data.type === 'root') &&
      !(activeData.connector.type === 'parent' && data.type === 'end')
    );
  };

  const handleConnectionLineMouseDown = (parent: CanvasTree, child: CanvasTree): void => {
    if (stage !== null && layer !== null) {
      const parentConnectors = getAbsoluteConnectorsPosition(parent);
      const childConnectors = getAbsoluteConnectorsPosition(child);
      const pointerPosition = stage.getPointerPosition();
      const pointerX = (Number(pointerPosition?.x) - layer.x()) * (1 / layer.scaleX());
      const parentDelta = pointerX - parentConnectors.children.x;
      const childDelta = pointerX - childConnectors.parent.x;

      canvas.disconnect(parent, child);

      const parentClosest = Math.abs(parentDelta) < Math.abs(childDelta);

      if (parentClosest) {
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
    const isConnectionPossible = checkConnection(item);

    if (isConnectionPossible && activeData !== null) {
      const items: [CanvasTree, CanvasTree] =
        activeData.connector.type === 'parent' ? [item, activeData.item] : [activeData.item, item];
      canvas.connect(...items);
      abortActiveData();
    }
  };

  const handleConnectionLineClick = (parent: CanvasTree, child: CanvasTree): void => {
    // Поднимает элемент в списке дочерних элементов родителя
    // Таким образом соединяющая линия к элементу будет выше остальных
    const children = Canvas.moveToTop(child.getId(), parent.getChildren());
    canvas.setChildrenIds(parent, children);

    moveItemToTop(child);
  };

  const magnetizeItem = (item: CanvasTree): void => {
    const { parent, children } = getAbsoluteConnectorsPosition(item);

    if (activeData !== null && connectingLinePoints !== null) {
      if (
        activeData.connector.type === 'parent' &&
        !positionEquals(connectingLinePoints.child, children)
      ) {
        setConnectingLinePoints({
          ...connectingLinePoints,
          child: children,
        });
      }

      if (
        activeData.connector.type === 'children' &&
        !positionEquals(connectingLinePoints.child, parent)
      ) {
        setConnectingLinePoints({
          ...connectingLinePoints,
          child: parent,
        });
      }
    }
  };

  const handleItemMouseMove = (e: KonvaMouseEvent, item: CanvasTree): void => {
    const isConnectionPossible = checkConnection(item);

    if (isConnectionPossible) {
      e.cancelBubble = true;
      magnetizeItem(item);
    }
  };

  return (
    <>
      {canvas.extract().map((tree) => {
        const children = canvas.getChildren(tree);
        return children.map((child) => (
          <ConnectionLine
            key={child.getId()}
            parent={{ connector: getAbsoluteConnectorsPosition(tree).children, tree }}
            child={{ connector: getAbsoluteConnectorsPosition(child).parent, tree: child }}
            onClick={(): void => handleConnectionLineClick(tree, child)}
            onMouseDown={(): void => handleConnectionLineMouseDown(tree, child)}
          />
        ));
      })}
      {canvas.extract().map((tree) => {
        return (
          <CanvasItem
            item={tree}
            key={tree.getId()}
            onPositionChange={(position, delta) => onItemsPositionChanged(position, delta, tree)}
            onWidthUpdate={(width): void => canvas.setData(tree, { width })}
            onDragStart={(): void => moveItemToTop(tree)}
            onClick={(): void => moveItemToTop(tree)}
            onMouseUp={(): void => handleItemMouseUp(tree)}
            onMouseMove={(e): void => handleItemMouseMove(e, tree)}
          />
        );
      })}
    </>
  );
};
