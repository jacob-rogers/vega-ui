import React from 'react';
import { act, fireEvent, render, RenderResult, screen } from '@testing-library/react';

import { SplitPanes, SplitPanesProps } from './SplitPanes';

function renderComponent(props?: Partial<SplitPanesProps>): RenderResult {
  return render(
    <SplitPanes {...props}>
      <SplitPanes.Pane aria-label="first">1</SplitPanes.Pane>
      <SplitPanes.Pane aria-label="second">2</SplitPanes.Pane>
      <SplitPanes.Pane aria-label="third">3</SplitPanes.Pane>
    </SplitPanes>,
  );
}

function findResizers(): HTMLElement[] {
  return screen.getAllByRole('presentation');
}

function isResizerActive(resizer: HTMLElement): boolean {
  return resizer.getAttribute('aria-current') === 'true';
}

function startResize(resizer: HTMLElement, eventData = {}): void {
  act(() => {
    fireEvent.mouseDown(resizer, {
      button: 0,
      ...eventData,
    });
  });
}

function moveResizer(clientX: number, clientY: number, eventData = {}): void {
  act(() => {
    fireEvent.mouseMove(document.body, {
      clientX,
      clientY,
      buttons: 1,
      ...eventData,
    });
  });
}

function stopResize(): void {
  act(() => {
    fireEvent.mouseUp(document.body);
  });
}

describe('SplitPanes', () => {
  let result: RenderResult;
  const onResize = jest.fn();
  const onResizeStart = jest.fn();
  const onResizeEnd = jest.fn();

  beforeEach(() => {
    result = renderComponent({
      onResizeStart,
      onResize,
      onResizeEnd,
    });
  });

  afterEach(() => {
    onResize.mockClear();
    onResizeEnd.mockClear();
    onResizeStart.mockClear();
  });

  test('рендерится без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  test('рендерит окна', () => {
    const first = screen.getByLabelText('first');
    const second = screen.getByLabelText('second');
    const third = screen.getByLabelText('third');

    expect(first).toBeInTheDocument();
    expect(second).toBeInTheDocument();
    expect(third).toBeInTheDocument();
  });

  test('рендерит ресайзеры', () => {
    const resizers = findResizers();
    expect(resizers.length).toBe(2);
  });

  test('ресайзер становится активным по нажатию', () => {
    const [resizer] = findResizers();

    expect(isResizerActive(resizer)).toBe(false);

    startResize(resizer);

    expect(isResizerActive(resizer)).toBe(true);
  });

  test('ресайзер становится активным только по нажатию на левую кнопку мыши', () => {
    const resizers = findResizers();
    const [first] = resizers;

    expect(isResizerActive(first)).toBe(false);

    startResize(first, {
      button: 1,
    });

    expect(isResizerActive(first)).toBe(false);

    startResize(first, {
      button: 2,
    });

    expect(isResizerActive(first)).toBe(false);
  });

  test('ресайзер становится неактивным при отпускании кнопки мыши', () => {
    const [resizer] = findResizers();

    startResize(resizer);
    stopResize();
    expect(isResizerActive(resizer)).toBe(false);
  });

  test('ресайзер становится неактивным при отпускании кнопки мыши вне окна браузера', () => {
    const [resizer] = findResizers();

    startResize(resizer);

    moveResizer(0, 0, {
      buttons: 0,
    });

    expect(isResizerActive(resizer)).toBe(false);
  });

  test('ресайзер не активируется, если передан allowResize = false', () => {
    result.unmount();
    renderComponent({ allowResize: false });
    const [resizer] = findResizers();

    startResize(resizer);

    expect(isResizerActive(resizer)).toBe(false);
  });

  test('onResizeStart вызывается', () => {
    const [resizer] = findResizers();
    startResize(resizer);
    expect(onResizeStart).toBeCalledTimes(1);
  });

  test('onResize вызывается', () => {
    const [resizer] = findResizers();
    startResize(resizer);
    moveResizer(0, 0);
    expect(onResize).toBeCalledTimes(1);
  });

  test('onResizeEnd вызывается', () => {
    const [resizer] = findResizers();
    startResize(resizer);
    moveResizer(0, 0);
    stopResize();
    expect(onResizeEnd).toBeCalledTimes(1);

    startResize(resizer);
    moveResizer(0, 0, {
      buttons: 0,
    });

    expect(onResizeEnd).toBeCalledTimes(2);
  });
});
