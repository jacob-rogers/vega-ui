import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { Appearance, AppearanceProps } from './Appearance';
import { Base, BaseProps } from './Base';

function renderAppearance(props: AppearanceProps): RenderResult {
  return render(
    <Appearance {...props}>
      <div>Элемент</div>
    </Appearance>,
  );
}

function renderBase(props: BaseProps): RenderResult {
  return render(
    <Base {...props}>
      <div>Элемент</div>
    </Base>,
  );
}

describe('Animation', () => {
  describe('Appearance', () => {
    it('рендерит без ошибок', () => {
      renderAppearance({ in: true, side: 'right' });
    });
  });
  describe('Base', () => {
    it('рендерит без ошибок', () => {
      renderBase({ in: true, timeout: 300, cssTransitionClassNames: {} });
    });
  });
});
