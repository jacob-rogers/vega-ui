import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { Layout, LayoutProps } from './Layout';

function renderComponent(props?: LayoutProps): RenderResult {
  return render(
    <Layout {...props}>
      <Layout.Window>
        <Layout.Header />
        <Layout.Body />
      </Layout.Window>
    </Layout>,
  );
}

describe('Layout', () => {
  test('рендерится без ошибок', () => {
    renderComponent();
  });
});
