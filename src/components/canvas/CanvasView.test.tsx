import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { ZoomProps } from './entities/ZoomService';
import { CanvasView } from './CanvasView';
import { cnCanvas } from './cn-canvas';
import { Canvas as CanvasEntity, Tree } from './entities';
import { CanvasData } from './types';

const data: CanvasData = { title: 'Шаг 1', position: { x: 0, y: 0 }, type: 'root' };

const createCanvas = (): CanvasEntity => {
  const tree = Tree.of<CanvasData>({ data });
  const secondTree = Tree.of<CanvasData>({ data: { ...data, type: 'step' } });
  const thirdTree = Tree.of<CanvasData>({ data });

  return CanvasEntity.of([tree, secondTree, thirdTree]);
};

const canvas: CanvasEntity = createCanvas();

function renderComponent() {
  return render(<CanvasView canvas={canvas} />);
}

jest.mock('./entities/ZoomService', () => {
  return {
    ZoomService: jest.fn().mockImplementation(() => {
      return {
        zoom: (props: ZoomProps): number => {
          const { source, scale, delta } = props;
          let newScale;
          if (source === 'event' && delta) {
            newScale = delta < 0 ? 1 * 1.04 : 1 / 1.04;
            newScale = Math.min(1.5, Math.max(0.1, newScale));
          } else {
            newScale = Number(scale);
          }
          return newScale;
        },
      };
    }),
  };
});

const mockScroll = jest.fn();

jest.mock('./entities/ScrollService', () => {
  return {
    ScrollService: jest.fn().mockImplementation(() => ({ scroll: mockScroll })),
  };
});

const findContainer = (): HTMLElement => screen.getByTestId('container');

describe('CanvasView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('рендерится без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  test('изменяет значение масштаба по Ctrl + Wheel', async () => {
    const component = renderComponent();

    const stageСanvas = component.container.querySelector(
      `.${cnCanvas('Stage')} > div`,
    ) as HTMLElement;

    const deltaY = -125;

    fireEvent.wheel(stageСanvas, {
      bubbles: true,
      cancelable: false,
      deltaY,
      ctrlKey: true,
    });

    const scaleSizeInput: HTMLElement | null = component
      .getByTitle('Масштаб')
      .querySelector('input');

    await waitFor(() => expect(scaleSizeInput).toHaveValue(`104`));
    expect(scaleSizeInput).toHaveValue(`104`);
  });

  test('возвращает масштаб в исходное значение по Ctrl + 0', async () => {
    const component = renderComponent();

    const stageСanvas = component.container.querySelector(
      `.${cnCanvas('Stage')} > div`,
    ) as HTMLElement;

    const deltaY = -125;

    fireEvent.wheel(stageСanvas, {
      bubbles: true,
      cancelable: false,
      deltaY,
      ctrlKey: true,
    });

    const scaleSizeInput: HTMLElement | null = component
      .getByTitle('Масштаб')
      .querySelector('input');

    await waitFor(() => expect(scaleSizeInput).toHaveValue(`104`));
    expect(scaleSizeInput).toHaveValue(`104`);

    const container = findContainer();

    fireEvent.keyUp(container, {
      key: '0',
      code: 'Digit0',
      ctrlKey: true,
      bubbles: true,
      cancelable: false,
    });

    await waitFor(() => expect(scaleSizeInput).toHaveValue(`100`));

    expect(scaleSizeInput).toHaveValue(`100`);
  });

  test('переключает режимы по нажатию на клавишу H', async () => {
    const component = renderComponent();

    const selectingItems = await component.findByLabelText('Выбор элементов');
    const movingOnCanvas = await component.findByLabelText('Перемещение по полотну');

    expect(selectingItems).toHaveClass('VegaCanvas__Option_active');
    expect(movingOnCanvas).not.toHaveClass('VegaCanvas__Option_active');

    const container = findContainer();

    fireEvent.keyPress(container, {
      key: 'h',
      code: 'KeyH',
      bubbles: true,
      cancelable: false,
    });

    await waitFor(() => expect(selectingItems).not.toHaveClass('VegaCanvas__Option_active'));
    await waitFor(() => expect(movingOnCanvas).toHaveClass('VegaCanvas__Option_active'));
  });

  test('вызывает функцию перемещения по canvas по нажатию mouse wheel', async () => {
    const component = renderComponent();

    const stageСanvas = component.container.querySelector(
      `.${cnCanvas('Stage')} canvas`,
    ) as HTMLElement;

    const dx = 125;
    const dy = 125;

    fireEvent.mouseMove(stageСanvas, {
      button: 1,
      buttons: 4,
      movementX: dx,
      movementY: dy,
      bubbles: true,
      cancelable: false,
    });

    await waitFor(() => expect(mockScroll).toHaveBeenCalledTimes(1));
  });

  test('вызывает функцию перемещения по нажатию стрелок', async () => {
    const component = renderComponent();

    const stageСanvas = component.container.querySelector(
      `.${cnCanvas('Stage')} canvas`,
    ) as HTMLElement;

    ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].forEach((value) => {
      fireEvent.keyDown(stageСanvas, {
        code: value,
        bubbles: true,
        cancelable: false,
      });
    });

    await waitFor(() => expect(mockScroll).toHaveBeenCalledTimes(4));
  });

  test('срабатывает горизонтальный скролл по canvas по Alt + mouse wheel', async () => {
    const component = renderComponent();

    const stageСanvas = component.container.querySelector(
      `.${cnCanvas('Stage')} canvas`,
    ) as HTMLElement;

    const deltaY = 125;

    fireEvent.wheel(stageСanvas, {
      bubbles: true,
      cancelable: false,
      deltaY,
      altKey: true,
    });

    await waitFor(() => expect(mockScroll).toHaveBeenCalledTimes(1));
  });
});
