import { useEffect, useMemo, useState } from 'react';

type ContainerWidth = number;

export function useOnChangeTreeWidth(className: string): ContainerWidth | undefined {
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
    const root = document.querySelector(`.${className}`);

    if (root instanceof Element) {
      ro.observe(root);
    }

    return (): void => {
      if (root instanceof Element) {
        ro.unobserve(root);
      }
    };
  }, [className, ro]);

  return treeContainerWidth;
}
