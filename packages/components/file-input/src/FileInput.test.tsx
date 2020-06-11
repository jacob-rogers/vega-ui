import React from 'react';
import { Button } from '@gpn-prototypes/vega-button';
import { fireEvent, render, RenderResult } from '@testing-library/react';

import { FileInput, FileInputProps } from './FileInput';

function renderComponent(props?: Partial<FileInputProps>): RenderResult {
  return render(
    <FileInput id="test-input" {...props}>
      {(buttonProps): React.ReactNode => <Button {...buttonProps} />}
    </FileInput>,
  );
}

describe('FileInput', () => {
  test('рендерится без ошибок', () => {
    renderComponent();
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
