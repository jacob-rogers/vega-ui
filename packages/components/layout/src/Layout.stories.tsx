import React from 'react';
import styled from '@emotion/styled';
import { Button } from '@gpn-prototypes/vega-button';
import { IconKebab, IconSelect } from '@gpn-prototypes/vega-icons';
import { storiesOf } from '@storybook/react';

import { Layout } from './Layout';

const Container = styled.div`
  width: 1000px;
  height: 800px;
  box-sizing: border-box;
`;

const Content = styled.div`
  font-size: 30px;
  padding: 20px;
`;

const Box = styled.div`
  width: 1050px;
  height: 100px;
  display: inline-block;
  margin: 5px;
  background-color: deepskyblue;
`;

const LayoutHeaderExample: typeof Layout.Header = () => (
  <Layout.Header>
    {/* TBD тут будет https://jira.csssr.io/browse/VEGA-129 */}
    <Button
      label="Структура проекта"
      size="xs"
      view="clear"
      iconRight={IconSelect}
      iconSize="s"
      form="brick"
    />
    {/* TBD тут будет https://jira.csssr.io/browse/VEGA-126 */}
    <Button onlyIcon size="xs" view="clear" iconLeft={IconKebab} iconSize="s" form="brick" />
  </Layout.Header>
);

const stories = storiesOf('layout/Layout', module)
  .addParameters({ metadata: { author: 'CSSSR', status: 'Draft' } })
  .addDecorator((story) => <Container>{story()}</Container>);

stories.add('горизонтальное разделение окон', () => {
  return (
    <Layout style={{ gridTemplateRows: '70% 30%' }}>
      <Layout.Window resize="horizontal">
        <LayoutHeaderExample />
      </Layout.Window>

      <Layout.Window resize="horizontal">
        <LayoutHeaderExample />
      </Layout.Window>
    </Layout>
  );
});

stories.add('вертикальное разделение окон', () => {
  return (
    <Layout style={{ gridTemplateColumns: '30% 70%' }}>
      <Layout.Window resize="vertical">
        <LayoutHeaderExample />
      </Layout.Window>

      <Layout.Window resize="vertical">
        <LayoutHeaderExample />
      </Layout.Window>
    </Layout>
  );
});

stories.add('вложенные окошки', () => {
  return (
    <Layout style={{ gridTemplateColumns: '60% 40%' }}>
      <Layout.Window resize="vertical">
        <Layout style={{ gridTemplateColumns: '50% 50%' }}>
          <Layout.Window resize="vertical">
            <Layout style={{ gridTemplateRows: '65% 35%' }}>
              <Layout.Window resize="horizontal">
                <LayoutHeaderExample />
                <Layout.Body>
                  <Box />
                </Layout.Body>
              </Layout.Window>

              <Layout.Window resize="vertical">
                <LayoutHeaderExample />
              </Layout.Window>
            </Layout>
          </Layout.Window>

          <Layout.Window resize="vertical">
            <LayoutHeaderExample />
            <Layout.Body />
          </Layout.Window>
        </Layout>
      </Layout.Window>

      <Layout.Window resize="vertical">
        <Layout style={{ gridTemplateRows: '55% 45%' }}>
          <Layout.Window resize="horizontal">
            <LayoutHeaderExample />
            <Layout.Body>
              <Box style={{ width: 300, height: 550 }} />
            </Layout.Body>
          </Layout.Window>

          <Layout.Window resize="horizontal">
            <LayoutHeaderExample />
            <Layout.Body />
          </Layout.Window>
        </Layout>
      </Layout.Window>
    </Layout>
  );
});

const storiesHeader = storiesOf('layout/LayoutHeader', module)
  .addParameters({ metadata: { author: 'CSSSR', status: 'Draft' } })
  .addDecorator((story) => <Container>{story()}</Container>);

storiesHeader.add('по умолчанию', () => {
  return (
    <Layout>
      <Layout.Window>
        <LayoutHeaderExample />
      </Layout.Window>
    </Layout>
  );
});

const storiesWindow = storiesOf('layout/LayoutWindow', module)
  .addParameters({ metadata: { author: 'CSSSR', status: 'Draft' } })
  .addDecorator((story) => <Container>{story()}</Container>);

storiesWindow.add('пустое окно', () => {
  return (
    <Layout>
      <Layout.Window />
    </Layout>
  );
});

storiesWindow.add('окно с шапкой и контентом', () => {
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

const storiesBody = storiesOf('layout/LayoutBody', module)
  .addParameters({ metadata: { author: 'CSSSR', status: 'Draft' } })
  .addDecorator((story) => <Container>{story()}</Container>);

storiesBody.add('скролл горизонтальный', () => {
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

storiesBody.add('скролл вертикальный', () => {
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

storiesBody.add('скролл горизонтальный и вертикальный', () => {
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
