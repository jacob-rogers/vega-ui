import React, { useLayoutEffect, useState } from 'react';

type ContainerWidth = number;

export function useOnChangeTreeWidth(
  rootRef: React.RefObject<HTMLDivElement | null>,
): ContainerWidth | undefined {
  const [treeContainerWidth, setWidth] = useState<ContainerWidth>();

  const { current } = rootRef;

  useLayoutEffect(() => {
    const updateWidth = (): void => {
      setWidth(rootRef.current?.getBoundingClientRect().width);
    };

    updateWidth();

    window.addEventListener('resize', updateWidth);

    return (): void => window.removeEventListener('resize', updateWidth);
    // [rootRef, current] - для работоспособности важны обе зависимости, так как current до первого рендера - null,
    // а ссылка объекта rootRef не изменяется.
  }, [rootRef, current]);

  return treeContainerWidth;
}
