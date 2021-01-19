import React from 'react';
import { storiesOf } from '@storybook/react';

import { Avatar } from './Avatar';

storiesOf('ui/Avatar', module)
  .addParameters({
    metadata: {
      author: 'Consta',
      status: 'Approved',
      link: {
        href: 'https://consta-uikit.vercel.app/?path=/docs/components-avatar--playground',
        text: 'Документация',
      },
    },
  })
  .add('по умолчанию', () => (
    <Avatar url="https://pbs.twimg.com/profile_images/896978374232600577/v2xEJoxM_400x400.jpg" />
  ));
