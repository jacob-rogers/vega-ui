import { renderHook } from '@testing-library/react-hooks';

import { useFileDropzone } from './use-file-dropzone';

describe('useFileDropzone', () => {
  test('отсутствие аргумента options не вызывает ошибку', () => {
    const handlers = {
      onDrop: jest.fn(),
      onDragEnter: jest.fn(),
      onDragLeave: jest.fn(),
    };

    const { result } = renderHook(() => useFileDropzone(handlers));

    expect(result.current.fullscreenVisible).toBe(false);
  });
});
