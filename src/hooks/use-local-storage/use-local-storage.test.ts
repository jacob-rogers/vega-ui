import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { useLocalStorage } from './use-local-storage';

const DEFAULT_VALUE = 'default-value';
const KEY = 'key';

afterEach(() => {
  localStorage.clear();
});

const storageEvent = new StorageEvent('storage', {
  key: KEY,
  newValue: JSON.stringify('new-value'),
  storageArea: localStorage,
});

describe('use-local-storage', () => {
  test('возвращает значение по умолчанию', () => {
    const { result } = renderHook(() => useLocalStorage(KEY, DEFAULT_VALUE));

    const [value] = result.current;

    expect(value).toBe(DEFAULT_VALUE);
  });

  test('записывает новое значение', () => {
    const { result } = renderHook(() => useLocalStorage(KEY, DEFAULT_VALUE));

    const [, setValue] = result.current;

    act(() => {
      setValue('new-value');
    });

    expect(localStorage.getItem(KEY)).toBe(JSON.stringify('new-value'));

    const [value] = result.current;

    expect(value).toBe('new-value');
  });

  test('реагирует на событие storage', () => {
    const { result } = renderHook(() => useLocalStorage(KEY, DEFAULT_VALUE));

    act(() => {
      global.dispatchEvent(storageEvent);
    });

    const [value] = result.current;

    expect(value).toBe('new-value');
  });

  test('при анмаунте не реагирует на событие storage', () => {
    const { result, unmount } = renderHook(() => useLocalStorage(KEY, DEFAULT_VALUE));

    unmount();

    act(() => {
      global.dispatchEvent(storageEvent);
    });

    const [value] = result.current;

    expect(value).toBe(DEFAULT_VALUE);
  });

  test('при ошибке парсинга значения из localStorage вернет дефолтное значение', () => {
    localStorage.setItem(KEY, '{');

    const { result } = renderHook(() => useLocalStorage(KEY, DEFAULT_VALUE));

    const [value] = result.current;

    expect(value).toBe(DEFAULT_VALUE);
  });

  test('если в сеттер передать функцию, то в storage сохранится результат её выполнения над текущим значением', () => {
    const { result } = renderHook(() => useLocalStorage(KEY, 1));

    const [, setValue] = result.current;

    act(() => {
      setValue((v) => {
        return v + 4;
      });
    });

    const [value] = result.current;

    expect(value).toBe(5);
  });
});
