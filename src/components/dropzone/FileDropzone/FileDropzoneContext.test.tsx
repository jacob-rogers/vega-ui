import { renderHook } from '@testing-library/react-hooks';

import { useFileDropzoneProvider } from './FileDropzoneContext';

describe('useFileDropzoneProvider', () => {
  test('выдает ошибку, если хук вызыван вне FileDropzoneProvider', () => {
    const { result } = renderHook(() => useFileDropzoneProvider());
    expect(result.error).toBeDefined();
  });
});
