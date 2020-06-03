import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Switch } from './Switch';

storiesOf('ui/Switch', module)
  .addParameters({
    metadata: {
      author: 'Дизайн-система ГПН',
      status: 'Approved',
      link: {
        href: 'https://gpn-prototypes.github.io/ui-kit/?path=/story/switch',
        text: 'Документация',
      },
    },
  })
  .add('по умолчанию', () => {
    const [isChecked, setChecked] = useState<boolean>(false);

    const handleChange = ({ checked }: { checked: boolean }): void => {
      setChecked(checked);
    };

    return <Switch onChange={handleChange} checked={isChecked} label="Свитч" />;
  });
