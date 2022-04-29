import React from 'react';
import { set } from 'lodash/fp';

type Ref<T> = null | React.RefObject<T> | React.RefCallback<T>;

/**
 * Получение рефа, общего для всех переданных
 */
export default function useCombinedRefs<T>(
  ...refs: Ref<T>[]
): React.RefObject<T> {
  const targetRef = React.useRef<T>(null);

  React.useEffect(() => {
    refs.forEach((ref) => {
      if (ref === null) return;

      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        set(['current'], targetRef.current, ref);
      }
    });
  }, [refs]);

  return targetRef;
}
