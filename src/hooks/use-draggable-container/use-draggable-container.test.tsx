import {
  ActionReducer,
  getOffsetToScroll,
  movementReducer,
  State,
} from './use-draggable-container';

describe('movementReducer', () => {
  const initialState: State = {
    current: 0,
    dir: 'left',
    offset: 0,
    startX: 0,
    startOffset: 0,
    isActive: false,
    isLeftLimit: true,
    isRightLimit: false,
    tabListWidth: 0,
    type: 'force',
  };

  const width = {
    actual: 200,
    visible: 100,
  };

  function start(x: number): ActionReducer {
    return {
      type: 'start',
      width,
      x,
    };
  }

  function move(x: number): ActionReducer {
    return {
      type: 'move',
      width,
      x,
    };
  }

  function end(x: number): ActionReducer {
    return {
      type: 'end',
      width,
      x,
    };
  }

  describe('dir', () => {
    test('right', () => {
      const state = [start(0), move(1), move(2)].reduce(movementReducer, initialState);
      expect(state.dir).toBe('right');
    });

    test('left', () => {
      const state = [start(0), move(-1), move(-2)].reduce(movementReducer, initialState);
      expect(state.dir).toBe('left');
    });

    test('null', () => {
      const state = [start(0), move(-1), move(-2), end(-2)].reduce(movementReducer, initialState);
      expect(state.dir).toBe(null);
    });
  });

  describe('offset', () => {
    test('перемещение вправо', () => {
      const state = [start(0), move(1), end(1)].reduce(movementReducer, initialState);
      expect(state.offset).toBe(0);
    });

    test('перемещение влево', () => {
      let state = [start(0), move(-1), end(-1)].reduce(movementReducer, initialState);
      expect(state.offset).toBe(-1);
      state = [start(0), move(-1), end(-1), start(-4), move(-5), move(-6), end(-6)].reduce(
        movementReducer,
        initialState,
      );

      expect(state.offset).toBe(-3);
    });

    test('ограничение offset шириной элемента', () => {
      const state = [start(0), move(-101), end(-101)].reduce(movementReducer, initialState);
      expect(state.offset).toBe(-100);
    });

    test('установка нужного offset', () => {
      let state = movementReducer(initialState, { type: 'force', offset: -200, width });
      expect(state.offset).toBe(-100);

      state = movementReducer(initialState, { type: 'force', offset: 200, width });
      expect(state.offset).toBe(0);
    });
  });

  test('isActive', () => {
    let state = movementReducer(initialState, start(0));
    expect(state.isActive).toBe(true);

    state = movementReducer(state, move(-1));
    expect(state.isActive).toBe(true);

    state = movementReducer(state, end(-1));
    expect(state.isActive).toBe(false);
  });

  describe('limits', () => {
    test('isLeftLimit', () => {
      let state = [start(0)].reduce(movementReducer, initialState);
      expect(state.isLeftLimit).toBe(true);

      state = [start(0), move(-200), end(-200)].reduce(movementReducer, initialState);
      expect(state.isLeftLimit).toBe(false);
    });

    test('isRightLimit', () => {
      let state = movementReducer(initialState, { type: 'force', offset: -200, width });
      expect(state.isRightLimit).toBe(true);

      state = [move(0), end(0)].reduce(movementReducer, initialState);
      expect(state.isRightLimit).toBe(false);
    });
  });

  test('getNextOffset', () => {
    const wrapperWidth = { actual: 300, visible: 100 };
    const state = movementReducer(initialState, {
      type: 'force',
      offset: -75,
      width: wrapperWidth,
    });

    const nextOffsetLeft = getOffsetToScroll({ dir: 'left', wrapperWidth, state });
    expect(nextOffsetLeft).toBe(0);

    const nextOffsetRight = getOffsetToScroll({ dir: 'right', wrapperWidth, state });
    expect(nextOffsetRight).toBe(-87); // offset + visible - buttonScrollWidth*2
  });
});
