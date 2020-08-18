import React, { useCallback, useState } from 'react';

import { LIST_PADDING, STEP_HEIGHT, STEP_WIDTH } from '../../constants';
import { useCanvas } from '../../context';
import { CanvasTree } from '../../entities';
import { Position } from '../../types';
import { ConnectionLine } from '../ConnectionLine';
import { Connector } from '../Connector';
import { List } from '../List';
import { ListItem } from '../ListItem';

export type StepViewProps = {
  step: CanvasTree;
};

const CONNECTOR_STROKE = '#fff';

export const StepView: React.FC<StepViewProps> = (props) => {
  const { step } = props;
  const stepData = step.getData();
  const { onPositionChange } = useCanvas();

  const stepChildren = step.getChildren();

  const { type } = stepData;
  const [stepWidth, setStepWidth] = useState(0);
  const [draggable, setDraggable] = useState(true);

  const handleUpdateWidth = useCallback((newWidth: number): void => {
    setStepWidth(newWidth);
  }, []);

  const canHasChildren = type !== 'end';
  const canHasParent = type !== 'root';

  const isList = type === 'step';

  const baseProps = {
    draggable,
    position: stepData.position,
    onPositionChange: (position: Position): void => onPositionChange(step, position),
    label: stepData.title,
  };

  const handleConnectorActiveChange = (newActive: boolean): void => {
    setDraggable(!newActive);
  };

  const connectorProps = {
    onActiveChange: handleConnectorActiveChange,
  };

  const connectorsY = isList ? LIST_PADDING : STEP_HEIGHT / 2;

  const connectorPosition = {
    parent: {
      x: 0,
      y: connectorsY,
    },
    children: {
      x: stepData.type === 'step' ? STEP_WIDTH : stepWidth,
      y: connectorsY,
    },
  };

  const children = (
    <>
      {canHasParent && (
        <Connector
          {...connectorProps}
          position={connectorPosition.parent}
          stroke={step.getParent() ? CONNECTOR_STROKE : undefined}
        />
      )}
      {canHasChildren && (
        <Connector
          {...connectorProps}
          position={connectorPosition.children}
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
      {stepChildren.map((child) => (
        <React.Fragment key={child.getId()}>
          <StepView step={child} />
          <ConnectionLine
            parentPosition={{
              x: Number(step.getData().position.x) + connectorPosition.children.x,
              y: Number(step.getData().position.y) + connectorsY,
            }}
            childPosition={{
              x: Number(child.getData().position.x),
              y:
                Number(child.getData().position.y) +
                (child.getData().type === 'step' ? LIST_PADDING : STEP_HEIGHT / 2),
            }}
          />
        </React.Fragment>
      ))}
    </>
  );
};
