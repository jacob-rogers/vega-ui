import React from 'react';
import { storiesOf } from '@storybook/react';

import { Button } from './Button';

storiesOf('ui/Button', module)
  .addParameters({
    metadata: {
      author: 'Consta',
      status: 'Approved',
      link: {
        href: 'https://consta-uikit.vercel.app/?path=/docs/components-button--playground',
        text: 'Документация',
      },
    },
  })
  .add('по умолчанию', () => {
    return <Button size="m" view="primary" label="Дефолтный текст" />;
  });
