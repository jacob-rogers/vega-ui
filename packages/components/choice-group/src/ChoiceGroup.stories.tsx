import React, { useState } from 'react';
import { IconProps } from '@consta/uikit/Icon';
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
      author: 'Consta',
      status: 'Approved',
      link: {
        href: 'https://consta-uikit.vercel.app/?path=/docs/components-choicegroup--playground',
        text: 'Документация',
      },
    },
  })
  .add('по умолчанию', () => {
    const [selectValue, setValue] = useState<Item | null>(null);

    return (
      <>
        <ChoiceGroup<Item>
          items={items}
          multiple={false}
          value={selectValue}
          getLabel={(item: Item): string => item.name}
          onChange={({ value }): void => setValue(value)}
          getIcon={(item: Item): React.FC<IconProps> | undefined => item.icon}
          name="ChoiceGroup"
        />
      </>
    );
  });
