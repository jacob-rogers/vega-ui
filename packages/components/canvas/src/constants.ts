import { ItemType } from './types';

export const STEP_WIDTH = 250;
export const STEP_HEIGHT = 40;
export const STEP_PADDING = 26;
export const LIST_PADDING = 12;

export const sizes = {
  STEP_HEIGHT,
  STEP_WIDTH,
  STEP_PADDING,
  LIST_PADDING,
};

export const CONNECTOR_DEFAULT_COLOR = 'rgba(255, 255, 255, 0.2)';
export const CONNECTOR_HOVER_COLOR = '#fff';
export const DEFAULT_LINE_COLOR = '#fff';
export const SELECTED_COLOR = '#0078D2';

export const colors = {
  CONNECTOR_DEFAULT_COLOR,
  CONNECTOR_HOVER_COLOR,
  DEFAULT_LINE_COLOR,
  SELECTED_COLOR,
};

export const SCROLL_PADDING = 10;
export const SCROLL_RATIO = 1.04;
export const PINNING_KEY_CODE = 'Space';
export const GRID_BLOCK_SIZE = 116; // Элемент сетки - квадрат со стороной 116px

export const NAMES_MAP: Record<ItemType, string> = {
  step: 'Шаг',
  root: 'Начало',
  end: 'Конец',
};
