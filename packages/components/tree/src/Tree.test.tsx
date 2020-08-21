import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { Tree } from './Tree';
import {RootTreeProps} from "./types";

function renderComponent(props?: RootTreeProps): RenderResult {
  return render(<Tree {...props} />);
}

describe('Tree', () => {
  test('рендерится без ошибок', () => {
    renderComponent({});
  });
});
