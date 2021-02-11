import { act, renderHook } from '@testing-library/react-hooks';

import { useModal } from './use-modal';

describe('use-modal', () => {
  test('isOpen принимает значение initialOpen', () => {
    const { result } = renderHook(() => useModal({ initialOpen: true }));

    expect(result.current.isOpen).toBe(true);
  });

  test('при вызове open isOpen становится true', () => {
    const { result } = renderHook(() => useModal());

    expect(result.current.isOpen).not.toBeTruthy();

    act(() => {
      result.current.open();
    });

    expect(result.current.isOpen).toBeTruthy();
  });

  test('при вызове close isOpen становится false', () => {
    const { result } = renderHook(() => useModal({ initialOpen: true }));

    expect(result.current.isOpen).toBeTruthy();

    act(() => {
      result.current.close();
    });

    expect(result.current.isOpen).not.toBeTruthy();
  });
});
