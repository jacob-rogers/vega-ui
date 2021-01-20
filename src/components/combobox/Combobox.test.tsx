import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { Combobox } from './Combobox';

type Option = {
  label: string;
  value: string;
};

function renderComponent(props?: React.ComponentProps<typeof Combobox>): RenderResult {
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
