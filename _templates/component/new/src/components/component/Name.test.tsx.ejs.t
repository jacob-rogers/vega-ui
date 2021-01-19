---
to: src/components/<%= name %>/<%= h.changeCase.pascal(name) %>.test.tsx
---
import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { <%= h.changeCase.pascal(name) %>, <%= h.changeCase.pascal(name) %>Props } from './<%= h.changeCase.pascal(name) %>';

function renderComponent(props?: <%= h.changeCase.pascal(name) %>Props): RenderResult {
  return render(<<%= h.changeCase.pascal(name) %> {...props} />);
}

describe('<%= h.changeCase.pascal(name) %>', () => {
  test('рендерится без ошибок', () => {
    renderComponent({ title: 'Test' });
  });
});
