import React from 'react';

import { ChangeAction } from './LayoutOptions/LayoutOptionsList';
import { DataView } from './grid';
import { LayoutBody } from './LayoutBody';
import { LayoutHeader } from './LayoutHeader';
import { LayoutMenu } from './LayoutMenu';
import { LayoutOptions } from './LayoutOptions';
import { LayoutWindow } from './LayoutWindow';

interface LayoutDataViewProps {
  view: DataView;
}

export const LayoutDataView: React.FC<LayoutDataViewProps> = (props) => {
  const { view } = props;
  const widget = view.getWidgetName();
  const context = view.getContext({
    input: '',
  });

  const items = [
    { value: 'projects', label: 'Проекты' },
    { value: 'notProjects', label: 'Не проекты ' },
  ];

  const [activeItem, setActiveItem] = React.useState(items[0].value);

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
        <LayoutMenu items={items} activeValue={activeItem} onChange={setActiveItem} />
        <LayoutOptions canClose={view.canClose()} onClick={handleOptionClick} />
      </LayoutHeader>
      <LayoutBody>
        <select
          name="view"
          value={widget}
          onChange={(e): void => {
            view.setWidgetName(e.target.value);
          }}
        >
          <option value="foo">foo</option>
          <option value="bar">bar</option>
        </select>
        <input
          type="text"
          value={context.input}
          onChange={(e): void => {
            view.setContext({ input: e.target.value });
          }}
        />
      </LayoutBody>
    </LayoutWindow>
  );
};
