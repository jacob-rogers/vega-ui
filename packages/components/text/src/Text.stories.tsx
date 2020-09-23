import React from 'react';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Text } from './Text';

storiesOf('ui/Text', module)
  .addParameters({
    metadata: {
      author: 'Consta',
      status: 'Approved',
      link: {
        href: 'https://consta-uikit.vercel.app/?path=/docs/components-text--playground',
        text: 'Документация',
      },
    },
  })
  .add('по умолчанию', () => {
    return <Text>{text('текст', 'Дефолтный текст')}</Text>;
  });
