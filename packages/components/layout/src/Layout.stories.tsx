import React from 'react';
import styled from '@emotion/styled';
import { Button } from '@gpn-prototypes/vega-button';
import { IconSelect } from '@gpn-prototypes/vega-icons';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import { Layout } from './Layout';

export const Container = styled.div`
  width: 1000px;
  height: 400px;
  box-sizing: border-box;
`;

export const Box = styled.div`
  width: 1050px;
  height: 100px;
  display: inline-block;
  margin: 5px;
  background-color: deepskyblue;
`;

const onLayoutChange = action('onLayoutChange');
export interface HeaderExampleProps {
  label?: string;
}
export const LayoutHeaderExample: React.FC<HeaderExampleProps> = ({
  label = 'Структура проекта',
}) => (
  <Layout.Header>
    {/* TBD тут будет https://jira.csssr.io/browse/VEGA-129 */}
    <Button label={label} size="xs" view="clear" iconRight={IconSelect} iconSize="s" form="brick" />
    <Layout.Options onLayoutChange={onLayoutChange} />
  </Layout.Header>
);

const stories = storiesOf('layout/Layout', module)
  .addParameters({ metadata: { author: 'CSSSR', status: 'Draft' } })
  .addDecorator((story) => <Container>{story()}</Container>);

stories.add('горизонтальное разделение окон', () => {
  return (
    <Layout splitDirection="horizontal" sizes={[70, 30]}>
      <Layout.Window>
        <LayoutHeaderExample />
      </Layout.Window>
      <Layout.Window>
        <LayoutHeaderExample />
      </Layout.Window>
    </Layout>
  );
});

stories.add('вертикальное разделение окон', () => {
  return (
    <Layout sizes={[30, 70]}>
      <Layout.Window>
        <LayoutHeaderExample />
      </Layout.Window>

      <Layout.Window>
        <LayoutHeaderExample />
      </Layout.Window>
    </Layout>
  );
});

stories.add('вложенные окошки', () => {
  return (
    <Layout sizes={[60, 40]}>
      <Layout.Window>
        <Layout sizes={[20, 80]}>
          <Layout.Window>
            <Layout splitDirection="horizontal" sizes={[65, 35]}>
              <Layout.Window>
                <LayoutHeaderExample />
                <Layout.Body>
                  <Box />
                </Layout.Body>
              </Layout.Window>

              <Layout.Window>
                <LayoutHeaderExample />
              </Layout.Window>
            </Layout>
          </Layout.Window>

          <Layout.Window>
            <Layout splitDirection="horizontal" sizes={[55, 45]}>
              <Layout.Window>
                <LayoutHeaderExample />
                <Layout.Body>
                  <Box style={{ width: 300, height: 550 }} />
                </Layout.Body>
              </Layout.Window>

              <Layout.Window>
                <Layout splitDirection="horizontal" sizes={[55, 45]}>
                  <Layout.Window>
                    <LayoutHeaderExample />
                    <Layout.Body>
                      <Box style={{ width: 300, height: 550 }} />
                    </Layout.Body>
                  </Layout.Window>

                  <Layout.Window>
                    <LayoutHeaderExample />
                    <Layout.Body />
                  </Layout.Window>
                </Layout>
              </Layout.Window>
            </Layout>
          </Layout.Window>
        </Layout>
      </Layout.Window>

      <Layout.Window>
        <Layout splitDirection="horizontal" sizes={[55, 45]}>
          <Layout.Window>
            <Layout splitDirection="horizontal" sizes={[55, 45]}>
              <Layout.Window>
                <LayoutHeaderExample />
                <Layout.Body>
                  <Box style={{ width: 300, height: 550 }} />
                </Layout.Body>
              </Layout.Window>

              <Layout.Window>
                <Layout sizes={[55, 45]}>
                  <Layout.Window>
                    <LayoutHeaderExample />
                    <Layout.Body>
                      <Box style={{ width: 300, height: 550 }} />
                    </Layout.Body>
                  </Layout.Window>

                  <Layout.Window>
                    <LayoutHeaderExample />
                    <Layout.Body />
                  </Layout.Window>
                </Layout>
              </Layout.Window>
            </Layout>
          </Layout.Window>

          <Layout.Window>
            <LayoutHeaderExample />
            <Layout.Body />
          </Layout.Window>
        </Layout>
      </Layout.Window>
    </Layout>
  );
});
