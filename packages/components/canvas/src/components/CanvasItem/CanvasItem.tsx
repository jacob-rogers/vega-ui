import React, { useCallback, useState } from 'react';
import { useOnChange } from '@gpn-prototypes/vega-hooks';

import { SELECTED_COLOR } from '../../constants';
import { useCanvas } from '../../context';
import { CanvasTree, KonvaMouseEvent, Position } from '../../types';
import { Connector, ConnectorEvent } from '../Connector';
import { List } from '../List';
import { ListItem } from '../ListItem';

import {
  getAbsoluteConnectorsPosition,
  getRelativeConnectorsPosition,
} from './get-connector-position';

export type CanvasItemProps = {
  item: CanvasTree;
  onDragStart?: (e: KonvaMouseEvent) => void;
  onClick?: (e: KonvaMouseEvent) => void;
  onMouseUp?: (e: KonvaMouseEvent) => void;
  onMouseEnter?: (e: KonvaMouseEvent) => void;
  onMouseLeave?: (e: KonvaMouseEvent) => void;
  onMouseMove?: (e: KonvaMouseEvent) => void;
  onPositionChange: (position: Position) => void;
  onWidthUpdate: (width: number) => void;
};

type ConnectionKey = 'parentId' | 'childId';

export const CanvasItem: React.FC<CanvasItemProps> = (props) => {
  const {
    item,
    onDragStart,
    onMouseUp,
    onPositionChange,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onClick,
    onWidthUpdate,
  } = props;
  const data = item.getData();
  const { activeData, setActiveData, selectedData, setSelectedData, setCursor } = useCanvas();

  const hasActiveData = activeData !== null;

  const [stroke, setStroke] = useState<string | undefined>(undefined);

  const id = item.getId();

  const hasActiveConnnector = hasActiveData && activeData?.item.getId() === id;

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
      return selectedData.type === 'line' && selectedData[key] === id;
    }
    return false;
  });

  const [parentConnectorActive, childConnectorActive] = keys.map((key) => {
    return hasActiveConnnector && activeData?.connector.type === key;
  });

  const bothConnectorsDisabled = hasActiveData && !activeData?.item.canConnectedWith(item);

  const [disableParentConnector, disableChildConnector] = keys.map((key) => {
    return bothConnectorsDisabled || activeData?.connector.type === key;
  });

  const connectorsEnabled = !disableParentConnector && !disableChildConnector;

  const canConnected = hasActiveData && !hasActiveConnnector && !bothConnectorsDisabled;

  const stepContent = (
    <>
      {canHasParent && (
        <Connector
          {...connectorProps}
          isActive={parentConnectorActive || item.getParents().length > 0}
          isSelected={parentConnectorSelected}
          type="parent"
          disabled={disableParentConnector}
          connectionEnable={hasActiveData && !disableParentConnector}
          id={`${id}_parent`}
          position={relativeConnectorsPosition.parent}
        />
      )}
      {canHasChildren && (
        <Connector
          {...connectorProps}
          isActive={childConnectorActive || item.getChildren().length > 0}
          isSelected={childConnectorSelected}
          type="children"
          disabled={disableChildConnector}
          connectionEnable={hasActiveData && !disableChildConnector}
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

  useOnChange(isSelectedItem, () => {
    setStroke(isSelectedItem ? SELECTED_COLOR : undefined);
  });

  const handleMouseLeave = (e: KonvaMouseEvent): void => {
    setCursor('default');

    if (canConnected) {
      setStroke(undefined);
    }

    if (onMouseLeave) {
      onMouseLeave(e);
    }
  };

  const handleMouseEnter = (): void => {
    if (connectorsEnabled) {
      setCursor('pointer');
    }

    if (canConnected) {
      setStroke(SELECTED_COLOR);
    }
  };

  const handleMouseUp = (e: KonvaMouseEvent): void => {
    if (canConnected && stroke === SELECTED_COLOR) {
      setStroke(undefined);
    }

    if (onMouseUp) {
      onMouseUp(e);
    }
  };

  const baseProps: React.ComponentProps<typeof List> = {
    draggable: !activeData,
    position: data.position,
    onMouseUp: handleMouseUp,
    onPositionChange,
    label: data.title,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick: handleClick,
    children: stepContent,
    onDragStart,
    onMouseMove,
    stroke,
  };

  return !isList ? (
    <ListItem {...baseProps} onWidthUpdate={handleUpdateWidth} width={72} />
  ) : (
    <List {...baseProps} />
  );
};
