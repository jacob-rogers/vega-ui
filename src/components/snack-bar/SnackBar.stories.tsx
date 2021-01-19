import React from 'react';
import { storiesOf } from '@storybook/react';

import { SnackBar } from './SnackBar';

storiesOf('ui/SnackBar', module)
  .addParameters({
    metadata: {
      author: 'Consta',
      status: 'Approved',
      link: {
        href: 'https://consta-uikit.vercel.app/?path=/docs/components-snackbar--playground',
        text: 'Storybook компонента',
      },
    },
  })
  .add('SnackBar', () => <SnackBar items={[{ key: 1, message: 'Сообщение' }]} />);
