import { act, renderHook } from '@testing-library/react-hooks';

import { StateSaverService } from './entities/StateSaverService';
import { HiddenItem } from './types';
import { useHiddenItems } from './use-hidden-items';

describe('useHiddenItems', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  const mockItem = { id: 'mock id', ref: { current: null } } as HiddenItem;

  test('восстановление состояния сохраненного скрытого элемента', () => {
    const stateSaverService = new StateSaverService();
    stateSaverService.setHiddenElements([mockItem.id]);

    const { result } = renderHook(() => useHiddenItems());

    expect(result.current.hiddenItems).toEqual([]);

    act(() => {
      result.current.handleRestoreHiddenItem(mockItem);
    });

    expect(result.current.hiddenItems).toEqual([mockItem]);
  });

  test('элемент добавляется в список скрытых', () => {
    const stateSaverService = new StateSaverService();
    expect(stateSaverService.getHiddenElements()).toEqual([]);

    const { result } = renderHook(() => useHiddenItems());

    expect(result.current.hiddenItems).toEqual([]);

    act(() => {
      result.current.handleHideItem(mockItem, jest.fn());
    });

    expect(result.current.hiddenItems).toEqual([mockItem]);
    expect(stateSaverService.getHiddenElements()).toEqual([mockItem.id]);
  });

  test('элемент удаляется из списока скрытых', () => {
    const stateSaverService = new StateSaverService();
    expect(stateSaverService.getHiddenElements()).toEqual([]);

    const { result } = renderHook(() => useHiddenItems());

    expect(result.current.hiddenItems).toEqual([]);

    act(() => {
      result.current.handleHideItem(mockItem, jest.fn());
    });

    expect(result.current.hiddenItems).toEqual([mockItem]);
    expect(stateSaverService.getHiddenElements()).toEqual([mockItem.id]);

    act(() => {
      result.current.handleHideItem(mockItem, jest.fn());
    });

    expect(result.current.hiddenItems).toEqual([]);
    expect(stateSaverService.getHiddenElements()).toEqual([]);
  });
});
