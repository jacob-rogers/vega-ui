import React from 'react';

import { Grid } from './grid';
import { useGridView } from './hooks';
import { LayoutDataView } from './LayoutDataView';
import { LayoutSplitView } from './LayoutSplitView';
import { LayoutViewContext } from './LayoutViewContext';

interface LayoutViewProps {
  idx?: number;
}

export const LayoutView: React.FC<LayoutViewProps> = (props) => {
  const { idx = 0 } = props;
  const view = useGridView(idx);

  if (Grid.isSplitView(view)) {
    return (
      <LayoutViewContext.Provider value={{ orientation: view.split.getOrientation() }}>
        <LayoutSplitView view={view}>
          <LayoutView idx={view.firstChildIdx()} />
          <LayoutView idx={view.secondChildIdx()} />
        </LayoutSplitView>
      </LayoutViewContext.Provider>
    );
  }

  return <LayoutDataView view={view} />;
};
