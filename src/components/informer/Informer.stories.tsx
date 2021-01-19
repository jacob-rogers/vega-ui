import React from 'react';
import { storiesOf } from '@storybook/react';

import { Informer } from './Informer';

storiesOf('ui/Informer', module)
  .addParameters({
    metadata: {
      author: 'Consta',
      status: 'Approved',
      link: {
        href: 'https://consta-uikit.vercel.app/?path=/docs/components-informer--playground',
        text: 'Документация',
      },
    },
  })
  .add('по умолчанию', () => <Informer status="system" label="I am informer" view="filled" />);
