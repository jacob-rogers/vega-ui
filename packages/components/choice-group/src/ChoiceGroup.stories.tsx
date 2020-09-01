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
      author: 'Consta',
      status: 'Approved',
      link: {
        href: 'https://ui-kit.gpn.vercel.app/?path=/story/components-choicegroup--playground',
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
          value={selectValue}
          getLabel={(item): string => item.name}
          onChange={({ value }: { value: Item | null }): void => setValue(value)}
          getIcon={(item): React.FC<IconProps> | undefined => item.icon}
          name="ChoiceGroup"
        />
      </>
    );
  });
