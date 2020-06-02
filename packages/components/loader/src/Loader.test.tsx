import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { Loader, LoaderProps } from './Loader';

function renderComponent(props: LoaderProps): RenderResult {
  return render(<Loader {...props} />);
}

describe('SnackBar', () => {
  test('рендерится без ошибок', () => {
    renderComponent({});
  });
});
