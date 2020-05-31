import React from 'react';
import { storiesOf } from '@storybook/react';

import { Timer } from './Timer';

storiesOf('ui/Timer', module)
  .addParameters({
    metadata: {
      author: 'Дизайн-система ГПН',
      status: 'Approved',
      link: {
        href: 'https://gpn-prototypes.github.io/ui-kit/?path=/story/ui-kit-timer--playground',
        text: 'Storybook компонента',
      },
    },
  })
  .add('по умолчанию', () => <Timer seconds={5} progress={50} animation={false} size="m" />);
