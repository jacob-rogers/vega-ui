import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';

import { Tabs } from './Tabs';

type TabItem = {
  name: string;
};

type TabsProps = {
  value?: TabItem | null;
  items: TabItem[];
  getLabel: (item: TabItem) => string | number;
  onChange: () => void;
};

function renderComponent(props: TabsProps): RenderResult {
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
    value: items[1],
    items,
    getLabel: (item: TabItem): string => item.name,
    onChange: (): void => {},
  };

  test('рендерится без ошибок', () => {
    renderComponent(props);
  });

  test('количество табов совпадает с количеством переданных', () => {
    const component = renderComponent(props);

    const tabs = component.container.querySelectorAll('.Tabs-Tab');

    expect(tabs.length).toBe(3);
  });

  test('активный таб отображается верно', () => {
    const component = renderComponent(props);

    const activeTab = component.container.querySelectorAll('.TabsTab_checked');

    expect(activeTab.length).toBe(1);
    expect(activeTab[0]).toHaveTextContent('Очень длинный второй вариант');
  });

  test('срабатывает onChange', () => {
    const onChange = jest.fn();

    const component = renderComponent({
      ...props,
      onChange,
    });

    const tabs = component.container.querySelectorAll('.Tabs-Tab');

    fireEvent.click(tabs[0]);
    expect(onChange).toBeCalled();
  });
});
