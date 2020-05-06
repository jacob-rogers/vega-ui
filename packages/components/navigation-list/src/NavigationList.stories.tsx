import React from 'react';
import { cn } from '@gpn-design/uikit/__internal__/src/utils/bem';
import { boolean, number, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { IconCheck } from '@vega-ui/icons';

import {
  NavigationList,
  NavigationListDelimiter,
  NavigationListDelimiterProps,
  NavigationListItem,
  NavigationListProps,
} from './NavigationList';

import './NavigationListStories.css';

const cnStories = cn('NavigationListStories');

const knobs = (): NavigationListProps & NavigationListDelimiterProps => ({
  ordered: boolean('ordered', false),
  start: number('start', 0),
  resetCounter: boolean('resetCounter', false),
});

storiesOf('ui/NavigationList', module)
  .addDecorator(withKnobs)
  .add('Обычный', () => (
    <div className={cnStories('wrapper')}>
      <NavigationList {...knobs()}>
        <NavigationListItem active>Описание проекта</NavigationListItem>
        <NavigationListItem>Участники</NavigationListItem>
        <NavigationListItem>Связанные документы и файлы</NavigationListItem>
      </NavigationList>
    </div>
  ))
  .add('C иконкой', () => (
    <div className={cnStories('wrapper')}>
      <NavigationList {...knobs()}>
        <NavigationListItem className={cnStories('withIcon')}>
          Описание проекта
          <IconCheck size="s" view="success" className={cnStories('icon')} />
        </NavigationListItem>
        <NavigationListItem active>Участники</NavigationListItem>
        <NavigationListItem>Связанные документы и файлы</NavigationListItem>
      </NavigationList>
    </div>
  ))
  .add('C разделителем', () => (
    <div className={cnStories('wrapper')}>
      <NavigationList {...knobs()}>
        <NavigationListItem active>Описание проекта</NavigationListItem>
        <NavigationListItem>Участники</NavigationListItem>
        <NavigationListItem>Связанные документы и файлы</NavigationListItem>
        <NavigationListDelimiter {...knobs()} />
        <NavigationListItem>Похожие проекты</NavigationListItem>
        <NavigationListItem>Описание</NavigationListItem>
      </NavigationList>
    </div>
  ));
