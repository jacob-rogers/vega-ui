import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Radio } from './Radio';

storiesOf('ui/Radio', module)
  .addParameters({
    metadata: {
      author: 'Consta',
      status: 'Approved',
      link: {
        href: 'https://consta-uikit.vercel.app/?path=/docs/components-radio--playground',
        text: 'Документация',
      },
    },
  })
  .add('по умолчанию', () => {
    const [isChecked, setChecked] = useState<boolean>(false);

    const handleChange = ({ checked }: { checked: boolean }): void => {
      setChecked(checked);
    };
    return <Radio onChange={handleChange} checked={isChecked} label="Радио" />;
  });
