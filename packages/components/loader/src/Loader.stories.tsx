import React from 'react';
import { storiesOf } from '@storybook/react';

import { Loader } from './Loader';

storiesOf('ui/Loader', module)
  .addParameters({
    metadata: {
      author: 'Дизайн-система ГПН',
      status: 'Approved',
      link: {
        href:
          'https://gpn-prototypes.github.io/ui-kit/?path=/story/loader--%D1%82%D0%BE%D1%87%D0%BA%D0%B8',
        text: 'Storybook компонента',
      },
    },
  })
  .add('Loader', () => <Loader size="s" />);
