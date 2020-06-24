import React from 'react';
import { storiesOf } from '@storybook/react';

storiesOf('ui/Theme', module)
  .addParameters({
    metadata: {
      author: 'Дизайн-система ГПН',
      status: 'Approved',
      link: {
        href: 'https://gpn-prototypes.github.io/ui-kit/?path=/docsx/ui-kit-theme--documentation',
        text: 'Документация',
      },
    },
  })
  .add('Theme', () => (
    <div>
      <a
        href="https://gpn-prototypes.github.io/ui-kit/?path=/docsx/ui-kit-theme--documentation"
        style={{ color: 'var(--color-typo-primary)' }}
      >
        Документация и примеры в ДС
      </a>
    </div>
  ));
