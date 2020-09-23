import React from 'react';
import { storiesOf } from '@storybook/react';

import { Badge } from './Badge';

storiesOf('ui/Badge', module)
  .addParameters({
    metadata: {
      author: 'Consta',
      status: 'Approved',
      link: {
        href: 'https://consta-uikit.vercel.app/?path=/docs/components-badge--playground',
        text: 'Документация',
      },
    },
  })
  .add('по умолчанию', () => <Badge label="Statusing along" />);
