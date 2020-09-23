import React from 'react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { PageBanner, PageBannerProps } from './PageBanner';

const defaultKnobs = (): PageBannerProps => ({
  title: text('title', 'Новый проект'),
  description: text('description', 'Россия, Регион'),
});

storiesOf('ui/PageBanner', module)
  .addDecorator(withKnobs)
  .addParameters({
    metadata: {
      author: 'CSSSR',
      status: 'Approved',
      link: {
        href:
          'https://github.com/gpn-prototypes/vega-ui/blob/master/packages/components/page-banner/README.md',
        text: 'Документация',
      },
    },
  })
  .add('Page banner', () => <PageBanner {...defaultKnobs()} />);
