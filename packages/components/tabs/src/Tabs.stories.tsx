import React, { useState } from 'react';
import { IconProps } from '@gpn-design/uikit/Icon';
import { IconCamera, IconPhoto, IconRing } from '@gpn-prototypes/vega-icons';
import { boolean, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Tabs } from './Tabs';

type IconElement = (props: IconProps) => JSX.Element;

type Item = {
  name: string;
  icon?: IconElement;
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
    count: 3,
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
  const [valueTab, setValueTab] = useState<Item[] | null>([
    {
      name: 'Первый',
      icon: IconPhoto,
    },
  ]);

  const stylesCounter = {
    display: 'inline-block',
    padding: '0 3px',
    marginLeft: '5px',
    backgroundColor: '#efefef',
    color: '#555',
    borderRadius: '2px',
  };

  const getIcon = (item: Item): IconElement | undefined => (withIcon ? item.icon : undefined);

  return (
    <Tabs<Item>
      items={items}
      value={valueTab}
      getItemKey={(item): string => item.name}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getItemLabel={(item): any => (
        <>
          <span>{item.name}</span>
          {item.count && <span style={stylesCounter}>{item.count}</span>}
        </>
      )}
      getItemIcon={getIcon}
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
