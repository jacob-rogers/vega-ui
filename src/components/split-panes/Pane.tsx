import React from 'react';

import { cnSplitPanes } from './cn-split-panes';
import { PaneSettings, useSplitPanes } from './SplitPanesContext';
import * as utils from './utils';

type Ref<T> = null | React.RefObject<T> | React.RefCallback<T>;

function useCombinedRefs<T>(...refs: Ref<T>[]) {
  const targetRef = React.useRef<T>(null);

  React.useEffect(() => {
    refs.forEach((ref) => {
      if (ref === null) return;

      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        // @ts-expect-error: readonly
        ref.current = targetRef.current; // eslint-disable-line no-param-reassign
      }
    });
  }, [refs]);

  return targetRef;
}

interface PaneProps extends React.HTMLAttributes<HTMLElement> {
  initialSize?: string;
  min?: string;
  max?: string;
}

export const Pane = React.forwardRef<HTMLDivElement, PaneProps>((props, ref) => {
  const { initialSize = '1', min = '0', max = '100%', className, children, ...rest } = props;

  const { split, resizersSize, setupPane, destroyPane, getPaneSize } = useSplitPanes();
  const innerRef = React.useRef(null);
  const combinedRef = useCombinedRefs(ref, innerRef);

  const settings: PaneSettings = React.useMemo(
    () => ({
      size: initialSize,
      min,
      max,
    }),
    [initialSize, min, max],
  );

  React.useLayoutEffect(() => {
    const element = combinedRef.current;

    if (element === null) {
      return undefined;
    }

    setupPane(element, settings);

    return () => {
      destroyPane(element);
    };
  }, [combinedRef, settings, setupPane, destroyPane]);

  const style: React.CSSProperties = { ...props.style };
  const value = combinedRef.current === null ? initialSize : getPaneSize(combinedRef.current);
  const vertical = split === 'vertical';

  const styleProp = {
    minSize: vertical ? 'minWidth' : 'minHeight',
    maxSize: vertical ? 'maxWidth' : 'maxHeight',
    size: vertical ? 'width' : 'height',
  };

  Object.assign(style, {
    [styleProp.minSize]: utils.convertSizeToCSSValue(min, resizersSize),
    [styleProp.maxSize]: utils.convertSizeToCSSValue(max, resizersSize),
  });

  switch (utils.getUnit(value)) {
    case 'ratio':
      style.flex = value;
      break;
    case '%':
    case 'px':
      Object.assign(style, {
        flexGrow: 0,
        [styleProp.size]: utils.convertSizeToCSSValue(String(value), resizersSize),
      });
      break;
    default:
      throw new Error('Неизвестный unit');
  }

  return (
    <div
      role="treeitem"
      {...rest}
      ref={combinedRef}
      style={style}
      className={cnSplitPanes('Pane').mix(className).toString()}
    >
      {children}
    </div>
  );
});
