import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { Combobox, СomboboxProps } from './Combobox';

type Option = {
  label: string;
  value: string;
};

function renderComponent(props?: СomboboxProps): RenderResult {
  const opt = [
    {
      label: 'option 1',
      value: 'option 1',
    },
    {
      label: 'option 2',
      value: 'option 2',
    },
  ];

  return render(
    <Combobox
      options={opt}
      getOptionLabel={(item: Option): string => item.label}
      id="testSelect"
      {...props}
    />,
  );
}

describe('Combobox', () => {
  test('рендерится без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });
});
