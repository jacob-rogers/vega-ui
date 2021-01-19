import React from 'react';

import { Grid } from './grid';
import { useGridView } from './hooks';
import { LayoutDataView, LayoutWidget, LayoutWidgetsOverrides } from './LayoutDataView';
import { LayoutSplitView } from './LayoutSplitView';

interface LayoutViewProps {
  idx?: number;
  widgets: LayoutWidget[];
  widgetsOverrides?: LayoutWidgetsOverrides;
}

export const LayoutView: React.FC<LayoutViewProps> = (props) => {
  const { idx = 0, widgets, widgetsOverrides } = props;
  const view = useGridView(idx);

  if (Grid.isSplitView(view)) {
    return (
      <LayoutSplitView view={view}>
        <LayoutView
          idx={view.firstChildIdx()}
          widgets={widgets}
          widgetsOverrides={widgetsOverrides}
        />
        <LayoutView
          idx={view.secondChildIdx()}
          widgets={widgets}
          widgetsOverrides={widgetsOverrides}
        />
      </LayoutSplitView>
    );
  }

  return <LayoutDataView view={view} widgets={widgets} widgetsOverrides={widgetsOverrides} />;
};
