import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { Collapse } from './Collapse';

function renderComponent(): RenderResult {
  return render(<Collapse label="Компнент Collapse" />);
}

describe('Collapse', () => {
  test('Рендерится без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });
});
