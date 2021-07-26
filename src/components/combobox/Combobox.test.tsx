import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { Combobox } from './Combobox';

type Item = {
  label: string;
  id: string;
};

function renderComponent(): RenderResult {
  const items: Item[] = [
    {
      label: 'option 1',
      id: 'option 1',
    },
    {
      label: 'option 2',
      id: 'option 2',
    },
  ];

  return render(<Combobox items={items} onChange={() => undefined} id="testSelect" />);
}

describe('Combobox', () => {
  test('рендерится без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });
});
