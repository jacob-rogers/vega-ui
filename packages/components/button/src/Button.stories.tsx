import React from 'react';
import { storiesOf } from '@storybook/react';

import { Button } from './Button';

storiesOf('ui/Button', module)
  .addParameters({
    metadata: {
      author: 'Дизайн-система ГПН',
      status: 'Approved',
      link: {
        href: 'https://gpn-prototypes.github.io/ui-kit/?path=/story/button',
        text: 'Документация',
      },
    },
  })
  .add('по умолчанию', () => {
    return <Button size="m" view="primary" label="Дефолтный текст" />;
  });
