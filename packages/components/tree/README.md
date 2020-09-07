# @gpn-prototypes/vega-tree

Компонент "Дерево"

### Установка

    yarn add @gpn-prototypes/vega-tree

### Примеры использования

#### C иконками, контекстным меню и пробросом обработчиков вызова функций контекстного меню, с Drag and Drop функционалом

<img src="docs/pic-1.png" height="270">

```jsx  
import { Tree } from '@gpn-prototypes/vega-tree';

const icons = {
  'blue-line': BlueLineSvg,
  'orange-line': OrangeLineSvg,
  'red-line': RedLineSvg,
};

const nodeList = [
  {
    name: 'Усть-Енисей',
    isDraggable: false,
    iconId: 'blue-line',
    nodeList: [
      {
        name: 'Поднятие 44-23',
        iconId: 'orange-line',
        isDraggable: false,
        nodeList: [
          {
            name: 'Залежь - 78',
            iconId: 'blue-line',
            nodeList: [
              {
                name: 'Ловушка 100',
                iconId: 'red-line',
                nodeList: [
                  {
                    name: 'Еще что нибудь',
                  },
                ],
              },
            ],
          },
          {
            name: 'Залежь - 79',
            iconId: 'blue-line',
            nodeList: [
              {
                name: 'Ловушка 101',
                iconId: 'red-line',
              },
            ],
          },
          {
            name: 'Залежь - 56',
            iconId: 'blue-line',
          },
          {
            name: 'Залежь - 11',
            iconId: 'blue-line',
          },
          {
            name: 'Залежь - 1',
            iconId: 'blue-line',
          },
        ],
      },
    ],
  },
];

export const MyComponent = () => {
  return <Tree
            icons={icons}
            nodeList={nodeList}
            isContextMenuEnable
            onRenameItem={(id) => console.log(`Запрос к базе на переименование элемента с id ${id}`)}
            onCopyItem={(id) => console.log(`Запрос к базе на копирование элемента с id ${id}`)}
            onDeleteItem={(id) => console.log(`Запрос к базе на удаление элемента с id ${id}`)}
            onPasteItem={(id) => console.log(`Запрос к базе на перемещение элемента с id ${id}`)}
         />;
};
```


#### Без иконок и без функционала Drag and Drop

<img src="docs/pic-2.png" height="105">

```jsx  
import { Tree } from '@gpn-prototypes/vega-tree';

const nodeList = [
  {
    name: 'Усть-Енисей',
    isDraggable: false,
    nodeList: [
      {
        name: 'Поднятие 44-23',
        isDraggable: false,
        nodeList: [
          {
            name: 'Залежь - 78',
            nodeList: [
              {
                name: 'Ловушка 100',
                nodeList: [
                  {
                    name: 'Еще что нибудь',
                  },
                ],
              },
            ],
          },
          {
            name: 'Залежь - 79',
            nodeList: [
              {
                name: 'Ловушка 101',
              },
            ],
          },
          {
            name: 'Залежь - 56',
          },
          {
            name: 'Залежь - 11',
          },
          {
            name: 'Залежь - 1',
          },
        ],
      },
    ],
  },
];

export const MyComponent = () => {
  return <Tree
            nodeList={nodeList}
            isDndEnable={false} // Отключит Drag and Drop для всего дерева (по умолчанию TRUE)
         />;
};
```

### API

```ts
type NodeItem = {
    name: string,
    nodeList?: NodeItem[],
    id?: string | number
    iconId?: string | number; // ID иконки, которая мэтчится с названием из коллекции ICONS
    isDraggable?: boolean; // Возможность ограничить функциональность DragAndDrop для некоторых элементов
}

type TreeProps = {
    nodeList: NodeItem[]; // Массив объектов. Объекты могут быть двух типов:
        // - TreeLeaf (состоит из одного обязательного поля - name)
        // - TreeNode (должен включать name и nodeList)
    icons?: {
      [iconId: string]: React.ReactElement;
    }; // Коллекция иконок
    functionIcons?: React.ReactElement[] // Возможно рендерить кастомные функциональные иконки (пример: иконка Глаз, позволяющая скрывать элемент Дерева)
    isShownLeftLines?: boolean; // Отвечает за показ линий слева от узлов дерева. По умолчанию TRUE.
    withVisibilitySwitcher?: boolean; // Позволяет отключить иконку Глаза (при нажатии меняет стилизацию своего родителя). По умолчанию TRUE.
    isContextMenuEnable?: boolean; // Возможность добавить контекстное меню. По умолчанию выключено.
    isDndEnable?: boolean; // Возможность выключить функциональность DragAndDrop (по умолчанию включено)
    onRenameItem?: (id) => void; // Вызовет функцию, передав туда ID, при запросе переименовать узел дерева
    onCopyItem?: (id) => void; // Аналогично для копирования
    onDeleteItem?: (id) => void; // Аналогично для удаления
    onPasteItem?: (transferringId, receivingId) => void; // Сработает при вставке и перенесении через DND узла в другой узел. Прокинет id переносимого элемента и принимающего.
};
```
