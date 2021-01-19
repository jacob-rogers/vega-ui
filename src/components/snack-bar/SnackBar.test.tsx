import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { SnackBar, SnackBarProps } from './SnackBar';

function renderComponent(props: SnackBarProps): RenderResult {
  return render(<SnackBar {...props} />);
}

describe('SnackBar', () => {
  test('рендерится без ошибок', () => {
    const items = [{ key: 1, message: 'Сообщение' }];

    renderComponent({ items });
  });
});
