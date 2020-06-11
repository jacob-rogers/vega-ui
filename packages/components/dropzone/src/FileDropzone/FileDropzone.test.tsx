import React from 'react';
import { render } from '@testing-library/react';

import { FileDropzone } from './FileDropzone';

const TestDropzoneComponent = (): React.ReactElement => {
  return (
    <FileDropzone fullscreen onDrop={jest.fn()}>
      <FileDropzone.Input label="Тест" id="test-id" />
      <FileDropzone.Fullscreen>test</FileDropzone.Fullscreen>
    </FileDropzone>
  );
};

describe('FileDropzone', () => {
  test('рендерится без ошибок', () => {
    render(<TestDropzoneComponent />);
  });
});
