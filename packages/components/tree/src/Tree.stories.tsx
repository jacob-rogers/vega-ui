import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Tree } from './Tree';
import { TreeItem } from './types';
import { useTreeApi } from './use-tree-api';

export const OrangeLineSvg = (
  <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 3.5C0 3.5 3.5 0.5 7.5 0.5C11.5 0.5 12 3.5 12 3.5" stroke="#F38B00" />
    <path
      d="M4.5 3.5C0.5 3.5 0 6.5 0 6.5V8.5C1.5 7.66667 3.5 6 7 6C9.5 6 11.1667 7.66667 12 8.5V6.5C12 6.5 8.5 3.5 4.5 3.5Z"
      fill="white"
      fillOpacity="0.2"
    />
    <path d="M0 10.5C0 10.5 1.5 9.5 5.5 9.5C9.5 9.5 12 10.5 12 10.5" stroke="#F38B00" />
  </svg>
);

export const BlueLineSvg = (
  <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 3.5C0 3.5 3.5 0.5 7.5 0.5C11.5 0.5 12 3.5 12 3.5"
      stroke="white"
      strokeOpacity="0.2"
    />
    <path
      d="M4.5 3.5C0.5 3.5 0 6.5 0 6.5V8.5C1.5 7.66667 3.5 6 7 6C9.5 6 11.1667 7.66667 12 8.5V6.5C12 6.5 8.5 3.5 4.5 3.5Z"
      fill="#0AA5FF"
    />
    <path
      d="M0 10.5C0 10.5 1.5 9.5 5.5 9.5C9.5 9.5 12 10.5 12 10.5"
      stroke="white"
      strokeOpacity="0.2"
    />
  </svg>
);

export const RedLineSvg = (
  <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4.5 3.50012C0.5 3.50012 0 6.50012 0 6.50012V3.50012C2 2.33346 5.29928 -0.140019 8.5 0.500124C10.5 0.900124 11.6667 2.33346 12 3.00012V6.50012C12 6.50012 8.5 3.50012 4.5 3.50012Z"
      fill="#FE4343"
    />
    <path
      d="M0 3.5C0 3.5 3.5 0.5 7.5 0.5C11.5 0.5 12 3.5 12 3.5"
      stroke="white"
      strokeOpacity="0.2"
    />
    <path
      d="M4.5 3.5C0.5 3.5 0 6.5 0 6.5V8.5C1.5 7.66667 3.5 6 7 6C9.5 6 11.1667 7.66667 12 8.5V6.5C12 6.5 8.5 3.5 4.5 3.5Z"
      fill="white"
      fillOpacity="0.2"
    />
    <path
      d="M0 10.5C0 10.5 1.5 9.5 5.5 9.5C9.5 9.5 12 10.5 12 10.5"
      stroke="white"
      strokeOpacity="0.2"
    />
  </svg>
);

export const rootProps: TreeItem[] = [
  {
    name: 'Усть-Енисей',
    isDraggable: false,
    isDropZone: false,
    iconId: 'blue-line',
    id: '1',
    nodeList: [
      {
        name: 'Поднятие 44-23',
        iconId: 'orange-line',
        id: '2',
        parentId: '1',
        isDraggable: false,
        nodeList: [
          {
            name: 'Залежь - 78',
            iconId: 'blue-line',
            id: '10',
            parentId: '2',
            nodeList: [
              {
                name: 'Ловушка 100',
                iconId: 'red-line',
                isDropZone: false,
                id: '21',
                nodeList: [
                  {
                    name: 'Еще что-нибудь',
                    id: '12',
                    isDropZone: false,
                    isDraggable: false,
                    parentId: '21',
                    nodeList: [],
                  },
                ],
              },
            ],
          },
          {
            name: 'Залежь - 79',
            iconId: 'blue-line',
            id: '30',
            parentId: '2',
            nodeList: [
              {
                name: 'Ловушка 101',
                iconId: 'red-line',
                id: '17',
                isDropZone: false,
                parentId: '30',
                nodeList: [],
              },
            ],
          },
          {
            name: 'Залежь - 56',
            iconId: 'blue-line',
            id: '11',
            parentId: '2',
            nodeList: [],
          },
          {
            name: 'Залежь - 11',
            iconId: 'blue-line',
            id: '20',
            parentId: '2',
            nodeList: [],
          },
          {
            name: 'Залежь - 1',
            iconId: 'blue-line',
            id: '9',
            parentId: '2',
            nodeList: [],
          },
        ],
      },
      {
        name: 'Поднятие 55-100',
        iconId: 'orange-line',
        id: '3',
        parentId: '1',
        isDraggable: false,
        nodeList: [
          {
            name: 'Залежь - 78',
            iconId: 'blue-line',
            id: '7',
            parentId: '3',
            nodeList: [],
          },
          {
            name: 'Залежь - 79',
            iconId: 'blue-line',
            id: '77',
            parentId: '3',
            nodeList: [],
          },
          {
            name: 'Залежь - 56',
            iconId: 'blue-line',
            id: '24',
            parentId: '3',
            nodeList: [],
          },
          {
            name: 'Залежь - 11',
            iconId: 'blue-line',
            id: '25',
            parentId: '3',
            nodeList: [],
          },
          {
            name: 'Залежь - 1',
            iconId: 'blue-line',
            id: '26',
            parentId: '3',
            nodeList: [],
          },
        ],
      },
      {
        name: 'Поднятие 23-32',
        iconId: 'orange-line',
        isDraggable: false,
        id: '4',
        parentId: '1',
        nodeList: [
          {
            name: 'Залежь - 44',
            iconId: 'blue-line',
            id: '27',
            parentId: '4',
            nodeList: [],
          },
          {
            name: 'Залежь - 79',
            iconId: 'blue-line',
            id: '31',
            parentId: '4',
            nodeList: [],
          },
          {
            name: 'Залежь - 45',
            iconId: 'blue-line',
            id: '32',
            parentId: '4',
            nodeList: [],
          },
          {
            name: 'Залежь - 46',
            iconId: 'blue-line',
            id: '33',
            parentId: '4',
            nodeList: [
              {
                name: 'Ловушка - 1',
                isDropZone: false,
                iconId: 'red-line',
                id: '41',
                parentId: '33',
                nodeList: [
                  {
                    name: 'Данные по Ловушка - 1',
                    isDropZone: false,
                    id: '34',
                    parentId: '41',
                    nodeList: [],
                  },
                ],
              },
              {
                name: 'Ловушка - 2',
                isDropZone: false,
                iconId: 'red-line',
                id: '43',
                parentId: '33',
                nodeList: [],
              },
              {
                name: 'Ловушка - 3',
                isDropZone: false,
                iconId: 'red-line',
                id: '44',
                parentId: '33',
                nodeList: [],
              },
              {
                name: 'Ловушка - 4',
                isDropZone: false,
                iconId: 'red-line',
                id: '45',
                parentId: '33',
                nodeList: [],
              },
              {
                name: 'Ловушка - 5',
                isDropZone: false,
                iconId: 'red-line',
                id: '46',
                parentId: '33',
                nodeList: [],
              },
            ],
          },
          {
            name: 'Залежь - 1',
            iconId: 'blue-line',
            id: '47',
            parentId: '4',
            nodeList: [],
          },
        ],
      },
    ],
  },
];

const icons = {
  'blue-line': BlueLineSvg,
  'orange-line': OrangeLineSvg,
  'red-line': RedLineSvg,
};

const ActionItemComponent = (): React.ReactElement => {
  return (
    <div
      onKeyPress={(): void => {}}
      role="button"
      tabIndex={0}
      onClick={(e): void => {
        e.stopPropagation();
        action('action item handler')('Item');
      }}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 2C2 1.5 2.5 1 3 1H6.13758C6.38606 1 6.51106 1 6.61794 1.044C6.72612 1.08854 6.81575 1.17817 6.99609 1.35851L9.66482 4.0966C9.85962 4.2914 9.95414 4.38592 10 4.5C10.0432 4.60752 10.0432 4.73241 10.0432 4.975L10 10C10 10.5 9.5 11 9 11H3C2.5 11 2 10.5 2 10V2ZM9 4.5L6.5 2V4C6.5 4.27614 6.72386 4.5 7 4.5H8.25H9ZM3.5 6H8V7H3.5V6ZM3.5 9V8H7V9H3.5Z"
          fill="white"
          fillOpacity="0.3"
        />
      </svg>
    </div>
  );
};

storiesOf('ui/Tree', module)
  .addDecorator(withKnobs)
  .addParameters({
    metadata: {
      author: 'Ланит',
      status: 'Draft',
      link: {
        href: 'https://github.com/gpn-prototypes/vega-ui/tree/master/packages/components/tree',
        text: 'Документация',
      },
    },
  })
  .add('по умолчанию', () => {
    const { sourceTree, handlers } = useTreeApi(rootProps);

    return (
      <Tree
        icons={icons}
        actionItemComponents={[<ActionItemComponent />]}
        isContextMenuEnable
        nodeList={sourceTree}
        onRenameItem={(): void => action('Renamed')('Item')}
        onDuplicateItem={(): void => action('Copied')('Item')}
        onDeleteItem={(): void => action('Deleted')('Item')}
        onPasteItem={handlers.handlePaste}
      />
    );
  });
