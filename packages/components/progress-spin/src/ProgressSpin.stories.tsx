import React from 'react';
import { storiesOf } from '@storybook/react';

import { ProgressSpin } from './ProgressSpin';

storiesOf('ui/ProgressSpin', module)
  .addParameters({
    metadata: {
      author: 'Consta',
      status: 'Approved',
      link: {
        href: 'https://consta-uikit.vercel.app/?path=/docs/components-progressspin--playground',
        text: 'Storybook компонента',
      },
    },
  })
  .add('по умолчанию', () => <ProgressSpin progress={50} size="m" animation={false} />);
