import { act, renderHook } from '@testing-library/react-hooks';

import { ActionType, State, useSidebar } from './use-sidebar';

type TestData = [string, { action: ActionType; state: boolean }];

type StateKeys = keyof State;

type Data = Record<StateKeys, TestData[]>;

const initialData: Data = {
  isOpen: [
    ['open открывает сайдбар', { action: ActionType.open, state: false }],
    ['close закрывает сайдбар', { action: ActionType.close, state: true }],
  ],
  isMinimized: [
    ['minimize сворачивает сайдбар', { action: ActionType.minimize, state: false }],
    ['maximize разворачивает сайдбар', { action: ActionType.maximize, state: true }],
  ],
};

const testCases = Object.keys(initialData) as StateKeys[];

describe('use-sidebar', () => {
  describe.each(testCases)('%s', (testCase) => {
    const tests = initialData[testCase];

    test.each(tests)('%s', (_, data) => {
      const { result } = renderHook(() => useSidebar({ [testCase]: data.state }));

      act(() => {
        result.current[data.action]();
      });

      expect(result.current.state[testCase]).toBe(!data.state);
    });
  });

  test('задает дефолтные значения стейта', () => {
    const { result } = renderHook(() => useSidebar());

    expect(result.current.state).toEqual({ isOpen: false, isMinimized: false });
  });
});
