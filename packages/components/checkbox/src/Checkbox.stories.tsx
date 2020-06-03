import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Checkbox } from './Checkbox';

storiesOf('ui/Checkbox', module)
  .addParameters({
    metadata: {
      author: 'Дизайн-система ГПН',
      status: 'Approved',
      link: {
        href: 'https://gpn-prototypes.github.io/ui-kit/?path=/story/checkbox',
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
