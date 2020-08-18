import { EffectCallback, useEffect } from 'react';

export function useOnChange<T>(value: T, fn: EffectCallback): void {
  useEffect(fn, [value]);
}
