import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { ProgressSpin, ProgressSpinProps } from './ProgressSpin';

function renderComponent(props: ProgressSpinProps): RenderResult {
  return render(<ProgressSpin {...props} />);
}

describe('ProgressSpin', () => {
  test('рендерится без ошибок', () => {
    renderComponent({});
  });
});
