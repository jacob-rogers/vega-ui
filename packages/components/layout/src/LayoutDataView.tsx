import React from 'react';

import { DataView } from './grid';

interface LayoutDataViewProps {
  view: DataView;
}

export const LayoutDataView: React.FC<LayoutDataViewProps> = (props) => {
  const { view } = props;
  const widget = view.getWidgetName();
  const context = view.getContext({
    input: '',
  });

  return (
    <div style={{ display: 'grid' }}>
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
      <button type="button" onClick={(): void => view.split('left')}>
        добавить слева
      </button>
      <button type="button" onClick={(): void => view.split('right')}>
        добавить справа
      </button>
      <button type="button" onClick={(): void => view.split('up')}>
        добавить сверху
      </button>
      <button type="button" onClick={(): void => view.split('down')}>
        добавить снизу
      </button>
      {view.canClose() && (
        <button type="button" onClick={(): void => view.close()}>
          закрыть
        </button>
      )}
    </div>
  );
};
