import React, { useState } from 'react';
import { IconProps } from '@gpn-design/uikit/Icon';
import { IconFavorite } from '@gpn-prototypes/vega-icons';
import { storiesOf } from '@storybook/react';

import { ChoiceGroup } from './ChoiceGroup';

type Item = {
  name: string;
  icon?: React.FC<IconProps>;
};

const items = [
  {
    name: 'один',
  },
  {
    name: 'два',
  },
  {
    name: 'три',
    icon: IconFavorite,
  },
  {
    name: 'четыре',
  },
] as Item[];

storiesOf('ui/ChoiceGroup', module)
  .addParameters({
    metadata: {
      author: 'Дизайн-система ГПН',
      status: 'Approved',
      link: {
        href: 'https://gpn-prototypes.github.io/ui-kit/?path=/story/choicegroup',
        text: 'Документация',
      },
    },
  })
  .add('по умолчанию', () => {
    const [selectValue, setValue] = useState<Item[] | null>(null);

    return (
      <>
        <ChoiceGroup<Item>
          items={items}
          value={selectValue}
          getItemKey={(item): string => item.name}
          getItemLabel={(item): string => item.name}
          onChange={({ value }): void => setValue(value)}
          getItemIcon={(item): React.FC<IconProps> | undefined => item.icon}
          name="ChoiceGroup"
        />
      </>
    );
  });
