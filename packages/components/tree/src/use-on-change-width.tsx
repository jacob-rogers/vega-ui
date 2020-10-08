import React, { useEffect, useMemo, useState } from 'react';

type ContainerWidth = number;

export function useOnChangeTreeWidth(
  targetRef: React.RefObject<HTMLElement>,
): ContainerWidth | undefined {
  const [treeContainerWidth, setWidth] = useState<ContainerWidth>();

  const ro = useMemo(
    () =>
      new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          setWidth(entry.contentRect.width);
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

  return treeContainerWidth;
}
