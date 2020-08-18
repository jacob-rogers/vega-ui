import React, { useCallback, useMemo, useState } from 'react';
import { useMount, useUnmount } from '@gpn-prototypes/vega-hooks';

import { useCanvas } from '../../context';
import { CanvasTree, Connection } from '../../entities';
import { Position } from '../../types';
import { ConnectionLine } from '../ConnectionLine';
import { Connector } from '../Connector';
import { List } from '../List';
import { ListItem } from '../ListItem';

export type StepViewProps = {
  step: CanvasTree;
};

export const StepView: React.FC<StepViewProps> = (props) => {
  const { step } = props;
  const stepData = step.getData();
  const { onPositionChange } = useCanvas();

  const stepChildren = step.getChildren();

  const { type, canHasConnections } = stepData;
  const [stepWidth, setStepWidth] = useState(0);
  const [draggable, setDraggable] = useState(true);

  const handleUpdateWidth = useCallback((newWidth: number): void => {
    setStepWidth(newWidth);
  }, []);

  const [canHasParent, canHasChildren] = useMemo(
    () => ['parent', 'children'].map((el) => canHasConnections?.includes(el as Connection)),
    [canHasConnections],
  );

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

  const connectorsY = isList ? 12 : 20;

  const connectorPosition = {
    parent: {
      x: 0,
      y: connectorsY,
    },
    children: {
      x: stepData.type === 'step' ? 250 : stepWidth,
      y: connectorsY,
    },
  };

  const children = (
    <>
      {canHasParent && (
        <Connector
          {...connectorProps}
          position={connectorPosition.parent}
          stroke={step.getParent() ? '#fff' : undefined}
        />
      )}
      {canHasChildren && (
        <Connector
          {...connectorProps}
          position={connectorPosition.children}
          stroke={stepChildren.length ? '#fff' : undefined}
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
              x: child.getData().position.x,
              y: Number(child.getData().position.y) + (child.getData().type === 'step' ? 12 : 20),
            }}
          />
        </React.Fragment>
      ))}
    </>
  );
};
