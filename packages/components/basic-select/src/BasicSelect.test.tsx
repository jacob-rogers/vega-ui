import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { BasicSelect, BasicSelectProps } from './BasicSelect';

type Option = {
  label: string;
  value: string;
};

function renderComponent(props?: BasicSelectProps): RenderResult {
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
    <BasicSelect
      options={opt}
      getOptionLabel={(item: Option): string => item.label}
      id="testSelect"
      {...props}
    />,
  );
}

describe('BasicSelect', () => {
  test('рендерится без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });
});
