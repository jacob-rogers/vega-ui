import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { TextField } from './TextField';

storiesOf('ui/TextField', module)
  .addParameters({
    metadata: {
      author: 'Consta',
      status: 'Approved',
      link: {
        href: 'https://consta-uikit.vercel.app/?path=/docs/components-textfield--playground',
        text: 'Документация',
      },
    },
  })
  .add('по умолчанию', () => {
    const [inputValue, setValue] = useState<string | null | undefined>(undefined);

    const handleChange = ({ value }: { value: string | null }): void => {
      setValue(value);
    };

    return <TextField value={inputValue} onChange={handleChange} placeholder="Введите текст" />;
  });
