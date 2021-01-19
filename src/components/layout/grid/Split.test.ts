import { Split, SplitDirection, SplitOrientation } from './Split';

describe('Split', () => {
  describe('getOrientation', () => {
    test.each<[SplitDirection, SplitOrientation]>([
      ['up', 'vertical'],
      ['down', 'vertical'],
      ['left', 'horizontal'],
      ['right', 'horizontal'],
    ])('по направлению "%s" выводит ориентацию "%s"', (direction, orientation) => {
      const split = Split.of(direction);
      expect(split.getOrientation()).toBe(orientation);
    });
  });

  test('isVertical', () => {
    expect(Split.of('up').isVertical()).toBe(true);
    expect(Split.of('down').isVertical()).toBe(true);
    expect(Split.of('left').isVertical()).toBe(false);
    expect(Split.of('right').isVertical()).toBe(false);
  });

  test('isHorizontal', () => {
    expect(Split.of('up').isHorizontal()).toBe(false);
    expect(Split.of('down').isHorizontal()).toBe(false);
    expect(Split.of('left').isHorizontal()).toBe(true);
    expect(Split.of('right').isHorizontal()).toBe(true);
  });

  test('isBefore', () => {
    expect(Split.of('up').isBefore()).toBe(true);
    expect(Split.of('down').isBefore()).toBe(false);
    expect(Split.of('left').isBefore()).toBe(true);
    expect(Split.of('right').isBefore()).toBe(false);
  });

  test('isAfter', () => {
    expect(Split.of('up').isAfter()).toBe(false);
    expect(Split.of('down').isAfter()).toBe(true);
    expect(Split.of('left').isAfter()).toBe(false);
    expect(Split.of('right').isAfter()).toBe(true);
  });
});
