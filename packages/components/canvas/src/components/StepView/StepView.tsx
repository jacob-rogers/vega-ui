import React, { useMemo, useState } from 'react';

import { Connection, Context, Tree } from '../../entities';
import { Connector } from '../Connector';
import { List } from '../List';
import { ListItem } from '../ListItem';

export type StepViewProps = {
  step: Tree<Context>;
};

export const StepView: React.FC<StepViewProps> = (props) => {
  const { step } = props;
  const stepData = step.getData();

  const { type, canHasConnections } = stepData;

  const [canHasParent, canHasChildren] = useMemo(
    () => ['parent', 'children'].map((el) => canHasConnections?.includes(el as Connection)),
    [canHasConnections],
  );

  const [draggable, setDraggable] = useState(true);
};
