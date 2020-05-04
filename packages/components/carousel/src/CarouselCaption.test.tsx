import React from 'react';
import * as tl from '@testing-library/react';

import { CarouselCaptionView as CarouselCaption } from './CarouselCaption';

describe('CarouselCaption', () => {
  type Props = Partial<React.ComponentProps<typeof CarouselCaption>>;

  const caption = 'test caption';

  function render(props: Props = {}): tl.RenderResult {
    return tl.render(<CarouselCaption caption={caption} {...props} />);
  }

  function findCaption(value = caption): HTMLElement {
    return tl.screen.getByText(value);
  }

  test('рендерится без ошибок', () => {
    expect(render).not.toThrow();
  });

  test('ничего не рендерится, если не передан caption', () => {
    const { container } = render({ caption: undefined });
    expect(container.firstChild).toBe(null);
  });

  test('выводится caption', () => {
    render();
    expect(findCaption()).toBeInTheDocument();
  });

  test('передается className', () => {
    const className = 'test';
    render({ className });
    expect(findCaption().classList.contains(className)).toBe(true);
  });
});
