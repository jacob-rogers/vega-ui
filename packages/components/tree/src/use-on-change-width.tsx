import React, { useEffect, useState } from 'react';

type WidthContainer = string | number | undefined;

export function useOnChangeTreeWidth(
  rootRef: React.RefObject<HTMLDivElement | null>,
): WidthContainer {
  const [treeContainerWidth, setWidth] = useState<WidthContainer>();

  useEffect(() => {
    const updateWidth = (): void => {
      setWidth(rootRef?.current?.getBoundingClientRect().width);
    };

    updateWidth();

    window.addEventListener('resize', updateWidth);

    return (): void => window.removeEventListener('resize', updateWidth);
  }, [rootRef]);

  return treeContainerWidth;
}
