import React from 'react';
import { ITabs } from '@gpn-design/uikit/Tabs';
import { fireEvent, render, RenderResult } from '@testing-library/react';

import { Tabs } from './Tabs';

type TabItem = {
  name: string;
};
type TabsProps<T> = ITabs<T>;

function renderComponent<T>(props: TabsProps<T>): RenderResult {
  return render(<Tabs {...props} />);
}

const items: TabItem[] = [
  {
    name: 'Первый',
  },
  {
    name: 'Очень длинный второй вариант',
  },
  {
    name: 'Третий вариант',
  },
];

describe('Tabs', () => {
  const props = {
    items,
    size: 's',
    view: 'bordered',
    getItemKey: (item: TabItem): string => item.name,
    getItemLabel: (item: TabItem): string => item.name,
    value: [items[1]],
  };

  test('рендерится без ошибок', () => {
    renderComponent({
      items: props.items,
      getItemKey: props.getItemKey,
    });
  });

  test('количество табов совпадает с количеством переданных', () => {
    const component = renderComponent({
      items: props.items,
      getItemKey: props.getItemKey,
    });

    const tabs = component.container.querySelectorAll('.Tabs-Tab');

    expect(tabs.length).toBe(3);
  });

  test('активный таб отображается верно', () => {
    const component = renderComponent({
      items: props.items,
      getItemKey: props.getItemKey,
      getItemLabel: props.getItemLabel,
      value: props.value,
    });

    const activeTab = component.container.querySelectorAll('.Tabs-Tab_active');

    expect(activeTab.length).toBe(1);
    expect(activeTab[0].textContent).toBe('Очень длинный второй вариант');
  });

  test('срабатывает onChange', () => {
    const onChange = jest.fn();

    const component = renderComponent({
      items: props.items,
      getItemKey: props.getItemKey,
      getItemLabel: props.getItemLabel,
      value: props.value,
      onChange,
    });

    const tabs = component.container.querySelectorAll('.Tabs-Tab');

    fireEvent.click(tabs[0]);
    expect(onChange).toBeCalled();
  });
});
