import React from 'react';
import { render } from '@testing-library/react';

import { FileDropzone } from './FileDropzone';
import { useFileDropzone } from './use-file-dropzone';

const TestDropzoneComponent = (): React.ReactElement => {
  return (
    <FileDropzone.Provider api={useFileDropzone()}>
      <FileDropzone>
        <FileDropzone.Input id="test-id" />
      </FileDropzone>
      <FileDropzone.Fullscreen>test</FileDropzone.Fullscreen>
    </FileDropzone.Provider>
  );
};

describe('FileDropzone', () => {
  test('рендерится без ошибок', () => {
    render(<TestDropzoneComponent />);
  });
});
