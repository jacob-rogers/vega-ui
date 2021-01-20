import React, { useState } from 'react';
import { IconProps } from '@consta/uikit/Icon';
import { boolean, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { IconCamera, IconPhoto, IconRing } from '../icons';

import { Tabs } from './Tabs';

type IconElement = React.FC<IconProps>;

type Item = {
  name: string;
  icon?: React.FC<IconProps>;
  count?: number;
};

type StoriesProps = {
  size: 's' | 'm';
  view: 'bordered' | 'clear';
  onlyIcon?: boolean;
  withIcon?: boolean;
};

const items = [
  {
    name: 'Первый',
    icon: IconPhoto,
  },
  {
    name: 'Очень длинный второй вариант',
    icon: IconRing,
  },
  {
    name: 'Третий вариант',
    icon: IconCamera,
  },
  {
    name: 'Очень длинный четвёртый вариант',
    icon: IconRing,
  },
  {
    name: 'Пятый вариант',
    icon: IconCamera,
  },
  {
    name: 'Очень длинный шестой вариант',
    icon: IconRing,
  },
  {
    name: 'Седьмой вариант',
    icon: IconCamera,
  },
];

function Stories({ size, view, onlyIcon, withIcon }: StoriesProps): React.ReactElement {
  const [valueTab, setValueTab] = useState<Item | null>(items[0]);

  const getIcon = (item: Item): IconElement | undefined => {
    return withIcon ? item.icon : undefined;
  };

  return (
    <Tabs<Item>
      items={items}
      value={valueTab}
      getLabel={(item: Item): string => item.name}
      getIcon={getIcon}
      onChange={({ value }): void => setValueTab(value)}
      size={size}
      view={view}
      onlyIcon={onlyIcon}
    />
  );
}

const knobs = (): StoriesProps => ({
  size: select('size', ['s', 'm'], 'm'),
  view: select('view', ['bordered', 'clear'], 'bordered'),
  withIcon: boolean('withIcon', false),
  onlyIcon: boolean('onlyIcon', false),
});

storiesOf('ui/Tabs', module)
  .addParameters({
    metadata: {
      author: 'CSSSR',
      status: 'Approved',
      link: {
        href:
          'https://github.com/gpn-prototypes/vega-ui/blob/master/src/components/tabs/README.md ',
        text: 'Документация',
      },
    },
  })
  .add('Табы', () => <Stories {...knobs()} />);
