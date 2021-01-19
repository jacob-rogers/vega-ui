import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Checkbox } from './Checkbox';

storiesOf('ui/Checkbox', module)
  .addParameters({
    metadata: {
      author: 'Consta',
      status: 'Approved',
      link: {
        href: 'https://consta-uikit.vercel.app/?path=/docs/components-checkbox--playground',
        text: 'Документация',
      },
    },
  })
  .add('по умолчанию', () => {
    const [isChecked, setChecked] = useState<boolean>(false);

    const handleChange = ({ checked }: { checked: boolean }): void => {
      setChecked(checked);
    };

    return <Checkbox onChange={handleChange} checked={isChecked} label="Чекбокс" />;
  });
