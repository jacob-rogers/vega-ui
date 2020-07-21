import React from 'react';

import { Grid } from './grid';
import { useGridView } from './hooks';
import { LayoutDataView, LayoutWidget } from './LayoutDataView';
import { LayoutSplitView } from './LayoutSplitView';

interface LayoutViewProps {
  idx?: number;
  widgets: LayoutWidget[];
}

export const LayoutView: React.FC<LayoutViewProps> = (props) => {
  const { idx = 0, widgets } = props;
  const view = useGridView(idx);

  if (Grid.isSplitView(view)) {
    return (
      <LayoutSplitView view={view}>
        <LayoutView idx={view.firstChildIdx()} widgets={widgets} />
        <LayoutView idx={view.secondChildIdx()} widgets={widgets} />
      </LayoutSplitView>
    );
  }

  return <LayoutDataView view={view} widgets={widgets} />;
};
