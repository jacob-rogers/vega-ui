import React from 'react';
import { storiesOf } from '@storybook/react';

import { Layout } from '../Layout';
import { Container, LayoutHeaderExample } from '../Layout.stories';

const stories = storiesOf('layout/LayoutHeader', module)
  .addParameters({ metadata: { author: 'CSSSR', status: 'Draft' } })
  .addDecorator((story) => <Container>{story()}</Container>);

stories.add('по умолчанию', () => {
  return (
    <Layout>
      <Layout.Window>
        <LayoutHeaderExample />
      </Layout.Window>
    </Layout>
  );
});

stories.add('горизонтальный скроллбар в шапке', () => {
  return (
    <Layout sizes={[50, 50]}>
      <Layout.Window>
        <LayoutHeaderExample />
      </Layout.Window>

      <Layout.Window>
        <LayoutHeaderExample label="Придумайте длинный заголовок шапки собака спит и храпит, скорее бы пойти гулять и еще кушать" />
      </Layout.Window>
    </Layout>
  );
});
