import React, { useCallback } from 'react';

import { SELECTED_COLOR } from '../../constants';
import { useCanvas } from '../../context';
import { CanvasTree, KonvaMouseEvent, Position } from '../../types';
import { ConnectionLine } from '../ConnectionLine';
import { Connector, ConnectorEvent } from '../Connector';
import { List } from '../List';
import { ListItem } from '../ListItem';

import {
  getAbsoluteConnectorsPosition,
  getRelativeConnectorsPosition,
} from './get-connector-position';

export type CanvasItemProps = {
  item: CanvasTree;
  itemParents: CanvasTree[];
  itemChildren: CanvasTree[];
  onDragStart?: (e: KonvaMouseEvent) => void;
  onClick?: (e: KonvaMouseEvent) => void;
  onPositionChange: (position: Position) => void;
  onWidthUpdate: (width: number) => void;
  onConnectionLineMouseDown: (parent: CanvasTree, child: CanvasTree) => void;
  onConnectionLineClick: (parent: CanvasTree, child: CanvasTree) => void;
};

type ConnectionKey = 'parentId' | 'childId';

export const CanvasItem: React.FC<CanvasItemProps> = (props) => {
  const {
    item,
    onDragStart,
    onPositionChange,
    onClick,
    onWidthUpdate,
    onConnectionLineMouseDown,
    itemParents,
    itemChildren,
    onConnectionLineClick,
  } = props;
  const data = item.getData();
  const { activeData, setActiveData, selectedData, setSelectedData, setCursor } = useCanvas();

  const id = item.getId();

  const hasActiveConnnector = Boolean(activeData && activeData.item.getId() === id);

  const { type } = data;
  const handleUpdateWidth = useCallback(
    (newWidth: number): void => {
      onWidthUpdate(newWidth);
    },
    [onWidthUpdate],
  );

  const canHasChildren = type !== 'end';
  const canHasParent = type !== 'root';

  const isList = type === 'step';

  const absoluteConnectorsPosition = getAbsoluteConnectorsPosition(item);

  const relativeConnectorsPosition = getRelativeConnectorsPosition(item);

  const handleConnectorActive = useCallback(
    (connector: ConnectorEvent): void => {
      setActiveData({
        item,
        connector: { type: connector.type, position: absoluteConnectorsPosition[connector.type] },
      });
    },
    [absoluteConnectorsPosition, setActiveData, item],
  );

  const connectorProps = {
    onActiveChange: handleConnectorActive,
  };

  const connectionKeys: ConnectionKey[] = ['childId', 'parentId'];
  const keys = ['parent', 'children'];

  const isSelectedItem = selectedData?.type === 'item' && selectedData.id === id;

  const [parentConnectorSelected, childConnectorSelected] = connectionKeys.map((key) => {
    if (selectedData !== null) {
      return isSelectedItem || (selectedData.type === 'line' && selectedData[key] === id);
    }
    return false;
  });

  const [parentConnectorActive, childConnectorActive] = keys.map((key) => {
    return hasActiveConnnector && activeData?.connector.type === key;
  });

  const bothConnectorsDisabled = activeData && !activeData.item.canConnectedWith(item);

  const [disableParentConnector, disableChildConnector] = keys.map((key) => {
    return bothConnectorsDisabled || activeData?.connector.type === key;
  });

  const stepContent = (
    <>
      {canHasParent && (
        <Connector
          {...connectorProps}
          isActive={parentConnectorActive || itemParents.length > 0}
          isSelected={parentConnectorSelected}
          type="parent"
          disabled={disableParentConnector}
          id={`${id}_parent`}
          position={relativeConnectorsPosition.parent}
        />
      )}
      {canHasChildren && (
        <Connector
          {...connectorProps}
          isActive={childConnectorActive || itemChildren.length > 0}
          isSelected={childConnectorSelected}
          type="children"
          disabled={disableChildConnector}
          id={`${id}_children`}
          position={relativeConnectorsPosition.children}
        />
      )}
    </>
  );

  const handleClick = useCallback(
    (e: KonvaMouseEvent): void => {
      e.cancelBubble = true;
      if (!isSelectedItem) {
        setSelectedData({
          type: 'item',
          id,
        });
      }
      if (onClick) {
        onClick(e);
      }
    },
    [setSelectedData, id, isSelectedItem, onClick],
  );

  const baseProps = {
    draggable: !activeData,
    position: data.position,
    onPositionChange,
    label: data.title,
    onMouseEnter: (): void => {
      if (!disableChildConnector && !disableParentConnector) {
        setCursor('pointer');
      }
    },
    onMouseLeave: (): void => {
      setCursor('default');
    },
    onClick: handleClick,
    onDragStart,
    children: stepContent,
    stroke: isSelectedItem ? SELECTED_COLOR : undefined,
  };

  return (
    <>
      {!isList ? (
        <ListItem {...baseProps} onWidthUpdate={handleUpdateWidth} width={72} />
      ) : (
        <List {...baseProps} />
      )}
      {itemChildren.map((child) => {
        if (child === undefined) {
          return null;
        }

        return (
          <ConnectionLine
            key={child.getId()}
            parent={{ connector: absoluteConnectorsPosition.children, tree: item }}
            child={{ connector: getAbsoluteConnectorsPosition(child).parent, tree: child }}
            onMouseDown={(): void => onConnectionLineMouseDown(item, child)}
            onClick={(): void => onConnectionLineClick(item, child)}
          />
        );
      })}
    </>
  );
};
