---
to: packages/components/<%= name %>/src/<%= h.changeCase.pascal(name) %>.stories.tsx
---
import React from 'react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { <%= h.changeCase.pascal(name) %>, <%= h.changeCase.pascal(name) %>Props } from './<%= h.changeCase.pascal(name) %>';

const defaultKnobs = (): <%= h.changeCase.pascal(name) %>Props => ({
  title: text('title', 'Title'),
});

storiesOf('ui/<%= h.changeCase.pascal(name) %>', module)
  .addDecorator(withKnobs)
  .addParameters({ metadata: { author: 'CSSSR', status: 'Approved' } })
  .add('по умолчанию', () => <<%= h.changeCase.pascal(name) %> {...defaultKnobs()} />);
