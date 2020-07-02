import React from 'react';
import styled from '@emotion/styled';
import { storiesOf } from '@storybook/react';

import { Layout } from '../Layout';
import { Container, LayoutHeaderExample } from '../Layout.stories';

const Content = styled.div`
  font-size: 30px;
  padding: 20px;
`;

const stories = storiesOf('layout/LayoutWindow', module)
  .addParameters({ metadata: { author: 'CSSSR', status: 'Draft' } })
  .addDecorator((story) => <Container>{story()}</Container>);

stories.add('пустое окно', () => {
  return (
    <Layout>
      <Layout.Window />
    </Layout>
  );
});

stories.add('окно с шапкой и контентом', () => {
  return (
    <Layout>
      <Layout.Window>
        <LayoutHeaderExample />
        <Layout.Body>
          <Content>Ку-ку</Content>
        </Layout.Body>
      </Layout.Window>
    </Layout>
  );
});
