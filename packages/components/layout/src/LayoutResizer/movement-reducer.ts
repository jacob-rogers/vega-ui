export type State = {
  isActive: boolean;
  width: number; // ширина контейнера с разделителем (или высота, зависит от ориентации разделения)
  position: number; // положение разделителя в пикселях
  pointer: number; // положение курсора против оси разделителя в пикселях
};

export type Action =
  | { type: 'start'; pointer: number; width: number }
  | { type: 'move'; pointer: number }
  | { type: 'end'; pointer: number }
  | { type: 'set-position'; position: number }
  | { type: 'set-width'; width: number };

class UnreachableCaseError extends Error {
  constructor(value: never) {
    super(`Необработаное действие: ${value}`);
  }
}

const clamp = (min: number, max: number, n: number): number => Math.min(max, Math.max(min, n));

export function movementReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'start':
      return {
        ...state,
        isActive: true,
        pointer: action.pointer,
        width: action.width,
      };
    case 'move': {
      const delta = state.pointer - action.pointer;
      const position = clamp(0, state.width, state.position - delta);
      const pointer = action.pointer + (position - (state.position - delta));

      if (state.position === position) {
        return state;
      }

      return {
        ...state,
        pointer,
        position,
      };
    }
    case 'end':
      return {
        ...state,
        isActive: false,
        pointer: 0,
      };

    case 'set-position': {
      if (state.position === action.position) {
        return state;
      }

      return {
        ...state,
        position: clamp(0, state.width, action.position),
      };
    }
    case 'set-width': {
      if (state.width === action.width) {
        return state;
      }

      return {
        ...state,
        width: action.width,
      };
    }
    default:
      throw new UnreachableCaseError(action);
  }
}
