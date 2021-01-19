import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { Tag, TagProps } from './Tag';

function renderComponent(
  props: TagProps = { label: 'Test', mode: 'button', onClick: (): void => {} },
): RenderResult {
  return render(<Tag {...props} />);
}

describe('Tag', () => {
  test('рендерится без ошибок', () => {
    renderComponent();
  });
});
