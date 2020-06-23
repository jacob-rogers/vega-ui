import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import { Layout } from './Layout';

storiesOf('ui/Layout', module).add('по умолчанию', () => {
  return <Layout onChange={action('onChange')} />;
});
