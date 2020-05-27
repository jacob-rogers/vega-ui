import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { DragAndDrop, DragAndDropProps } from './DragAndDrop';

function renderComponent(props?: DragAndDropProps): RenderResult {
  return render(<DragAndDrop {...props} />);
}

describe('DragAndDrop', () => {
  test('рендерится без ошибок', () => {
    renderComponent({ title: 'Test' });
  });
});
