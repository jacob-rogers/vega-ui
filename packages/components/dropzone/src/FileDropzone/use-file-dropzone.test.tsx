import { act, renderHook } from '@testing-library/react-hooks';

import { useFileDropzone } from './use-file-dropzone';

const generateDragEvent = (type: string): DragEvent => {
  const event = new MouseEvent(type);
  const dataTransfer: DataTransfer = {
    dropEffect: 'copy',
    effectAllowed: 'copy',
    clearData: jest.fn(),
    getData: jest.fn(),
    setData: jest.fn(),
    setDragImage: jest.fn(),
    files: { item: (): null => null, length: 0 },
    types: [],
    items: {
      add: jest.fn(),
      clear: jest.fn(),
      length: 0,
      remove: jest.fn(),
      item: (): DataTransferItem => ({
        kind: '',
        type: '',
        getAsFile: (): null => null,
        getAsString: jest.fn(),
        webkitGetAsEntry: jest.fn(),
      }),
    },
  };

  return { ...event, dataTransfer, preventDefault: jest.fn() };
};

describe('useFileDropzone', () => {
  const handleDragEnter = jest.fn();
  const handleDragLeave = jest.fn();
  const handleDragOver = jest.fn();
  const handleLoad = jest.fn();

  const { result } = renderHook(() =>
    useFileDropzone(
      {
        onDragEnter: handleDragEnter,
        onDragLeave: handleDragLeave,
        onDragOver: handleDragOver,
        onLoad: handleLoad,
      },
      { withFullscreen: true },
    ),
  );

  test('вызывается handleDragEnter', () => {
    act(() => {
      const event = generateDragEvent('dragstart');
      result.current.handleDragEnter(event);
    });

    expect(handleDragEnter).toBeCalled();
  });

  test('вызывается handleDragOver', () => {
    act(() => {
      const event = generateDragEvent('dragover');
      result.current.handleDragOver(event);
    });

    expect(handleDragOver).toBeCalled();
  });

  test('вызывается handleDragLeave', () => {
    act(() => {
      const event = generateDragEvent('dragleave');
      result.current.handleDragLeave(event);
    });

    expect(handleDragLeave).toBeCalled();
  });

  test('вызывается handleLoad', () => {
    act(() => {
      const event = generateDragEvent('drop');
      result.current.handleLoad(event);
    });

    expect(handleLoad).toBeCalled();
  });
});
