import React, { useCallback, useState } from 'react';

import { LIST_PADDING, STEP_HEIGHT, STEP_WIDTH } from '../../constants';
import { useCanvas } from '../../context';
import { CanvasTree } from '../../entities';
import { ConnectorType, Position } from '../../types';
import { ConnectionLine } from '../ConnectionLine';
import { Connector } from '../Connector';
import { List } from '../List';
import { ListItem } from '../ListItem';

export type StepViewProps = {
  step: CanvasTree;
};

type ConnectorsPosition = {
  parent: Required<Position>;
  children: Required<Position>;
};

type Options = {
  stepWidth?: number;
};

const CONNECTOR_STROKE = '#fff';

const getConnectorsPosition = (step: CanvasTree, options?: Options): ConnectorsPosition => {
  const relativeY = step.getData().type === 'step' ? LIST_PADDING : STEP_HEIGHT / 2;
  const { position } = step.getData();
  const { x: stepPositionX = 0, y: stepPositionY = 0 } = position;
  const y = relativeY + stepPositionY;

  const stepWidth = options?.stepWidth ?? 0;

  const parent = {
    x: stepPositionX,
    y,
  };

  const children = {
    x: stepWidth + stepPositionX,
    y,
  };

  return { parent, children };
};

export const StepView: React.FC<StepViewProps> = (props) => {
  const { step } = props;
  const stepData = step.getData();
  const { canvas, draggableData, handleConnectorDrag, handleStepDrag } = useCanvas();

  const hasActiveConnnector = Boolean(draggableData && draggableData.step.getId() === step.getId());

  const stepChildren = step.getChildren();

  const { type } = stepData;
  const [stepWidth, setStepWidth] = useState(0);

  const handleUpdateWidth = useCallback((newWidth: number): void => {
    setStepWidth(newWidth);
  }, []);

  const canHasChildren = type !== 'end';
  const canHasParent = type !== 'root';

  const isList = type === 'step';

  const baseProps = {
    draggable: !hasActiveConnnector,
    position: stepData.position,
    onPositionChange: (position: Position): void => canvas.onTreePositionChange(step, position),
    onDragEnd: (): void => canvas.onUpdate(),
    label: stepData.title,
    onMouseDown: (): void => {
      handleStepDrag(step);
    },
  };

  const parent = canvas.searchTree(step.getParent());

  const width = isList ? STEP_WIDTH : stepWidth;

  const absoluteConnectorsPosition = getConnectorsPosition(step, { stepWidth: width });

  const handleConnectorActive = (connectorType: ConnectorType): void => {
    handleConnectorDrag({
      step,
      connector: { type: connectorType, position: absoluteConnectorsPosition[connectorType] },
    });
  };

  const connectorProps = {
    onChangeActive: handleConnectorActive,
  };

  return (
    <>
      {!isList ? (
        <ListItem {...baseProps} onWidthUpdate={handleUpdateWidth} width={72} />
      ) : (
        <List {...baseProps} />
      )}
      {canHasParent && (
        <Connector
          {...connectorProps}
          disabled={Boolean(step.getParent())}
          isActive={hasActiveConnnector && draggableData?.connector.type === 'parent'}
          type="parent"
          id={`${step.getId()}_parent`}
          position={absoluteConnectorsPosition.parent}
          stroke={parent ? CONNECTOR_STROKE : undefined}
        />
      )}
      {canHasChildren && (
        <Connector
          {...connectorProps}
          isActive={hasActiveConnnector && draggableData?.connector.type === 'children'}
          type="children"
          id={`${step.getId()}_children`}
          position={absoluteConnectorsPosition.children}
          stroke={stepChildren.length ? CONNECTOR_STROKE : undefined}
        />
      )}
      {step.getChildren().map((child) => {
        const childTree = canvas.searchTree(child);
        if (!childTree) {
          return null;
        }
        return (
          <ConnectionLine
            key={child}
            parentPosition={absoluteConnectorsPosition.children}
            childPosition={getConnectorsPosition(childTree).parent}
          />
        );
      })}
    </>
  );
};
