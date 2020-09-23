import React from 'react';
import { storiesOf } from '@storybook/react';

import { Attach } from './Attach';

storiesOf('ui/Attach', module)
  .addParameters({
    metadata: {
      author: 'Consta',
      status: 'Approved',
      link: {
        href: 'https://consta-uikit.vercel.app/?path=/story/components-attach--playground',
        text: 'Storybook компонента',
      },
    },
  })
  .add('по умолчанию', () => (
    <Attach
      fileName="Приложенный документ"
      fileDescription="1,5 Mб 21.02.2019, 14:12"
      fileExtension="doc"
      loading={false}
    />
  ));
