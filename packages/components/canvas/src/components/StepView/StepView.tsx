import React, { useCallback } from 'react';

import { SELECTED_COLOR } from '../../constants';
import { useCanvas } from '../../context';
import { CanvasTree } from '../../entities';
import { KonvaMouseEvent, Position } from '../../types';
import { ConnectionLine } from '../ConnectionLine';
import { Connector, ConnectorEvent } from '../Connector';
import { List } from '../List';
import { ListItem } from '../ListItem';

import {
  getAbsoluteConnectorsPosition,
  getRelativeConnectorsPosition,
} from './get-connector-position';

export type StepViewProps = {
  step: CanvasTree;
  parent?: CanvasTree;
  stepChildren: Array<CanvasTree | undefined>;
  onMouseDown: (e: KonvaMouseEvent) => void;
  onPositionChange: (position: Position) => void;
  onWidthUpdate: (width: number) => void;
  onConnectionLineMouseDown: (parent: CanvasTree, child: CanvasTree) => void;
};

type ConnectionKey = 'parentId' | 'childId';

export const StepView: React.FC<StepViewProps> = (props) => {
  const {
    step,
    onMouseDown,
    onPositionChange,
    onWidthUpdate,
    onConnectionLineMouseDown,
    parent,
    stepChildren,
  } = props;
  const stepData = step.getData();
  const { activeData, handleActiveDataChange, selectedData, setCursor } = useCanvas();

  const stepId = step.getId();

  const hasActiveConnnector = Boolean(activeData && activeData.step.getId() === stepId);

  const { type } = stepData;
  const handleUpdateWidth = useCallback(
    (newWidth: number): void => {
      onWidthUpdate(newWidth);
    },
    [onWidthUpdate],
  );

  const canHasChildren = type !== 'end';
  const canHasParent = type !== 'root';

  const isList = type === 'step';

  const absoluteConnectorsPosition = getAbsoluteConnectorsPosition(step);

  const relativeConnectorsPosition = getRelativeConnectorsPosition(step);

  const handleConnectorActive = (connector: ConnectorEvent): void => {
    handleActiveDataChange({
      step,
      connector: { type: connector.type, position: absoluteConnectorsPosition[connector.type] },
    });
  };

  const connectorProps = {
    onActiveChange: handleConnectorActive,
  };

  const keys: ConnectionKey[] = ['childId', 'parentId'];

  const isSelectedStep = selectedData?.type === 'step' && selectedData.id === stepId;

  const [parentConnectorrSelected, childConnectorSelected] = keys.map((key) => {
    if (selectedData !== null) {
      return isSelectedStep || (selectedData.type === 'line' && selectedData[key] === stepId);
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
          isActive={parentConnectorActive || parent !== undefined}
          isSelected={parentConnectorrSelected}
          type="parent"
          id={`${stepId}_parent`}
          position={relativeConnectorsPosition.parent}
        />
      )}
      {canHasChildren && (
        <Connector
          {...connectorProps}
          isActive={childConnectorActive || stepChildren.length > 0}
          isSelected={childConnectorSelected}
          type="children"
          id={`${stepId}_children`}
          position={relativeConnectorsPosition.children}
        />
      )}
    </>
  );

  const baseProps = {
    draggable: !activeData,
    position: stepData.position,
    onMouseDown,
    onPositionChange,
    label: stepData.title,
    onMouseEnter: (): void => {
      setCursor('pointer');
    },
    onMouseLeave: (): void => {
      setCursor('default');
    },
    children: stepContent,
    stroke: isSelectedStep ? SELECTED_COLOR : undefined,
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
            parent={{ connector: absoluteConnectorsPosition.children, tree: step }}
            child={{ connector: getAbsoluteConnectorsPosition(child).parent, tree: child }}
            onMouseDown={(): void => onConnectionLineMouseDown(step, child)}
          />
        );
      })}
    </>
  );
};
