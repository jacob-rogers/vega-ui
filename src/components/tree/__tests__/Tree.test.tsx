import React from 'react';
import { fireEvent, render, RenderResult, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Tree } from '../Tree';
import { BlueLineSvg, OrangeLineSvg, RedLineSvg, rootProps } from '../Tree.stories';
import { TreeItem, TreeProps } from '../types';

export const icons = {
  'blue-line': BlueLineSvg,
  'orange-line': OrangeLineSvg,
  'red-line': RedLineSvg,
};

function renderComponent(props: TreeProps): RenderResult {
  return render(<Tree {...props} />);
}

describe('Tree', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  const mockProjectId = 'mock project id';

  test('рендерится без ошибок', () => {
    renderComponent({ nodeList: rootProps, projectId: mockProjectId });
  });

  test('рендерится только с одним узлом', () => {
    renderComponent({
      nodeList: [{ name: 'Участок 1', id: '1', nodeList: [] }],
      projectId: mockProjectId,
    });

    const item = screen.getAllByRole('treeitem')[0];

    expect(item).toBeInTheDocument();
  });

  test('рендерится с пустым nodeList', () => {
    renderComponent({ nodeList: [], projectId: mockProjectId });

    const tree = screen.getByRole('tree');

    expect(tree).toBeInTheDocument();
  });

  test('рендерится с иконками', () => {
    const { container } = renderComponent({ icons, nodeList: rootProps, projectId: mockProjectId });

    const icon = container.querySelectorAll('.VegaTree__Icon')[0];

    expect(icon).toBeInTheDocument();
  });

  test('при клике выделяется', async () => {
    renderComponent({ nodeList: rootProps, projectId: mockProjectId });

    const item = screen.getAllByRole('treeitem')[1];

    userEvent.click(item);

    await waitFor(() => {
      expect(item).toHaveClass('VegaTree__NavigationItem_Selected');
    });
  });

  test('при клике на иконку стрелки список элементов открывается и закрывается', async () => {
    renderComponent({ nodeList: rootProps, projectId: mockProjectId });

    const item = screen.getAllByRole('menuitem')[0];

    userEvent.click(item);

    await waitFor(() => {
      expect(document.querySelector('[data-container-id~="1"]')).toHaveClass(
        'VegaTree__NodeList_expanded',
      );
    });

    userEvent.click(item);

    await waitFor(() => {
      expect(document.querySelector('[data-container-id~="1"]')).not.toHaveClass(
        'VegaTree__NodeList_expanded',
      );
    });
  });

  test('при клике на иконку, скрывающую элементы Дерева, элемент меняет стилизацию', async () => {
    renderComponent({ nodeList: rootProps, projectId: mockProjectId });

    const container = screen.getAllByRole('treeitem')[1];
    const item = screen.getAllByRole('switch')[0];

    userEvent.click(item);

    await waitFor(() => {
      expect(container).toHaveClass('VegaTree__NavigationItem_Hidden');
    });

    userEvent.click(item);

    await waitFor(() => {
      expect(container).not.toHaveClass('VegaTree__NavigationItem_Hidden');
    });
  });

  test('скрытые элементы Дерева, восстанавливаются после перезагрузки', async () => {
    const props: TreeProps = {
      nodeList: rootProps,
      projectId: mockProjectId,
    };

    const { rerender } = renderComponent(props);

    const container = screen.getAllByRole('treeitem')[1];
    const item = container.querySelector('[role="switch"]') as HTMLElement;

    userEvent.click(item);

    await waitFor(() => {
      expect(container).toHaveClass('VegaTree__NavigationItem_Hidden');
    });

    rerender(<Tree {...props} />);

    const containerAfterReload = screen.getAllByRole('treeitem')[1];

    await waitFor(() => {
      expect(containerAfterReload).toHaveClass('VegaTree__NavigationItem_Hidden');
    });
  });

  test('скрытые элементы Дерева, восстанавливаются после перезагрузки, без указания projectId', async () => {
    const props: TreeProps = {
      nodeList: rootProps,
    };

    const { rerender } = renderComponent(props);

    const container = screen.getAllByRole('treeitem')[1];
    const item = container.querySelector('[role="switch"]') as HTMLElement;

    userEvent.click(item);

    await waitFor(() => {
      expect(container).toHaveClass('VegaTree__NavigationItem_Hidden');
    });

    rerender(<Tree {...props} />);

    const containerAfterReload = screen.getAllByRole('treeitem')[1];

    await waitFor(() => {
      expect(containerAfterReload).toHaveClass('VegaTree__NavigationItem_Hidden');
    });
  });

  test('все элементы видимы после перезагрузки, если сохраненных скрытых элементов Дерева нет', async () => {
    const { baseElement } = renderComponent({
      nodeList: rootProps,
      projectId: mockProjectId,
    });

    const hiddenItems = baseElement.querySelector('.VegaTree__NavigationItem_Hidden');

    await waitFor(() => {
      expect(hiddenItems).toBeNull();
    });
  });

  test('Вызывается onHideItem при переключении видимости элемента', async () => {
    const onHideItemMock = jest.fn();

    const props: TreeProps = {
      nodeList: rootProps,
      projectId: mockProjectId,
      onHideItem: onHideItemMock,
    };

    renderComponent(props);

    const container = screen.getAllByRole('treeitem')[1];
    const item = container.querySelector('[role="switch"]') as HTMLElement;

    userEvent.click(item);

    await waitFor(() => {
      expect(container).toHaveClass('VegaTree__NavigationItem_Hidden');
    });

    userEvent.click(item);

    await waitFor(() => {
      expect(container).not.toHaveClass('VegaTree__NavigationItem_Hidden');
    });

    await waitFor(() => {
      expect(onHideItemMock).toHaveBeenCalledTimes(2);
    });
  });

  test('скрытые элементы Дерева, сохраняются с корректным projectId', async () => {
    const props: TreeProps = {
      nodeList: rootProps,
      projectId: 'a3333333-b111-c111-d111-e00000000011',
    };

    renderComponent(props);

    const container = screen.getByText(rootProps[0].name).parentElement;
    const item = container?.querySelector('[role="switch"]') as HTMLElement;

    userEvent.click(item);

    await waitFor(() => {
      expect(container).toHaveClass('VegaTree__NavigationItem_Hidden');
    });

    const savedHiddenElements = sessionStorage.getItem(`hiddenElements-${props.projectId}`);
    expect(savedHiddenElements).toBe(JSON.stringify([rootProps[0].id]));
  });

  test('скрытые элементы Дерева, сохраняются под стандартным именем, если нет projectId', async () => {
    const props: TreeProps = {
      nodeList: rootProps,
    };

    renderComponent(props);

    const container = screen.getByText(rootProps[0].name).parentElement;
    const item = container?.querySelector('[role="switch"]') as HTMLElement;

    userEvent.click(item);

    await waitFor(() => {
      expect(container).toHaveClass('VegaTree__NavigationItem_Hidden');
    });

    const savedHiddenElements = sessionStorage.getItem('hiddenElements');
    expect(savedHiddenElements).toBe(JSON.stringify([rootProps[0].id]));
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
      projectId: mockProjectId,
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
  test('отображаются чекбоксы', () => {
    const nodes: TreeItem[] = [
      {
        name: '1',
        id: '1',
        isDraggable: false,
        nodeList: [
          {
            name: '2',
            id: '2',
            nodeList: [],
          },
        ],
      },
    ];
    const { container } = renderComponent({
      nodeList: nodes,
    });
    const checkBoxes = container.querySelectorAll('.Checkbox-Input');
    expect(checkBoxes.length).toBe(2);
  });

  test('убирается чекбоксы через withCheckElementSwitcher', () => {
    const nodes: TreeItem[] = [
      {
        name: '1',
        id: '1',
        isDraggable: false,
        nodeList: [
          {
            name: '2',
            id: '2',
            nodeList: [],
          },
        ],
      },
    ];
    const { container } = renderComponent({
      nodeList: nodes,
      withCheckElementSwitcher: false,
    });
    const checkbox = container.querySelector('.Checkbox-Input');
    expect(checkbox).not.toBeInTheDocument();
  });

  test('проверяем отображение заранее выбранных чекбоксов', () => {
    const nodes: TreeItem[] = [
      {
        name: '1',
        id: '1',
        isDraggable: false,
        nodeList: [
          {
            name: '2',
            id: '2',
            nodeList: [],
          },
        ],
      },
    ];
    renderComponent({
      nodeList: nodes,
      checkedElements: ['2'],
    });
    const treeLeaf = document.getElementById('2');
    expect(treeLeaf).toBeVisible();
    const checkBox = treeLeaf?.querySelector('.VegaTree__NavigationItem');
    expect(checkBox).toBeVisible();
    expect(checkBox).toHaveClass('VegaTree__NavigationItem_Checked');
  });
});
