import React from 'react';
import { fireEvent, render, RenderResult, screen } from '@testing-library/react';

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
  const onChange = jest.fn();

  beforeEach(() => {
    onChange.mockClear();
  });

  return render(
    <RadioList
      name="name"
      {...props.radioListProps}
      value="test1"
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

const findInputArray = (title = 'radioInput'): Element[] => {
  return screen.getAllByTitle(title);
};

const findRadioArray = (role = 'radio'): Element[] => {
  return screen.getAllByRole(role);
};

describe('RadioList', () => {
  test('рендерится без ошибок', () => {
    renderComponent();
  });
});

describe('RadioListItem', () => {
  test('проставляется active', () => {
    renderComponent();

    const item = findRadioArray()[0];
    expect(item).toHaveAttribute('aria-checked', 'true');
  });
  test('Переключаются radio ', () => {
    renderComponent();

    const item = findInputArray()[0];

    if (item) {
      fireEvent.change(item, { target: { value: 'test2' } });
      expect(item.value).toBe('test2');
    }
  });
});
