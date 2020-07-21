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

interface LayoutDataViewProps {
  view: DataView;
  widgets: LayoutWidget[];
}

export const LayoutDataView: React.FC<LayoutDataViewProps> = (props) => {
  const { view, widgets } = props;

  const widgetOptions = React.useMemo(
    () =>
      widgets.map((widget) => ({
        label: widget.name,
        value: widget.component,
      })),
    [widgets],
  );

  const Component = view.getWidgetName();

  const handleOptionClick = (action: ChangeAction): void => {
    if (action === 'close') {
      view.close();
    } else {
      view.split(action);
    }
  };

  return (
    <LayoutWindow>
      <LayoutHeader>
        <LayoutMenu
          items={widgetOptions}
          activeValue={view.getWidgetName()}
          onChange={(name): void => view.setWidgetName(name)}
        />
        <LayoutOptions canClose={view.canClose()} onClick={handleOptionClick} />
      </LayoutHeader>
      <LayoutBody>{Component !== undefined && <Component />}</LayoutBody>
    </LayoutWindow>
  );
};
