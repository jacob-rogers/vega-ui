import { SplitView } from './SplitView';
import { Tree } from './Tree';

describe('SplitView', () => {
  test('возвращает ошибку если невозможно создать SplitView', () => {
    const tree = Tree.create();
    expect(() => new SplitView(1, tree, { notify: jest.fn() })).toThrow(
      'Невозможно создать SplitView. По индексу "1" получено несовместимое значение',
    );
  });
});
