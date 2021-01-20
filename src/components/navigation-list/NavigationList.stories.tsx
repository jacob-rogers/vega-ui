import React, { useState } from 'react';
import { css } from '@emotion/core';
import { boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { IconCheck } from '../icons';

import { NavigationList, NavigationListProps } from './NavigationList';

const cssWrapper = css`
  width: 302px;
`;

const cssWithIcon = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const cssIcon = css`
  margin-left: auto;
`;

const KNOB_GROUPS = {
  list: 'NavigationList',
};

const knobs = (): NavigationListProps => ({
  ordered: boolean('ordered', false, KNOB_GROUPS.list),
});

storiesOf('ui/NavigationList', module)
  .addParameters({
    metadata: {
      author: 'CSSSR',
      status: 'Approved',
      link: {
        href:
          'https://github.com/gpn-prototypes/vega-ui/blob/master/src/components/navigation-list/README.md',
        text: 'Документация',
      },
    },
  })
  .add('без иконки и разделителя', () => {
    const [activeItem, setActiveItem] = useState('1');

    const items = [
      { value: '1', title: 'Описание проекта' },
      { value: '2', title: 'Участники' },
      { value: '3', title: 'Связанные документы и файлы' },
    ];

    return (
      <div css={cssWrapper}>
        <NavigationList {...knobs()}>
          {items.map(({ value, title }) => (
            <NavigationList.Item key={value} active={value === activeItem}>
              {(props): React.ReactNode => (
                <a
                  href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  onClick={(e: React.SyntheticEvent): void => {
                    e.preventDefault();
                    setActiveItem(value);
                  }}
                  {...props}
                >
                  {title}
                </a>
              )}
            </NavigationList.Item>
          ))}
        </NavigationList>
      </div>
    );
  })
  .add('с иконкой', () => {
    const [activeItem, setActiveItem] = useState('1');

    const items = [
      { value: '1', title: 'Описание проекта' },
      {
        value: '2',
        title: 'Участники',
        cssItem: cssWithIcon,
        icon: <IconCheck size="s" view="success" css={cssIcon} />,
      },
      { value: '3', title: 'Связанные документы и файлы' },
    ];

    return (
      <div css={cssWrapper}>
        <NavigationList {...knobs()}>
          {items.map(({ value, title, cssItem, icon }) => (
            <NavigationList.Item key={value} active={value === activeItem}>
              {(props): React.ReactNode => (
                <button
                  type="button"
                  css={cssItem}
                  onClick={(): void => setActiveItem(value)}
                  {...props}
                >
                  {title}
                  {icon}
                </button>
              )}
            </NavigationList.Item>
          ))}
        </NavigationList>
      </div>
    );
  })
  .add('с разделителем внутри списка', () => {
    const [activeItem, setActiveItem] = useState('1');

    const items1 = [
      { value: '1', title: 'Описание проекта' },
      { value: '2', title: 'Участники' },
      { value: '3', title: 'Связанные документы и файлы' },
    ];

    const items2 = [
      { value: '4', title: 'Похожие проекты' },
      { value: '5', title: 'Описание' },
    ];

    return (
      <div css={cssWrapper}>
        <NavigationList {...knobs()}>
          {items1.map(({ value, title }) => (
            <NavigationList.Item key={value} active={value === activeItem}>
              {(props): React.ReactNode => (
                <button type="button" onClick={(): void => setActiveItem(value)} {...props}>
                  {title}
                </button>
              )}
            </NavigationList.Item>
          ))}
          <NavigationList.Delimiter />
          {items2.map(({ value, title }) => (
            <NavigationList.Item key={value} active={value === activeItem}>
              {(props): React.ReactNode => (
                <button type="button" onClick={(): void => setActiveItem(value)} {...props}>
                  {title}
                </button>
              )}
            </NavigationList.Item>
          ))}
        </NavigationList>
      </div>
    );
  })
  .add('C разделителем между списками', () => {
    const [activeItem, setActiveItem] = useState('1');

    const items1 = [
      { value: '1', title: 'Описание проекта' },
      { value: '2', title: 'Участники' },
      { value: '3', title: 'Связанные документы и файлы' },
    ];

    const items2 = [
      { value: '4', title: 'Похожие проекты' },
      { value: '5', title: 'Описание' },
    ];

    return (
      <div css={cssWrapper}>
        <NavigationList {...knobs()}>
          {items1.map(({ value, title }) => (
            <NavigationList.Item key={value} active={value === activeItem}>
              {(props): React.ReactNode => (
                <button type="button" onClick={(): void => setActiveItem(value)} {...props}>
                  {title}
                </button>
              )}
            </NavigationList.Item>
          ))}
        </NavigationList>
        <NavigationList.Delimiter />
        <NavigationList {...knobs()}>
          {items2.map(({ value, title }) => (
            <NavigationList.Item key={value} active={value === activeItem}>
              {(props): React.ReactNode => (
                <button type="button" onClick={(): void => setActiveItem(value)} {...props}>
                  {title}
                </button>
              )}
            </NavigationList.Item>
          ))}
        </NavigationList>
      </div>
    );
  });
