import React from 'react';
import { storiesOf } from '@storybook/react';

import { File } from './File';

storiesOf('ui/File', module)
  .addParameters({
    metadata: {
      author: 'Consta',
      status: 'Approved',
      link: {
        href: 'https://consta-uikit.vercel.app/?path=/docs/components-file--gallery',
        text: 'Документация',
      },
    },
  })
  .add('по умолчанию', () => <File extension="jpg" />);
