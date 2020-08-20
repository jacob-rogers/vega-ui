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

const getConnectorsPosition = (
  step: CanvasTree,
  type: 'absolute' | 'relative',
  options?: Options,
): ConnectorsPosition => {
  const relativeY = step.getData().type === 'step' ? LIST_PADDING : STEP_HEIGHT / 2;
  const { position } = step.getData();
  const { x: stepPositionX = 0, y: stepPositionY = 0 } = position;
  const absoluteY = relativeY + stepPositionY;
  const isRelative = type === 'relative';
  const y = isRelative ? relativeY : absoluteY;

  const stepWidth = options?.stepWidth ?? 0;

  const parent = {
    x: isRelative ? 0 : stepPositionX,
    y,
  };

  const children = {
    x: stepWidth + (isRelative ? 0 : stepPositionX),
    y,
  };

  return { parent, children };
};

export const StepView: React.FC<StepViewProps> = (props) => {
  const { step } = props;
  const stepData = step.getData();
  const { onPositionChange, activeStep, handleStepActive } = useCanvas();

  const isActiveStep = activeStep && activeStep.stepData.getId() === step.getId();

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
    draggable: Boolean(!isActiveStep),
    position: stepData.position,
    onPositionChange: (position: Position): void => onPositionChange(step, position),
    label: stepData.title,
  };

  const width = isList ? STEP_WIDTH : stepWidth;

  const relativeConnectorsPosition = getConnectorsPosition(step, 'relative', { stepWidth: width });
  const absoluteConnectorsPosition = getConnectorsPosition(step, 'absolute', { stepWidth: width });

  const handleConnectorActive = (connectorType: ConnectorType): void => {
    handleStepActive({
      stepData: step,
      connectorData: { type: connectorType, position: absoluteConnectorsPosition[connectorType] },
    });
  };

  const connectorProps = {
    onChangeActive: handleConnectorActive,
  };

  const children = (
    <>
      {canHasParent && (
        <Connector
          {...connectorProps}
          disabled={Boolean(step.getParent())}
          isActive={isActiveStep && activeStep?.connectorData.type === 'parent'}
          type="parent"
          id={`${step.getId()}_parent`}
          position={relativeConnectorsPosition.parent}
          stroke={step.getParent() ? CONNECTOR_STROKE : undefined}
        />
      )}
      {canHasChildren && (
        <Connector
          {...connectorProps}
          isActive={isActiveStep && activeStep?.connectorData.type === 'children'}
          type="children"
          id={`${step.getId()}_children`}
          position={relativeConnectorsPosition.children}
          stroke={stepChildren.length ? CONNECTOR_STROKE : undefined}
        />
      )}
    </>
  );

  return (
    <>
      {!isList ? (
        <ListItem {...baseProps} onWidthUpdate={handleUpdateWidth} width={72}>
          {children}
        </ListItem>
      ) : (
        <List {...baseProps}>{children}</List>
      )}
      {Array.from(stepChildren).map((child) => (
        <React.Fragment key={child.getId()}>
          <StepView step={child} />
          <ConnectionLine
            parentPosition={absoluteConnectorsPosition.children}
            childPosition={getConnectorsPosition(child, 'absolute').parent}
          />
        </React.Fragment>
      ))}
    </>
  );
};
