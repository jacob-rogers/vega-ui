import React, { useState } from 'react';
import { IconProps } from '@gpn-design/uikit/Icon';
import { IconCamera, IconPhoto, IconRing } from '@gpn-prototypes/vega-icons';
import { boolean, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Tabs } from './Tabs';

type IconElement = React.FC<IconProps>;

type Item = {
  name: string;
  icon?: IconElement;
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

  const getIcon = (item: Item): IconElement | undefined => (withIcon ? item.icon : undefined);

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
  .addParameters({ metadata: { author: 'CSSSR', status: 'Approved' } })
  .add('Табы', () => <Stories {...knobs()} />);
