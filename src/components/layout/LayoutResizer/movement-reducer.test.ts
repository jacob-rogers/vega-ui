import { Action, movementReducer, State } from './movement-reducer';

describe('movementReducer', () => {
  const initialState: State = {
    isActive: false,
    pointer: 0,
    position: 0,
    width: 0,
  };

  test('должен выполниться с ошибкой, если передано неизвестное действие', () => {
    // @ts-expect-error: TODO добавить причину исключения
    expect(() => movementReducer(initialState, { type: 'unknown' })).toThrow();
  });

  test('переходит в активное состояние при начале перемещения', () => {
    expect(movementReducer(initialState, { type: 'start', pointer: 0, width: 0 }).isActive).toBe(
      true,
    );
  });

  test('выходит из активного состояния при завершении перемещения', () => {
    expect(movementReducer(initialState, { type: 'end', pointer: 0 }).isActive).toBe(false);
  });

  test('уставновка положения ресайзера не обновляет состояние, если оно не отличается', () => {
    expect(
      movementReducer(initialState, { type: 'set-position', position: initialState.position }),
    ).toBe(initialState);
  });

  test('уставновка ширины не обновляет состояние, если оно не отличается', () => {
    expect(movementReducer(initialState, { type: 'set-width', width: initialState.width })).toBe(
      initialState,
    );
  });

  test('положение ресайзера не должно выходить за границы ширины', () => {
    const width = 100;
    let actions: Action[] = [
      { type: 'start', width, pointer: 3 },
      { type: 'move', pointer: 2 },
      { type: 'move', pointer: 1 },
      { type: 'move', pointer: 0 },
      { type: 'end', pointer: 0 },
    ];

    let state = actions.reduce(movementReducer, { ...initialState, width, position: 0 });

    expect(state.position).toBe(0);

    actions = [
      { type: 'start', width, pointer: 0 },
      { type: 'move', pointer: 1 },
      { type: 'move', pointer: 2 },
      { type: 'move', pointer: 3 },
      { type: 'end', pointer: 3 },
    ];

    state = actions.reduce(movementReducer, { ...initialState, width, position: 99 });

    expect(state.position).toBe(100);
  });
});
