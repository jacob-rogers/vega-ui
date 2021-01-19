import * as utils from './utils';

describe('getUnit', () => {
  test.each`
    size      | unit
    ${'0%'}   | ${'%'}
    ${'100%'} | ${'%'}
    ${'0px'}  | ${'px'}
    ${'10px'} | ${'px'}
    ${'0'}    | ${'ratio'}
    ${0}      | ${'ratio'}
    ${''}     | ${'ratio'}
  `('getUnit($size) = $unit', ({ size, unit }) => {
    expect(utils.getUnit(size)).toBe(unit);
  });
});

describe('convert', () => {
  test.each([[''], ['%'], ['px']])(
    'падает с ошибкой для некорректного входного значения %p',
    (input) => {
      expect(() => utils.convert(input, 0)).toThrow();
    },
  );

  test.each([
    ['100%', 200],
    ['50%', 100],
    ['0%', 0],
    ['1', 1],
    ['50', 50],
    ['1px', 1],
  ])('convert(%p) = %p', (input, expected) => {
    expect(utils.convert(input, 200)).toBe(expected);
  });
});

describe('convertToUnit', () => {
  test('падает с ошибкой, если передан некорректный unit', () => {
    // @ts-expect-error: специально передан неправильный тип аргумента
    expect(() => utils.convertToUnit(1, 'foo')).toThrow();
  });

  test.each<[number, 'px' | '%' | 'ratio', string]>([
    [100, 'px', '100px'],
    [20, '%', '10%'],
    [10.12345, 'ratio', '1012'],
  ])('convertToUnit(%d, %p, 200) = %s', (size, unit, expected) => {
    expect(utils.convertToUnit(size, unit, 200)).toBe(expected);
  });
});

describe('convertSizeToCSSValue', () => {
  test.each([
    ['1px', undefined, '1px'],
    ['0%', 1, '0%'],
    ['100%', undefined, '100%'],
    ['50%', 2, 'calc(50% - 2px * 0.5)'],
  ])('convertSizeToCSSValue(%s, %p) = %p', (value, resizersSize, expected) => {
    expect(utils.convertSizeToCSSValue(value, resizersSize)).toBe(expected);
  });
});

describe('toPx', () => {
  test.each<[string, number, '%' | 'px' | 'ratio', number]>([
    ['50', 200, '%', 100],
    ['50', 200, 'px', 50],
    ['50', 200, 'ratio', 50],
  ])('toPx(%p, %s, %p) = %p', (value, size, unit, expected) => {
    expect(utils.toPx(value, size, unit)).toBe(expected);
  });
});
