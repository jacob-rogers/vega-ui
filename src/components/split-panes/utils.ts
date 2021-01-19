type Unit = 'px' | '%' | 'ratio';

const round = (num: number): number => Math.round((num + Number.EPSILON) * 100) / 100;

export function getUnit(size: string | number): Unit {
  if (typeof size === 'string') {
    if (size.endsWith('%')) {
      return '%';
    }

    if (size.endsWith('px')) {
      return 'px';
    }
  }

  return 'ratio';
}

export function toPx(value: string, size: number, unit: Unit = 'px'): number {
  switch (unit) {
    case '%':
      return round((size * Number(value)) / 100);
    default:
      return Number(value);
  }
}

export function convertSizeToCSSValue(value: string, resizersSize?: number): string {
  if (getUnit(value) !== '%') {
    return value;
  }

  if (resizersSize === undefined) {
    return value;
  }

  const idx = value.search('%');
  const percent = Number(value.slice(0, idx)) / 100;

  if (percent === 0) {
    return value;
  }

  return `calc(${value} - ${resizersSize}px * ${percent})`;
}

export function convertToUnit(size: number, unit: Unit, containerSize = 0): string {
  switch (unit) {
    case '%':
      return `${round((size / containerSize) * 100)}%`;

    case 'px':
      return `${round(size)}px`;

    case 'ratio':
      return (size * 100).toFixed(0);

    default:
      throw new Error(`Неизвестный unit "${unit}"`);
  }
}

export function convert(input: string, size: number): number {
  const tokens = input.match(/([0-9]+)([px|%]*)/);

  if (tokens === null) {
    throw new Error('Некорректное входное значение');
  }

  const value = tokens[1];
  const unit = tokens[2] as Unit;
  return toPx(value, Number(size), unit);
}
