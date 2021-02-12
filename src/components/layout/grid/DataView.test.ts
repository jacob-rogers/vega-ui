import { DataView } from './DataView';
import { Tree } from './Tree';

describe('DataView', () => {
  test('возвращает ошибку если невозможно создать DataView', () => {
    const tree = Tree.create();
    expect(() => new DataView(1, tree, { notify: jest.fn() })).toThrow(
      'Невозможно создать DataView. По индексу "1" получено несовместимое значение',
    );
  });
});
