import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { Combobox, ComboboxProps } from './Combobox';

function renderComponent(props?: ComboboxProps): RenderResult {
  return render(<Combobox {...props} />);
}

describe('Combobox', () => {
  test('рендерится без ошибок', () => {
    renderComponent({ title: 'Test' });
  });
});
