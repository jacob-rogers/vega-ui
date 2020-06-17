import React from 'react';
import { fireEvent, render, RenderResult, screen } from '@testing-library/react';

import { NavigationList, NavigationListProps } from './NavigationList';
import { NavigationListItemProps } from './NavigationListItem';

const listTestId = 'ListTestId';
const itemTestId = 'ItemTestId';
const buttonTestId = 'ButtonTestId';
const delimiterTestId = 'DelimiterTestId';

const renderComponent = (
  listProps: NavigationListProps,
  itemProps: Partial<NavigationListItemProps>,
  buttonProps: {
    onClick?: () => void;
  },
): RenderResult => {
  return render(
    <NavigationList {...listProps} data-testid={listTestId}>
      <NavigationList.Item {...itemProps} data-testid={itemTestId}>
        {(props): React.ReactNode => (
          <button type="button" {...props} {...buttonProps} data-testid={buttonTestId}>
            Первый
          </button>
        )}
      </NavigationList.Item>
      <NavigationList.Item>
        {(props): React.ReactNode => (
          <button type="button" {...props}>
            Второй
          </button>
        )}
      </NavigationList.Item>
      <NavigationList.Item>
        {(props): React.ReactNode => (
          <button type="button" {...props}>
            Третий
          </button>
        )}
      </NavigationList.Item>
      <NavigationList.Delimiter data-testid={delimiterTestId} />
      <NavigationList.Item>
        {(props): React.ReactNode => (
          <button type="button" {...props}>
            Четвертый
          </button>
        )}
      </NavigationList.Item>
      <NavigationList.Item>
        {(props): React.ReactNode => (
          <button type="button" {...props}>
            Пятый
          </button>
        )}
      </NavigationList.Item>
    </NavigationList>,
  );
};

describe('NavigationList', () => {
  test('рендерится без ошибок', () => {
    renderComponent({}, {}, {});
  });
  test('для нумерации добавляется класс ordered', () => {
    renderComponent({ ordered: true }, {}, {});

    const list = screen.getByTestId(listTestId);

    expect(list.classList.contains('VegaNavigationList_ordered')).toBe(true);
  });
});

describe('NavigationList.Item', () => {
  test('к активному элементу добавляется active класс', () => {
    renderComponent({}, { active: true }, {});

    const item = screen.getByTestId(buttonTestId);

    expect(item.classList.contains('VegaNavigationList__Item_active')).toBe(true);
  });
  test('при клике по элементу срабатывает onClick', () => {
    const onClick = jest.fn();

    renderComponent({}, {}, { onClick });

    const item = screen.getByTestId(buttonTestId);

    fireEvent.click(item);
    expect(onClick).toBeCalled();
  });
});
