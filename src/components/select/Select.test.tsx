import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { Select } from './Select';

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

  return render(<Select items={items} onChange={() => undefined} id="testSelect" />);
}

describe('Select', () => {
  test('Рендерится без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });
});
