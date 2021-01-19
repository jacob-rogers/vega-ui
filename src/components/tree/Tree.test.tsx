import React from 'react';
import { fireEvent, render, RenderResult, screen, waitFor } from '@testing-library/react';

import { Tree } from './Tree';
import { BlueLineSvg, OrangeLineSvg, RedLineSvg, rootProps } from './Tree.stories';
import { TreeItem, TreeProps } from './types';

export const icons = {
  'blue-line': BlueLineSvg,
  'orange-line': OrangeLineSvg,
  'red-line': RedLineSvg,
};

function renderComponent(props: TreeProps): RenderResult {
  return render(<Tree {...props} />);
}

describe('Tree', () => {
  test('рендерится без ошибок', () => {
    renderComponent({ nodeList: rootProps });
  });

  test('рендерится только с одним узлом', () => {
    renderComponent({ nodeList: [{ name: 'Участок 1', id: '1', nodeList: [] }] });

    const item = screen.getAllByRole('treeitem')[0];

    expect(item).toBeInTheDocument();
  });

  test('рендерится с пустым nodeList', () => {
    renderComponent({ nodeList: [] });

    const tree = screen.getByRole('tree');

    expect(tree).toBeInTheDocument();
  });

  test('рендерится с иконками', () => {
    const { container } = renderComponent({ icons, nodeList: rootProps });

    const icon = container.querySelectorAll('.VegaTree__Icon')[0];

    expect(icon).toBeInTheDocument();
  });

  test('при клике выделяется', async () => {
    renderComponent({ nodeList: rootProps });

    const item = screen.getAllByRole('treeitem')[1];

    fireEvent.click(item);

    await waitFor(() => {
      expect(item.className.includes('VegaTree__NavigationItem_Selected')).toBe(true);
    });
  });

  test('при клике на иконку стрелки список элементов открывается и закрывается', async () => {
    renderComponent({ nodeList: rootProps });

    const item = screen.getAllByRole('menuitem')[0];

    fireEvent.click(item);

    await waitFor(() => {
      expect(
        document
          .querySelector('[data-container-id~="1"]')
          ?.className.includes('VegaTree__NodeList_expanded'),
      ).toBe(true);
    });

    fireEvent.click(item);

    await waitFor(() => {
      expect(
        document
          .querySelector('[data-container-id~="1"]')
          ?.className.includes('VegaTree__NodeList_expanded'),
      ).toBe(false);
    });
  });

  test('при клике на иконку, скрывающую элементы Дерева, элемент меняет стилизацию', async () => {
    renderComponent({ nodeList: rootProps });

    const container = screen.getAllByRole('treeitem')[1];
    const item = screen.getAllByRole('switch')[0];

    fireEvent.click(item);

    await waitFor(() => {
      expect(container.className.includes('VegaTree__NavigationItem_Hidden')).toBe(true);
    });

    fireEvent.click(item);

    await waitFor(() => {
      expect(container.className.includes('VegaTree__NavigationItem_Hidden')).toBe(false);
    });
  });

  test('drag and drop работает, при событии drop обработчик onPaste срабатывает и передает нужные параметры', () => {
    const nodes: TreeItem[] = [
      {
        name: 'From',
        id: 'from',
        isDraggable: false,
        nodeList: [
          {
            name: 'Drag Item',
            id: 'drag-item',
            nodeList: [],
          },
        ],
      },
      {
        name: 'To',
        isDraggable: false,
        id: 'to',
        nodeList: [
          {
            name: 'Drag Item',
            id: 'element',
            nodeList: [],
          },
        ],
      },
    ];

    const onPasteClick = jest.fn();

    const { container } = renderComponent({
      nodeList: nodes,
      onPasteItem: onPasteClick,
    });

    const dragItem = container.querySelector('#drag-item');
    const dropContainer = container.querySelector('[data-container-id~="to"]');

    if (dragItem && dropContainer) {
      fireEvent.dragStart(dragItem);

      fireEvent.dragEnter(dropContainer);

      fireEvent.drop(dropContainer);
    }

    expect(onPasteClick).toBeCalledWith(['drag-item'], 'to');
  });
});
