import React from 'react';
import { fireEvent, render, RenderResult, screen, waitFor } from '@testing-library/react';

import { Tree } from './Tree';
import { BlueLineSvg, OrangeLineSvg, RedLineSvg } from './Tree.stories';
import { NodeItem, RootProps } from './types';

export const icons = {
  'blue-line': BlueLineSvg,
  'orange-line': OrangeLineSvg,
  'red-line': RedLineSvg,
};

const items: RootProps = [
  {
    name: 'Усть-Енисей',
    isDraggable: false,
    iconId: 'blue-line',
    id: 1,
    nodeList: [
      {
        name: 'Поднятие 44-23',
        iconId: 'orange-line',
        id: 2,
        isDraggable: false,
        nodeList: [
          {
            name: 'Залежь - 78',
            iconId: 'blue-line',
            id: 10,
            nodeList: [
              {
                name: 'Ловушка 100',
                iconId: 'red-line',
                id: 21,
                nodeList: [
                  {
                    name: 'Еще что нибудь',
                    id: 12,
                  },
                ],
              },
            ],
          },
          {
            name: 'Залежь - 79',
            iconId: 'blue-line',
            id: 30,
            nodeList: [
              {
                name: 'Ловушка 101',
                iconId: 'red-line',
                id: 17,
              },
            ],
          },
          {
            name: 'Залежь - 56',
            iconId: 'blue-line',
            id: 11,
          },
          {
            name: 'Залежь - 11',
            iconId: 'blue-line',
            id: 20,
          },
          {
            name: 'Залежь - 1',
            iconId: 'blue-line',
            id: 9,
          },
        ],
      },
    ],
  },
];

function renderComponent(props: NodeItem): RenderResult {
  return render(<Tree {...props} />);
}

describe('Tree', () => {
  test('рендерится без ошибок', () => {
    renderComponent({ nodeList: items });
  });

  test('рендерится только с одним узлом', async () => {
    renderComponent({ nodeList: [{ name: 'Усть-Енисей' }] });

    const item = screen.getAllByRole('treeitem')[0];

    expect(item).toBeInTheDocument();
  });

  test('рендерится с пустым nodeList', async () => {
    renderComponent({ nodeList: [] });

    const tree = screen.getByRole('tree');

    expect(tree).toBeInTheDocument();
  });

  test('рендерится с иконками', async () => {
    renderComponent({ icons, nodeList: items });

    const icon = document.querySelectorAll('.VegaTree__Icon')[0];

    expect(icon).toBeInTheDocument();
  });

  test('при клике выделяется', async () => {
    renderComponent({ nodeList: items });

    const item = screen.getAllByRole('treeitem')[1];

    fireEvent.click(item);

    await waitFor(() => {
      expect(item.className.includes('VegaTree__NavigationItem_Selected')).toBe(true);
    });
  });

  test('при двойном клике открывается список элементов дерева', async () => {
    renderComponent({ nodeList: items });

    const item = screen.getAllByRole('treeitem')[1];

    fireEvent.doubleClick(item);

    await waitFor(() => {
      expect(
        document
          .querySelector('[data-container-id~="1"]')
          ?.className.includes('VegaTree__NodeList_expanded'),
      ).toBe(true);
    });
  });

  test('при клике на иконку стрелки список элементов открывается и закрывается', async () => {
    renderComponent({ nodeList: items });

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

  test('при клике на иконку глаза элемент меняет стилизацию', async () => {
    renderComponent({ nodeList: items });

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

  test('функционал drag and drop работает', async () => {
    const nodes = [
      {
        name: 'From',
        id: 'from',
        isDraggable: false,
        nodeList: [
          {
            name: 'Drag Item',
            id: 'drag-item',
          },
        ],
      },
      {
        name: 'To',
        isDraggable: false,
        id: 'to',
        nodeList: [],
      },
    ];

    renderComponent({ nodeList: nodes });

    const dragItem = document.getElementById('drag-item');
    const dragContainer = document.querySelector('[data-container-id~="from"]');
    const dropContainer = document.querySelector('[data-container-id~="to"]');

    if (dragItem && dropContainer) {
      fireEvent.dragStart(dragItem);

      fireEvent.dragEnter(dropContainer);

      fireEvent.drop(dropContainer);
    }

    expect(dropContainer?.contains(dragItem)).toBe(true);
    expect(dragContainer?.contains(dragItem)).toBe(false);
  });
});
