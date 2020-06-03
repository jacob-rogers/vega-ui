import React from 'react';
import { storiesOf } from '@storybook/react';

import { File } from './File';

storiesOf('ui/File', module)
  .addParameters({
    metadata: {
      author: 'Дизайн-система ГПН',
      status: 'Approved',
      link: {
        href: 'https://gpn-prototypes.github.io/ui-kit/?path=/story/file',
        text: 'Документация',
      },
    },
  })
  .add('по умолчанию', () => <File extension="jpg" />);
