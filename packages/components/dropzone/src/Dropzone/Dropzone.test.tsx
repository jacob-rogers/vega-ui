import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { Dropzone, DropzoneProps } from './Dropzone';

function renderComponent(props?: DropzoneProps): RenderResult {
  return render(<Dropzone {...props} />);
}

describe('DragAndDrop', () => {
  test('рендерится без ошибок', () => {
    renderComponent();
  });
});
