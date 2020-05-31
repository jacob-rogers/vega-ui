import React from 'react';
import { storiesOf } from '@storybook/react';

import { ProgressSpin } from './ProgressSpin';

storiesOf('ui/ProgressSpin', module)
  .addParameters({
    metadata: {
      author: 'Дизайн-система ГПН',
      status: 'Approved',
      link: {
        href:
          'https://gpn-prototypes.github.io/ui-kit/?path=/story/ui-kit-progressspin--playground',
        text: 'Storybook компонента',
      },
    },
  })
  .add('по умолчанию', () => <ProgressSpin progress={50} size="m" animation={false} />);
