import React from 'react';
import { storiesOf } from '@storybook/react';

import { Informer } from './Informer';

storiesOf('ui/Informer', module)
  .addParameters({
    metadata: {
      author: 'Дизайн-система ГПН',
      status: 'Approved',
      link: {
        href: 'https://gpn-prototypes.github.io/ui-kit/?path=/story/informer',
        text: 'Документация',
      },
    },
  })
  .add('по умолчанию', () => <Informer status="system" label="I am informer" view="filled" />);
