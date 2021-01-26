import React, { useEffect, useMemo, useState } from 'react';

type ElementSize = {
  width?: number;
  height?: number;
};

export function useResizeObserver(targetRef: React.RefObject<HTMLElement>): ElementSize {
  const [elementSize, setSize] = useState<ElementSize>({
    width: undefined,
    height: undefined,
  });

  const ro = useMemo(
    () =>
      new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          const { width, height } = entry.contentRect;

          setSize({ width, height });
        });
      }),
    [],
  );

  useEffect(() => {
    const { current } = targetRef;

    if (current instanceof Element) {
      ro.observe(current);
    }

    return (): void => {
      if (current instanceof Element) {
        ro.unobserve(current);
      }
    };
  }, [targetRef, ro]);

  return elementSize;
}
