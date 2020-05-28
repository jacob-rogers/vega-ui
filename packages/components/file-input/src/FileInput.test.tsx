import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';

import { FileInput, FileInputProps } from './FileInput';

function renderComponent(props?: Partial<FileInputProps>): RenderResult {
  return render(<FileInput id="test-input" {...props} />);
}

describe('FileInput', () => {
  test('рендерится без ошибок', () => {
    renderComponent();
  });

  test('прокидываются пропсы кнопки', () => {
    const { queryByRole } = renderComponent({ size: 'm' });
    const button = queryByRole('button');

    expect(button?.classList.contains('Button_size_m')).toBe(true);
  });

  test('вызывается onChange', () => {
    const onChange = jest.fn();
    const { queryByLabelText } = renderComponent({ onChange });

    const input = queryByLabelText('File input');

    if (input) {
      fireEvent.change(input);
    }

    expect(onChange).toBeCalled();
  });
});
