import React from 'react';
import { storiesOf } from '@storybook/react';

import { Badge } from './Badge';

storiesOf('ui/Badge', module)
  .addParameters({
    metadata: {
      author: 'Дизайн-система ГПН',
      status: 'Approved',
      link: {
        href: 'https://gpn-prototypes.github.io/ui-kit/?path=/story/ui-kit-badge',
        text: 'Документация',
      },
    },
  })
  .add('по умолчанию', () => <Badge label="Statusing along" />);
