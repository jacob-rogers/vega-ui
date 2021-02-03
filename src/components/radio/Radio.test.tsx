import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { Radio } from './Radio';

function renderComponent(): RenderResult {
  return render(<Radio onChange={jest.fn} checked={false} label="Радио" />);
}

describe('Radio', () => {
  test('рендерится без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });
});
