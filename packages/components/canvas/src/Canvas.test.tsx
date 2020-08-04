import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { Canvas, CanvasProps } from './Canvas';

function renderComponent(props?: CanvasProps): RenderResult {
  return render(<Canvas {...props} />);
}

describe('Canvas', () => {
  test('рендерится без ошибок', () => {
    renderComponent({ title: 'Test' });
  });
});
