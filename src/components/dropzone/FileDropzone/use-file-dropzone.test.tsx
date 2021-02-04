import { renderHook } from '@testing-library/react-hooks';

import { useFileDropzone } from './use-file-dropzone';

describe('useFileDropzone', () => {
  test('вызывается без аргумента options', () => {
    const handlers = {
      onDrop: jest.fn(),
      onDragEnter: jest.fn(),
      onDragLeave: jest.fn(),
    };
    renderHook(() => useFileDropzone(handlers));
  });
});
