import React from 'react';
import styled from '@emotion/styled';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { SplitPanes, SplitPanesProps } from './SplitPanes';

interface Defaults {
  split?: 'vertical' | 'horizontal';
  allowResize?: boolean;
}

const defaultKnobs = (defaults: Defaults = {}, prefix = ''): Partial<SplitPanesProps> => ({
  style: { height: 800 },
  allowResize: boolean(`${prefix}allowResize`, defaults.allowResize ?? true),
  split: select(`${prefix}split`, ['horizontal', 'vertical'], defaults.split ?? 'vertical'),
  onResizeStart: action(`${prefix}onResizeStart`),
  onResize: action(`${prefix}onResize`),
  onResizeEnd: action(`${prefix}onResizeEnd`),
});

const Pane = styled(SplitPanes.Pane)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Text = styled.div`
  font-family: monospace;
  white-space: nowrap;
`;

const Header = styled(Text)`
  background-color: var(--color-bg-brand);
  width: 100%;
  text-align: center;
`;

storiesOf('ui/SplitPanes', module)
  .addParameters({
    metadata: {
      author: 'CSSSR',
      status: 'Approved',
      link: {
        href: 'https://github.com/gpn-prototypes/vega-ui/tree/master/src/components/split-panes/README.md',
        text: 'Документация',
      },
    },
  })
  .add('по умолчанию', () => {
    return (
      <SplitPanes {...defaultKnobs()}>
        <Pane initialSize="200px" min="50px" max="300px">
          <div>
            <Text>initial: 200px</Text>
            <Text>min: 50px</Text>
            <Text>max: 300px</Text>
          </div>
        </Pane>
        <Pane>auto</Pane>
        <Pane initialSize="300px" min="5%">
          <div>
            <Text>initial: 300px</Text>
            <Text>min: 5%</Text>
          </div>
        </Pane>
      </SplitPanes>
    );
  })
  .add('вложенные', () => {
    return (
      <SplitPanes {...defaultKnobs()}>
        <Pane min="50px">
          <Text>min: 50px</Text>
        </Pane>
        <Pane min="100px">
          <Header>min: 100px</Header>
          <SplitPanes {...defaultKnobs({ split: 'horizontal' }, '[nested] ')}>
            <Pane min="50px">
              <Text>min: 50px</Text>
            </Pane>
            <Pane initialSize="50px">
              <Text>initial: 50px</Text>
            </Pane>
            <Pane min="50px" max="100px">
              <Text>min: 50px</Text>
              <Text>max: 100px</Text>
            </Pane>
          </SplitPanes>
        </Pane>
        <Pane min="10%">
          <Text>min: 10%</Text>
        </Pane>
      </SplitPanes>
    );
  });
