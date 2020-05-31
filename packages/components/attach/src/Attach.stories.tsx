import React from 'react';
import { storiesOf } from '@storybook/react';

import { Attach } from './Attach';

storiesOf('ui/Attach', module)
  .addParameters({
    metadata: {
      author: 'Дизайн-система ГПН',
      status: 'Approved',
      link: {
        href: 'https://gpn-prototypes.github.io/ui-kit/?path=/story/ui-kit-attach--playground',
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
