import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import { DropzoneDragEvent } from '../types';

import { FileDropzone } from './FileDropzone';

type Props = {
  onDrop: (files: FileList | null) => void;
  onDragEnter?: (e: DropzoneDragEvent) => void;
  onDragLeave?: (e: DropzoneDragEvent) => void;
  onDragOver?: (e: DropzoneDragEvent) => void;
  label?: string;
};

const TestDropzoneComponent = (props: Partial<Props> = {}): React.ReactElement => {
  const { onDrop = jest.fn(), onDragEnter, onDragLeave, label } = props;
  return (
    <FileDropzone fullscreen onDrop={onDrop} onDragEnter={onDragEnter} onDragLeave={onDragLeave}>
      <FileDropzone.Input label={label} id="test-id" />
      <FileDropzone.Fullscreen>test</FileDropzone.Fullscreen>
    </FileDropzone>
  );
};

function createDtWithFiles(files: File[] = []) {
  return {
    dataTransfer: {
      files,
      items: files.map((file: File) => ({
        kind: 'file',
        size: file.size,
        type: file.type,
        getAsFile: () => file,
      })),
      types: ['Files'],
    },
  };
}

function createFile(name: string, size: number, type: string): File {
  const file = new File([], name, { type });
  Object.defineProperty(file, 'size', {
    get() {
      return size;
    },
  });
  return file;
}

describe('FileDropzone', () => {
  let files: File[];

  beforeEach(() => {
    files = [createFile('file1.pdf', 1111, 'application/pdf')];
  });

  afterEach(cleanup);

  test('рендерится без ошибок', () => {
    render(<TestDropzoneComponent />);
  });

  test('рендерится label к input по умолчанию', () => {
    render(<TestDropzoneComponent label="Тест" />);

    expect(screen.getByLabelText('Тест')).toBeVisible();
  });

  test('вызываются обработчики onDrop, onDragEnter, onDragLeave ', () => {
    const event = createDtWithFiles(files);

    const props = {
      onDrop: jest.fn(),
      onDragEnter: jest.fn(),
      onDragLeave: jest.fn(),
    };

    render(<TestDropzoneComponent {...props} />);

    const input = screen.getByLabelText('Добавьте файл');

    fireEvent.dragEnter(input, event);
    expect(props.onDragEnter).toBeCalled();

    fireEvent.drop(input, event);
    expect(props.onDrop).toBeCalled();

    fireEvent.dragLeave(input, event);
    expect(props.onDragLeave).toBeCalled();
  });

  test('срабатывает dragOver', () => {
    const event = createDtWithFiles(files);

    const props = {
      onDrop: jest.fn(),
      onDragEnter: jest.fn(),
      onDragLeave: jest.fn(),
    };

    render(<TestDropzoneComponent {...props} />);

    const input = screen.getByLabelText('Добавьте файл');

    expect(event.dataTransfer).not.toHaveProperty('dropEffect', 'copy');

    fireEvent.dragOver(input, event);

    expect(event.dataTransfer).toHaveProperty('dropEffect', 'copy');
  });
});
