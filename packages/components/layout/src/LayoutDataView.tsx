import React from 'react';

import { ChangeAction } from './LayoutOptions/LayoutOptionsList';
import { DataView } from './grid';
import { LayoutBody } from './LayoutBody';
import { LayoutHeader } from './LayoutHeader';
import { LayoutMenu } from './LayoutMenu';
import { LayoutOptions } from './LayoutOptions';
import { LayoutWindow } from './LayoutWindow';

export interface LayoutWidget {
  name: string;
  component: string;
}

export interface LayoutWidgetsOverrides {
  [name: string]: React.ElementType;
}

interface LayoutDataViewProps {
  view: DataView;
  widgets: LayoutWidget[];
  widgetsOverrides?: LayoutWidgetsOverrides;
}

export const LayoutDataView: React.FC<LayoutDataViewProps> = (props) => {
  const { view, widgets, widgetsOverrides = {} } = props;

  const widgetOptions = React.useMemo(
    () =>
      widgets.map((widget) => ({
        label: widget.name,
        value: widget.component,
      })),
    [widgets],
  );

  const widget = view.getWidget();

  const Widget = widget === undefined ? null : widgetsOverrides[widget] || widget;

  const handleOptionClick = (action: ChangeAction): void => {
    if (action === 'close') {
      view.close();
    } else {
      view.split(action);
    }
  };

  return (
    <LayoutWindow role="treeitem">
      <LayoutHeader>
        <LayoutMenu
          items={widgetOptions}
          activeValue={view.getWidget()}
          onChange={(name): void => view.setWidget(name)}
        />
        <LayoutOptions canClose={view.canClose()} onClick={handleOptionClick} />
      </LayoutHeader>
      <LayoutBody>{Widget !== null ? <Widget {...view.getContext({})} /> : null}</LayoutBody>
    </LayoutWindow>
  );
};
