import { renderHook } from '@testing-library/react-hooks';

import { TreeItem } from '../types';
import { useCheckedItems } from '../use-checked-items';

describe('use-checked-items', () => {
  const nodeList: TreeItem[] = [
    {
      name: '1',
      id: '1',
      nodeList: [
        {
          name: '2',
          id: '2',
          nodeList: [],
        },
        {
          name: '3',
          id: '3',
          nodeList: [],
        },
      ],
    },
  ];
  test('элемент добовляется в список выбранных', () => {
    const mockedItems = ['2'];
    const { result } = renderHook(() => useCheckedItems(nodeList, mockedItems));

    expect(result.current.checkedItems).toEqual(['2']);
  });
  test('при выборе parent выбираются все дочерние элементы', () => {
    const mockedItems = ['1'];
    const { result } = renderHook(() => useCheckedItems(nodeList, mockedItems));
    expect(result.current.checkedItems).toEqual(['1', '2', '3']);
  });
  test('если помечены все дочерные элементы, помечается родитель', () => {
    const mockedItems = ['2', '3'];
    const { result } = renderHook(() => useCheckedItems(nodeList, mockedItems));

    expect(result.current.checkedItems.length).not.toBe(2);
  });
});
