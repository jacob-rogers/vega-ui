import React from 'react';
import { storiesOf } from '@storybook/react';

import { SnackBar } from './SnackBar';

storiesOf('ui/SnackBar', module)
  .addParameters({
    metadata: {
      author: 'Дизайн-система ГПН',
      status: 'Approved',
      link: {
        href: 'https://gpn-prototypes.github.io/ui-kit/?path=/story/ui-kit-snackbar--playground',
        text: 'Storybook компонента',
      },
    },
  })
  .add('SnackBar', () => <SnackBar items={[{ key: 1, message: 'Сообщение' }]} />);
