import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Radio } from './Radio';

storiesOf('ui/Radio', module)
  .addParameters({
    metadata: {
      author: 'Дизайн-система ГПН',
      status: 'Approved',
      link: {
        href: 'https://gpn-prototypes.github.io/ui-kit/?path=/story/radio',
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
