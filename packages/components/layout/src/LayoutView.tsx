import React from 'react';

import { Grid } from './grid';
import { useGridView } from './hooks';
import { LayoutDataView } from './LayoutDataView';
import { LayoutSplitView } from './LayoutSplitView';

interface LayoutViewProps {
  idx?: number;
}

export const LayoutView: React.FC<LayoutViewProps> = (props) => {
  const { idx = 0 } = props;
  const view = useGridView(idx);

  if (Grid.isSplitView(view)) {
    return (
      <LayoutSplitView view={view}>
        <LayoutView idx={view.firstChildIdx()} />
        <LayoutView idx={view.secondChildIdx()} />
      </LayoutSplitView>
    );
  }

  return <LayoutDataView view={view} />;
};
