import React from 'react';
import * as tl from '@testing-library/react';

import { CarouselArrowsView as CarouselArrows } from './CarouselArrows';
import { CarouselContext, defaultContext } from './context';

describe('CarouselArrows', () => {
  type Props = Partial<React.ComponentProps<typeof CarouselArrows>>;

  function render(props: Props = {}): tl.RenderResult {
    const { onNext = jest.fn(), onPrev = jest.fn(), ...rest } = props;
    return tl.render(
      <CarouselContext.Provider value={{ ...defaultContext, testId: 'Carousel' }}>
        <CarouselArrows
          prevLabel="prev"
          nextLabel="next"
          onNext={onNext}
          onPrev={onPrev}
          {...rest}
        />
      </CarouselContext.Provider>,
    );
  }

  function findPrev(): HTMLElement {
    return tl.screen.getByTitle('prev');
  }

  function findNext(): HTMLElement {
    return tl.screen.getByTitle('next');
  }

  test('рендерится без ошибок', () => {
    expect(render).not.toThrow();
  });

  test('вызывает onNext по клику', () => {
    const onNext = jest.fn();
    render({ onNext });
    tl.fireEvent.click(findNext());
    expect(onNext).toBeCalledTimes(1);
  });

  test('вызывает onPrev по клику', () => {
    const onPrev = jest.fn();
    render({ onPrev });
    tl.fireEvent.click(findPrev());
    expect(onPrev).toBeCalledTimes(1);
  });

  test('передаются классы для кнопок', () => {
    const prevClassName = 'prev-arrow';
    const nextClassName = 'next-arrow';

    render({ prevClassName, nextClassName });

    expect(findPrev()).toHaveClass(prevClassName);
    expect(findNext()).toHaveClass(nextClassName);
  });

  test('проставляются дефолтные лейблы', () => {
    render({ prevLabel: undefined, nextLabel: undefined });

    expect(tl.screen.queryByLabelText('Предыдущий слайд')).toBeInTheDocument();
    expect(tl.screen.queryByLabelText('Следующий слайд')).toBeInTheDocument();
  });
});
