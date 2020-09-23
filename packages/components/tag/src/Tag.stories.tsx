import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Tag } from './Tag';

storiesOf('ui/Tag', module)
  .addDecorator(withKnobs)
  .addParameters({
    metadata: {
      author: 'Consta',
      status: 'Approved',
      link: {
        href: 'https://consta-uikit.vercel.app/?path=/docs/components-tag--playground',
        text: 'Storybook компонента',
      },
    },
  })
  .add('по умолчанию', () => <Tag label="Label" mode="button" onClick={(): void => {}} />);
