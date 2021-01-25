import { renderHook } from '@testing-library/react-hooks';

import { useOnChange } from './use-on-change';

describe('useOnChange', () => {
  test('вызывает обработчик при смене значения', () => {
    const onChange = jest.fn();

    const { rerender } = renderHook((props) => useOnChange(props.value, props.onChange), {
      initialProps: {
        value: 1,
        onChange,
      },
    });

    expect(onChange).toBeCalledTimes(1);

    rerender({ value: 2, onChange });

    expect(onChange).toBeCalledTimes(2);
  });

  test('обработчик не вызывается, если значение не изменилось', () => {
    const onChange = jest.fn();

    const { rerender } = renderHook((props) => useOnChange(props.value, props.onChange), {
      initialProps: {
        value: 1,
        onChange,
      },
    });

    expect(onChange).toBeCalledTimes(1);

    rerender({ value: 1, onChange });

    expect(onChange).toBeCalledTimes(1);
  });

  test('смена обработчика не повторяет его вызов', () => {
    const onChange1 = jest.fn();
    const onChange2 = jest.fn();

    const { rerender } = renderHook((props) => useOnChange(props.value, props.onChange), {
      initialProps: {
        value: 1,
        onChange: onChange1,
      },
    });

    expect(onChange1).toBeCalledTimes(1);

    rerender({ value: 1, onChange: onChange2 });

    expect(onChange1).toBeCalledTimes(1);
    expect(onChange2).toBeCalledTimes(0);
  });

  test('при смене обработчика вызывается логика отмены предыдущего обработчика', () => {
    const teardown = jest.fn();
    const onChange1 = jest.fn(() => teardown);
    const onChange2 = jest.fn();

    const { rerender } = renderHook((props) => useOnChange(props.value, props.onChange), {
      initialProps: {
        value: 1,
        onChange: onChange1,
      },
    });

    rerender({ value: 2, onChange: onChange2 });

    expect(teardown).toBeCalledTimes(1);
  });
});
