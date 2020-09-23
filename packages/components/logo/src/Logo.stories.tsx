import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Logo } from './Logo';

storiesOf('ui/Logo', module)
  .addDecorator(withKnobs)
  .addParameters({
    metadata: {
      author: 'CSSSR',
      status: 'Approved',
      link: {
        href:
          'https://github.com/gpn-prototypes/vega-ui/blob/master/packages/components/logo/README.md',
        text: 'Документация',
      },
    },
  })
  .add('по умолчанию', () => {
    return <Logo />;
  });
