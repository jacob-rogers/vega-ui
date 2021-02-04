import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { File } from './File';

function renderComponent(): RenderResult {
  return render(<File />);
}

describe('File', () => {
  test('рендерится без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });
});
