import { act, renderHook } from '@testing-library/react-hooks';

import { useResizeObserver } from './use-resize-observer';

describe('useResizeObserver', () => {
  const originalResizeObserver = global.ResizeObserver;
  const callback = jest.fn();
  const observe = jest.fn();
  const unobserve = jest.fn();

  function createRef<T>(value?: T): React.RefObject<T> {
    return { current: value ?? null };
  }

  afterAll(() => {
    Object.defineProperty(global, 'ResizeObserver', {
      value: originalResizeObserver,
    });
  });

  beforeAll(() => {
    Object.defineProperty(global, 'ResizeObserver', {
      value: class ResizeObserver {
        readonly entries: ResizeObserverEntry[];

        readonly elementEntryMap: Map<Element, ResizeObserverEntry>;

        readonly cb: ResizeObserverCallback;

        constructor(cb: ResizeObserverCallback) {
          this.elementEntryMap = new Map();
          this.entries = [];
          this.cb = cb;

          callback.mockImplementation(() => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            cb(this.entries, this as any);
          });
        }

        observe(element: Element) {
          observe(element);

          const entry = {
            contentRect: element.getBoundingClientRect(),
            target: element,
          } as ResizeObserverEntry;

          this.elementEntryMap.set(element, entry);
          this.entries.push(entry);
        }

        unobserve(element: Element) {
          unobserve(element);
          const entry = this.elementEntryMap.get(element);
          this.entries.splice(this.entries.indexOf(entry as ResizeObserverEntry), 1);
        }
      },
    });
  });

  beforeEach(() => {
    callback.mockReset();
    observe.mockReset();
    unobserve.mockReset();
  });

  test('возвращает значение по умолчанию', () => {
    const targetRef = createRef<HTMLElement>();
    const { result } = renderHook((props) => useResizeObserver(props.target), {
      initialProps: {
        target: targetRef,
      },
    });

    expect(result.current).toStrictEqual({
      width: undefined,
      height: undefined,
    });
  });

  test('если нет эелемента, то он не добавляется в ResizeObserver', () => {
    const targetRef = createRef<HTMLElement>();

    renderHook((props) => useResizeObserver(props.target), {
      initialProps: {
        target: targetRef,
      },
    });

    expect(observe).not.toBeCalled();
  });

  test('элемент добавляется в ResizeObserver', () => {
    const element = document.createElement('div');
    const targetRef = createRef(element);

    renderHook((props) => useResizeObserver(props.target), {
      initialProps: {
        target: targetRef,
      },
    });

    expect(observe).toBeCalledTimes(1);
    expect(observe).toBeCalledWith(element);
  });

  test('при замене элемента прошлый удаляется из ResizeObserver', () => {
    const element = document.createElement('div');
    const targetRef = createRef(element);

    const { rerender } = renderHook((props) => useResizeObserver(props.target), {
      initialProps: {
        target: targetRef,
      },
    });

    rerender({ target: createRef(document.createElement('div')) });

    expect(unobserve).toBeCalledWith(element);
  });

  test('возвращает размер элемента при ресайзе', async () => {
    const targetRef = createRef<HTMLElement>();

    const { result, rerender } = renderHook((props) => useResizeObserver(props.target), {
      initialProps: {
        target: targetRef,
      },
    });

    const element = document.createElement('div');
    const expected = {
      width: 100,
      height: 100,
    };

    element.getBoundingClientRect = () => expected as DOMRect;

    rerender({ target: { current: element } });

    act(() => {
      callback();
    });

    expect(result.current).toStrictEqual({
      width: 100,
      height: 100,
    });
  });
});
