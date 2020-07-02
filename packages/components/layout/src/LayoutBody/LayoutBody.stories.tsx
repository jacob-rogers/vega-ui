import React from 'react';
import { storiesOf } from '@storybook/react';

import { Layout } from '../Layout';
import { Box, Container, LayoutHeaderExample } from '../Layout.stories';

const stories = storiesOf('layout/LayoutBody', module)
  .addParameters({ metadata: { author: 'CSSSR', status: 'Draft' } })
  .addDecorator((story) => <Container>{story()}</Container>);

stories.add('скролл горизонтальный', () => {
  return (
    <Layout>
      <Layout.Window>
        <LayoutHeaderExample />
        <Layout.Body>
          <Box />
        </Layout.Body>
      </Layout.Window>
    </Layout>
  );
});

stories.add('скролл вертикальный', () => {
  return (
    <Layout>
      <Layout.Window>
        <LayoutHeaderExample />
        <Layout.Body>
          <Box style={{ width: 300, height: 550 }} />
        </Layout.Body>
      </Layout.Window>
    </Layout>
  );
});

stories.add('скролл горизонтальный и вертикальный', () => {
  const boxes = new Array(5).fill(1);

  return (
    <Layout>
      <Layout.Window>
        <LayoutHeaderExample />
        <Layout.Body>
          {boxes.map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Box key={i} />
          ))}
        </Layout.Body>
      </Layout.Window>
    </Layout>
  );
});
