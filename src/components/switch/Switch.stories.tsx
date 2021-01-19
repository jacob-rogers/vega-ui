import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Switch } from './Switch';

storiesOf('ui/Switch', module)
  .addParameters({
    metadata: {
      author: 'Consta',
      status: 'Approved',
      link: {
        href: 'https://consta-uikit.vercel.app/?path=/docs/components-switch--playground',
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
