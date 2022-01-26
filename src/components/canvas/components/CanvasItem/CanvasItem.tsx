import React, { useCallback, useState } from 'react';

import { useCanvas } from '../../context';
import { metrics } from '../../metrics';
import { CanvasTree, ConnectorActivateData, KonvaMouseEvent, Position } from '../../types';
import { Connector } from '../Connector';
import { EventItem } from '../EventItem';
import { ExtremePointItem, ExtremePointProps } from '../ExtremePointItem';
import { StepItem } from '../StepItem';

import {
  getAbsoluteConnectorsPosition,
  getRelativeConnectorsPosition,
} from './get-connector-position';

export type CanvasItemProps = {
  item: CanvasTree;
  onDragStart: (e: KonvaMouseEvent) => void;
  onClick: (e: KonvaMouseEvent) => void;
  onMouseUp: (e: KonvaMouseEvent) => void;
  onMouseMove: (e: KonvaMouseEvent) => void;
  onPositionChange: (position: Position, positionDelta: Position) => void;
  onWidthUpdate: (width: number) => void;
};

type ConnectionKey = 'parentId' | 'childId';

const stepData = {
  name: 'Шаг',
  id: '1',
  events: [],
};

const eventData = { name: 'Сейсмика', id: '1' };

export const CanvasItem: React.FC<CanvasItemProps> = (props) => {
  const { item, onDragStart, onClick, onMouseUp, onMouseMove, onPositionChange, onWidthUpdate } =
    props;

  const id = item.getId();
  const data = item.getData();

  const [stroke, setStroke] = useState<string | undefined>(undefined);

  const { activeData, setActiveData, selectedData, setSelectedData, setCursor } = useCanvas();

  const hasActiveData = activeData !== null;
  const hasActiveConnector = activeData !== null && activeData.item.getId() === id;

  const isRoot = data.type === 'root';
  const isStep = data.type === 'step';
  const isEvent = data.type === 'event';
  const isEnd = data.type === 'end';

  const isSelected = selectedData?.type === 'item' && selectedData.ids.includes(id);
  const isConnectionPossible =
    hasActiveData &&
    activeData?.item.canConnectedWith(item) &&
    !(activeData?.connector.type === 'children' && isRoot) &&
    !(activeData?.connector.type === 'parent' && isEnd);

  //

  const absoluteConnectorsPosition = getAbsoluteConnectorsPosition(item);
  const relativeConnectorsPosition = getRelativeConnectorsPosition(item);

  const connectionKeys: ConnectionKey[] = ['childId', 'parentId'];
  const keys = ['parent', 'children'];

  const [isParentConnectorSelected, isChildConnectorSelected] = connectionKeys.map((key) => {
    if (selectedData !== null) {
      return selectedData.type === 'line' && selectedData[key] === id;
    }
    return false;
  });

  const [isParentConnectorActive, isChildConnectorActive] = keys.map((key) => {
    return hasActiveConnector && activeData?.connector.type === key;
  });

  const [isParentConnectorDisabled, disableChildConnector] = keys.map((key) => {
    return (
      (hasActiveData && !activeData?.item.canConnectedWith(item)) ||
      (hasActiveData && activeData?.connector.type === key)
    );
  });

  const handleConnectorActivate = useCallback(
    (activateData: ConnectorActivateData): void => {
      setActiveData({
        item,
        connector: {
          type: activateData.type,
          position: absoluteConnectorsPosition[activateData.type],
        },
      });
    },
    [setActiveData, item, absoluteConnectorsPosition],
  );

  const stepContent = (
    <>
      {!isRoot && (
        <Connector
          id={`${id}_parent`} // можно убрать
          type="parent"
          position={relativeConnectorsPosition.parent}
          // Выбрана линия, один конец которой присоединен к коннектору
          isSelected={isParentConnectorSelected}
          // Идет процесс соединения от данного коннектора, либо элемент имеет родителей
          isActive={isParentConnectorActive || item.getParents().length > 0}
          // Идет процесс соединения (не от данного элемента) и можно подсоединиться к данному коннектору/элементу
          isConnectionPossible={hasActiveData && !isParentConnectorDisabled}
          // Нельзя подсоединить к этому элементу или активный коннектор совпадает по типу с данным коннектором
          isDisabled={isParentConnectorDisabled}
          onActivate={handleConnectorActivate}
        />
      )}
      {!isEnd && (
        <Connector
          id={`${id}_children`}
          type="children"
          position={relativeConnectorsPosition.children}
          isActive={isChildConnectorActive || item.getChildren().length > 0}
          isSelected={isChildConnectorSelected}
          isConnectionPossible={hasActiveData && !disableChildConnector}
          isDisabled={disableChildConnector}
          onActivate={handleConnectorActivate}
        />
      )}
    </>
  );

  //

  const getStroke = (): string | undefined => {
    if (isSelected) {
      return metrics.step.strokeSelected;
    }

    return stroke;
  };

  const handleUpdateWidth = (newWidth: number): void => {
    onWidthUpdate(newWidth);
  };

  const selectItem = (e: KonvaMouseEvent): void => {
    if (!isSelected) {
      if (e.evt.shiftKey && selectedData?.type === 'item') {
        setSelectedData({
          type: 'item',
          ids: [...selectedData.ids, id],
        });
      } else {
        setSelectedData({
          type: 'item',
          ids: [id],
        });
      }
    }
  };

  const handleClick = (e: KonvaMouseEvent): void => {
    e.cancelBubble = true;

    selectItem(e);

    if (onClick) {
      onClick(e);
    }
  };

  const handleMouseEnter = (): void => {
    if (!hasActiveData || isConnectionPossible) {
      setCursor('pointer');
    }

    if (isConnectionPossible) {
      setStroke(metrics.step.strokeSelected);
    }
  };

  const handleMouseLeave = (): void => {
    setTimeout(() => {
      setCursor('default');
    }, 0);

    if (isConnectionPossible) {
      setStroke(undefined);
    }
  };

  const handleMouseUp = (e: KonvaMouseEvent): void => {
    if (isConnectionPossible) {
      setStroke(undefined);
    }

    if (onMouseUp) {
      onMouseUp(e);
    }
  };

  const itemProps: ExtremePointProps = {
    id,
    name: data.title,
    position: data.position,
    stroke: getStroke(),
    draggable: !hasActiveData,
    selectItem,
    onClick: handleClick,
    onMouseEnter: handleMouseEnter,
    onMouseMove,
    onMouseLeave: handleMouseLeave,
    onMouseUp: handleMouseUp,
    onDragStart,
    onPositionChange,
    children: stepContent,
  };

  const renderItem = () => {
    if (isStep) {
      return <StepItem {...itemProps} stepData={data.stepData || stepData} />;
    }

    if (isEvent) {
      return <EventItem {...itemProps} eventData={data.eventData || eventData} />;
    }

    return <ExtremePointItem {...itemProps} onWidthUpdate={handleUpdateWidth} />;
  };

  return renderItem();
};
