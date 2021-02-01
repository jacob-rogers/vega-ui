import { renderHook } from '@testing-library/react-hooks';

import { useInterval, useTimeout } from './use-timers';

beforeEach(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

describe.each([
  ['useTimeout', useTimeout],
  ['useInterval', useInterval],
])('useTask/%s', (name, hook) => {
  test('вызывает callback по таймауту', () => {
    const callback = jest.fn();
    renderHook(() => hook(100, callback));

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(100);

    expect(callback).toBeCalledTimes(1);
  });

  test('перерендер не сбрасывает таймаут', () => {
    const callback = jest.fn();
    const { rerender } = renderHook(() => hook(100, callback));

    jest.advanceTimersByTime(50);
    rerender();
    jest.advanceTimersByTime(50);

    expect(callback).toBeCalledTimes(1);
  });

  test('смена таймаута отменяет предыдущую задачу', () => {
    const callback = jest.fn();
    const { rerender } = renderHook((props) => hook(props.timeout, callback), {
      initialProps: {
        timeout: 100,
      },
    });

    jest.advanceTimersByTime(50);
    rerender({ timeout: 200 });
    jest.advanceTimersByTime(50);

    expect(callback).toBeCalledTimes(0);

    jest.advanceTimersByTime(150);
    expect(callback).toBeCalledTimes(1);
  });

  test('ручная отмена', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => hook(100, callback));

    result.current.clear();
    jest.advanceTimersByTime(100);

    expect(callback).toBeCalledTimes(0);
  });

  test('повторная ручная отмена не имеет эффекта', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => hook(100, callback));

    result.current.clear();
    result.current.clear();
    jest.advanceTimersByTime(100);

    expect(callback).toBeCalledTimes(0);
  });

  test('отмена при unmount', () => {
    const callback = jest.fn();
    const { unmount } = renderHook(() => hook(100, callback));

    unmount();
    jest.advanceTimersByTime(100);

    expect(callback).toBeCalledTimes(0);
  });

  test('отмена при ручном старте', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => hook(100, callback));

    jest.advanceTimersByTime(99);
    result.current.start();
    jest.advanceTimersByTime(100);
    expect(callback).toBeCalledTimes(1);
  });

  test('перезапуск', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => hook(100, callback));

    jest.advanceTimersByTime(100);
    result.current.restart();
    jest.advanceTimersByTime(100);

    expect(callback).toBeCalledTimes(2);
  });

  test('ручной запуск', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => hook(100, callback, { autostart: false }));

    jest.advanceTimersByTime(100);
    expect(callback).toBeCalledTimes(0);

    result.current.start();

    jest.advanceTimersByTime(100);
    expect(callback).toBeCalledTimes(1);
  });

  test('включение autostart запускает таймер', () => {
    const callback = jest.fn();
    const { rerender } = renderHook(({ autostart }) => hook(100, callback, { autostart }), {
      initialProps: { autostart: false },
    });

    jest.advanceTimersByTime(100);
    expect(callback).toBeCalledTimes(0);

    rerender({ autostart: true });
    jest.advanceTimersByTime(100);

    expect(callback).toBeCalledTimes(1);
  });

  test('смена callback не сбрасывает таймер', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const { rerender } = renderHook(({ callback }) => hook(100, callback), {
      initialProps: { callback: callback1 },
    });

    jest.advanceTimersByTime(50);
    rerender({ callback: callback2 });
    jest.advanceTimersByTime(50);

    expect(callback1).not.toBeCalled();
    expect(callback2).toBeCalledTimes(1);
  });

  test('вызов flush запускает callback и отменяет задачу', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => hook(100, callback));

    result.current.flush();
    expect(callback).toBeCalledTimes(1);
    jest.advanceTimersByTime(100);
    expect(callback).toBeCalledTimes(1);
  });

  test('бесконечный таймаут не имеет эффекта', () => {
    const callback = jest.fn();
    renderHook(() => hook(Infinity, callback));

    jest.advanceTimersByTime(1);

    expect(callback).toBeCalledTimes(0);
  });
});

describe('useInterval', () => {
  test('callback вызывается повторно', () => {
    const callback = jest.fn();
    renderHook(() => useInterval(100, callback));

    jest.advanceTimersByTime(200);
    expect(callback).toBeCalledTimes(2);
  });
});
