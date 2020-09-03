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
  parents: Array<CanvasTree | undefined>;
  stepChildren: Array<CanvasTree | undefined>;
  onMouseDown: (e: KonvaMouseEvent) => void;
  onPositionChange: (position: Position) => void;
  onWidthUpdate: (width: number) => void;
  onConnectionLineMouseDown: (parent: CanvasTree, child: CanvasTree) => void;
};

type ConnectionKey = 'parentId' | 'childId';

export const CanvasItem: React.FC<CanvasItemProps> = (props) => {
  const {
    item,
    onMouseDown,
    onPositionChange,
    onWidthUpdate,
    onConnectionLineMouseDown,
    parents,
    stepChildren,
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

  const keys: ConnectionKey[] = ['childId', 'parentId'];

  const isSelectedItem = selectedData?.type === 'item' && selectedData.id === id;

  const [parentConnectorrSelected, childConnectorSelected] = keys.map((key) => {
    if (selectedData !== null) {
      return isSelectedItem || (selectedData.type === 'line' && selectedData[key] === id);
    }
    return false;
  });

  const [parentConnectorActive, childConnectorActive] = ['parent', 'children'].map((key) => {
    return hasActiveConnnector && activeData?.connector.type === key;
  });

  const stepContent = (
    <>
      {canHasParent && (
        <Connector
          {...connectorProps}
          isActive={parentConnectorActive || parents.length > 0}
          isSelected={parentConnectorrSelected}
          type="parent"
          id={`${id}_parent`}
          position={relativeConnectorsPosition.parent}
        />
      )}
      {canHasChildren && (
        <Connector
          {...connectorProps}
          isActive={childConnectorActive || stepChildren.length > 0}
          isSelected={childConnectorSelected}
          type="children"
          id={`${id}_children`}
          position={relativeConnectorsPosition.children}
        />
      )}
    </>
  );

  const handleStepClick = useCallback((): void => {
    if (!isSelectedItem) {
      setSelectedData({
        type: 'item',
        id,
      });
    }
  }, [setSelectedData, id, isSelectedItem]);

  const baseProps = {
    draggable: !activeData,
    position: data.position,
    onMouseDown,
    onPositionChange,
    label: data.title,
    onMouseEnter: (): void => {
      setCursor('pointer');
    },
    onMouseLeave: (): void => {
      setCursor('default');
    },
    onClick: (e: KonvaMouseEvent): void => {
      e.cancelBubble = true;
      handleStepClick();
    },
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
      {stepChildren.map((child) => {
        if (child === undefined) {
          return null;
        }

        return (
          <ConnectionLine
            key={child.getId()}
            parent={{ connector: absoluteConnectorsPosition.children, tree: item }}
            child={{ connector: getAbsoluteConnectorsPosition(child).parent, tree: child }}
            onMouseDown={(): void => onConnectionLineMouseDown(item, child)}
          />
        );
      })}
    </>
  );
};
