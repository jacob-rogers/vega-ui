import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { Attach, AttachProps } from './Attach';

function renderComponent(props: AttachProps): RenderResult {
  return render(<Attach {...props} />);
}

describe('Attach', () => {
  test('рендерится без ошибок', () => {
    renderComponent({});
  });
});
