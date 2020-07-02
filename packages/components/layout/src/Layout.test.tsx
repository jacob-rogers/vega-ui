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

  test('корректно определяются resizeDirection у Layout.Window', () => {
    render(
      <Layout columns={[60, 40]}>
        <Layout.Window />
      </Layout>,
    );
  });

  test.todo('получаем варнинг, если в детей передан не Layout.Window');
  test.todo('игнорируются rows, если передан один ребенок');
  test.todo('игнорируются columns, если передан один ребенок');
  test.todo('нельзя передать больше одного ребенка, и не указать rows или columns');
  test.todo('нельзя одновременно передать rows и columns');
  test.todo('сумма rows не больше 100');
  test.todo('сумма columns не больше 100');
});

describe('Layout.Window', () => {
  test.todo('получаем варнинг, если не является потомком Layout');
  test.todo('получаем варнинг, если пытаемся передать контент без Layout.Body или Layout.Header');
});

describe('Layout.Body', () => {
  test.todo('получаем варнинг, если не является потомком Layout.Window');
});

describe('Layout.Header', () => {
  test.todo('получаем варнинг, если не является потомком Layout.Window');
});
