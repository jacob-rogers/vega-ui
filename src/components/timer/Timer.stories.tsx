import React from 'react';
import { storiesOf } from '@storybook/react';

import { Timer } from './Timer';

storiesOf('ui/Timer', module)
  .addParameters({
    metadata: {
      author: 'Consta',
      status: 'Approved',
      link: {
        href: 'https://consta-uikit.vercel.app/?path=/docs/components-timer--playground',
        text: 'Storybook компонента',
      },
    },
  })
  .add('по умолчанию', () => <Timer seconds={5} progress={50} animation={false} size="m" />);
