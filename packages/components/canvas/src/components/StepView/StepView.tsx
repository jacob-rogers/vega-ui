import React, { useCallback, useMemo, useState } from 'react';
import { useMount, useUnmount } from '@gpn-prototypes/vega-hooks';

import { Connection, Context, Tree } from '../../entities';
import { Position } from '../../types';
import { Connector } from '../Connector';
import { List } from '../List';
import { ListItem } from '../ListItem';

export type StepViewProps = {
  step: Tree<Context>;
  onPositionChange(pos: Position): void;
};

export const StepView: React.FC<StepViewProps> = (props) => {
  const { step, onPositionChange } = props;
  const stepData = step.getData();

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
    onPositionChange,
    label: stepData.title,
  };

  useMount(() => {
    window.addEventListener('mouseup', () => {
      setDraggable(true);
    });
  });

  useUnmount(() => {
    window.removeEventListener('mouseup', () => {
      setDraggable(true);
    });
  });

  const connectorProps = {
    onMouseDown: (): void => setDraggable(false),
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
      {canHasParent && <Connector {...connectorProps} position={connectorPosition.parent} />}
      {canHasChildren && <Connector {...connectorProps} position={connectorPosition.children} />}
    </>
  );

  return !isList ? (
    <ListItem {...baseProps} onWidthUpdate={handleUpdateWidth} width={72}>
      {children}
    </ListItem>
  ) : (
    <List {...baseProps}>{children}</List>
  );
};
