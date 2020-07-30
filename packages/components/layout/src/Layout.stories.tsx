/* eslint-disable max-classes-per-file */
import React from 'react';
import styled from '@emotion/styled';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import { Layout } from './Layout';

const widgets = [
  { name: 'Widget one', component: 'vega-widget-one' },
  { name: 'Widget two', component: 'vega-widget-two' },
];

class WidgetOne extends HTMLElement {
  static widgetName = 'vega-widget-one';

  connectedCallback(): void {
    this.innerHTML = '<h1>Widget One</h1>';
  }
}

class WidgetTwo extends HTMLElement {
  static widgetName = 'vega-widget-two';

  connectedCallback(): void {
    this.innerHTML = '<h1>Widget Two</h1>';
  }
}

if (window.customElements.get(WidgetOne.widgetName) === undefined) {
  window.customElements.define(WidgetOne.widgetName, WidgetOne);
}

if (window.customElements.get(WidgetTwo.widgetName) === undefined) {
  window.customElements.define(WidgetTwo.widgetName, WidgetTwo);
}

const Container = styled.div`
  width: 100%;
  height: 900px;
  max-height: 900px;
  box-sizing: border-box;
`;

storiesOf('ui/Layout', module)
  .addParameters({
    metadata: {
      author: 'CSSSR',
      status: 'Approved',
      link: {
        href: 'https://github.com/gpn-prototypes/vega-ui/tree/master/packages/components/layout',
        text: 'Документация',
      },
    },
  })
  .add('по умолчанию', () => {
    return (
      <Container>
        <Layout widgets={widgets} onChange={action('onChange')} />
      </Container>
    );
  });
