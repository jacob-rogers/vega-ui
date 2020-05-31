import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';

import { Dropzone, DropzoneProps } from './Dropzone';

function renderComponent(props?: DropzoneProps): RenderResult {
  return render(<Dropzone data-testid="test-dropzone" {...props} />);
}

describe('DragAndDrop', () => {
  test('рендерится без ошибок', () => {
    renderComponent();
  });

  describe('Не Fullscreen', () => {
    test('отрабатывают события dnd', () => {
      const onDrop = jest.fn();

      const { getByTestId } = renderComponent({ onDrop });
      const dropzone = getByTestId('test-dropzone');

      fireEvent.drop(dropzone);

      expect(onDrop).toBeCalled();
    });
    test('прокидывается корректный className', () => {
      const { getByTestId } = renderComponent();
      const dropzone = getByTestId('test-dropzone');

      expect(dropzone.className).toBe('VegaDropzone');
    });
  });

  describe('Fullscreen', () => {
    test('отрабатывает событие dragenter на document', () => {
      const onDragEnter = jest.fn();
      renderComponent({ onDragEnter, fullscreen: true });
      fireEvent.dragEnter(document);

      expect(onDragEnter).toBeCalled();
    });
    test('проставляется корректный className', () => {
      const { getByTestId } = renderComponent({ fullscreen: true });
      const dropzone = getByTestId('test-dropzone');

      expect(dropzone.classList.contains('is-fullscreen')).toBe(true);
    });
    test('рендерит оверлей', () => {
      const { getByTestId } = renderComponent({ fullscreen: true });
      const dropzone = getByTestId('test-dropzone');

      expect(dropzone.parentElement?.classList.contains('VegaDropzone__Overlay')).toBe(true);
    });
    test('имеется класс visible, если show = true', () => {
      const { getByTestId } = renderComponent({ fullscreen: true });
      const dropzone = getByTestId('test-dropzone');

      expect(dropzone.parentElement?.classList.contains('is-visible')).toBe(true);
    });
    test('не имеет класс visible, если show = false', () => {
      const { getByTestId } = renderComponent({ fullscreen: true, show: false });
      const dropzone = getByTestId('test-dropzone');

      expect(dropzone.parentElement?.classList.contains('is-visible')).toBe(false);
    });
  });
});
