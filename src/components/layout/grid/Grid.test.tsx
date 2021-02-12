import { DataView } from './DataView';
import { Grid } from './Grid';
import { Node } from './Node';
import { SplitView } from './SplitView';

const widget = {
  name: 'widget',
  component: '<div />',
};

describe('Grid', () => {
  let grid: Grid;

  beforeEach(() => {
    grid = Grid.create({
      0: Node.createLeaf({ widget: widget?.component }),
    });
  });

  test('возвращает ошибку об отсутствии элемента с заданным индексом', () => {
    expect(() => grid.get(1)).toThrow('Элемента с индексом "1" не существует');
  });

  test('удаляются слушатели', () => {
    const listener = jest.fn();

    const listenerUnsubscribe = grid.addListener(listener);

    listenerUnsubscribe();

    const dv = grid.get(0) as DataView;
    dv.split('up');

    expect(listener).not.toBeCalled();

    grid.addListener(listener);
    const sv = grid.get(0) as SplitView;

    grid.removeAllListeners();
    sv.setBreakpoint(0);

    expect(listener).not.toBeCalled();
  });
});
