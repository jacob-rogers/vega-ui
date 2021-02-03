import React from 'react';
import { render, RenderResult, screen, waitFor } from '@testing-library/react';
import userEvents from '@testing-library/user-event';

import { RadioList, RadioListProps } from './RadioList';
import { RadioListItemProps } from './RadioListItem';

type ComponentsProps = {
  radioListProps?: Partial<RadioListProps>;
  itemProps?: Partial<RadioListItemProps>;
};

const renderComponent = (componentsProps: ComponentsProps = {}): RenderResult => {
  const { radioListProps, itemProps } = componentsProps;
  const props = {
    radioListProps,
    itemProps,
  };
  const onChange = radioListProps?.onChange;

  return render(
    <RadioList
      name="name"
      {...props.radioListProps}
      value={radioListProps?.value}
      onChange={onChange}
      data-testid="RadioList"
    >
      <RadioList.Item value="test1" {...props.itemProps}>
        тест1
      </RadioList.Item>
      <RadioList.Item value="test2" {...props.itemProps}>
        тест2
      </RadioList.Item>
    </RadioList>,
  );
};

describe('RadioList', () => {
  test('рендерится без ошибок', () => {
    renderComponent();
  });
});

describe('RadioListItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('по умолчанию не выбрано значение', () => {
    renderComponent();

    expect(screen.queryAllByRole('aria-checked').length).toBe(0);
  });

  test('проставляется active', () => {
    renderComponent({ radioListProps: { value: 'test1' } });

    waitFor(() => {
      expect(screen.queryAllByRole('aria-checked').length).toBe(1);
    });
  });

  test('переключаются radio ', () => {
    renderComponent();

    userEvents.click(screen.getByLabelText('тест2'));

    expect(screen.getAllByTitle('radioInput')[1]).toHaveAttribute('value', 'test2');
  });

  test('срабатывает onChange', () => {
    const onChange = jest.fn();
    renderComponent({ radioListProps: { onChange } });

    userEvents.click(screen.getByLabelText('тест2'));

    expect(onChange).toBeCalled();
    expect(onChange).toBeCalledWith('test2');
  });
});
