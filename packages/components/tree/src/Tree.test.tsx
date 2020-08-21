import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { Tree, TreeProps } from './Tree';

function renderComponent(props?: TreeProps): RenderResult {
  return render(<Tree {...props} />);
}

describe('Tree', () => {
  test('рендерится без ошибок', () => {
    renderComponent({ title: 'Test' });
  });
});
