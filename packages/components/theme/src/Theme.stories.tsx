import React from 'react';
import { storiesOf } from '@storybook/react';

storiesOf('ui/Theme', module)
  .addParameters({
    metadata: {
      author: 'Consta',
      status: 'Approved',
      link: {
        href: 'https://consta-uikit.vercel.app/?path=/docs/components-theme--playground',
        text: 'Документация',
      },
    },
  })
  .add('Theme', () => (
    <div>
      <a
        href="https://consta-uikit.vercel.app/?path=/docs/components-theme--playground"
        style={{ color: 'var(--color-typo-primary)' }}
      >
        Документация и примеры в ДС
      </a>
    </div>
  ));
