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

const findContainer = (): HTMLElement => screen.getByTestId('container');

describe('CanvasView', () => {
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

    await waitFor(() => expect(scaleSizeInput).toHaveAttribute('value', `104`));
    expect(scaleSizeInput).toHaveAttribute('value', `104`);
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

    await waitFor(() => expect(scaleSizeInput).toHaveAttribute('value', `104`));
    expect(scaleSizeInput).toHaveAttribute('value', `104`);

    const container = findContainer();

    fireEvent.keyDown(container, {
      key: 'Control',
      code: 'ControlLeft',
    });

    fireEvent.keyUp(container, {
      key: '0',
      code: 'Digit0',
    });

    await waitFor(() => expect(scaleSizeInput).toHaveAttribute('value', `100`));

    expect(scaleSizeInput).toHaveAttribute('value', `100`);
  });
});
