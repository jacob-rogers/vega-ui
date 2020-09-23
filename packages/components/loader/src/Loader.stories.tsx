import React from 'react';
import { storiesOf } from '@storybook/react';

import { Loader } from './Loader';

storiesOf('ui/Loader', module)
  .addParameters({
    metadata: {
      author: 'Consta',
      status: 'Approved',
      link: {
        href: 'https://consta-uikit.vercel.app/?path=/docs/components-loader--playground',
        text: 'Storybook компонента',
      },
    },
  })
  .add('Loader', () => <Loader size="s" />);
