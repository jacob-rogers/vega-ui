import React from 'react';
import { storiesOf } from '@storybook/react';

import { User } from './User';

storiesOf('ui/User', module)
  .addParameters({
    metadata: {
      author: 'Consta',
      status: 'Approved',
      link: {
        href: 'https://consta-uikit.vercel.app/?path=/docs/components-user--playground',
        text: 'Документация',
      },
    },
  })
  .add('по умолчанию', () => (
    <User
      avatarUrl="https://pbs.twimg.com/profile_images/896978374232600577/v2xEJoxM_400x400.jpg"
      name="Имя Фамилия"
      info="Сегодня на Почтамской"
    />
  ));
