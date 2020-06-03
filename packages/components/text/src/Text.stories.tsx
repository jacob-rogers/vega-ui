import React from 'react';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Text } from './Text';

storiesOf('ui/Text', module)
  .addParameters({
    metadata: {
      author: 'Дизайн-система ГПН',
      status: 'Approved',
      link: {
        href: 'https://gpn-prototypes.github.io/ui-kit/?path=/story/text',
        text: 'Документация',
      },
    },
  })
  .add('по умолчанию', () => {
    return <Text>{text('текст', 'Дефолтный текст')}</Text>;
  });
