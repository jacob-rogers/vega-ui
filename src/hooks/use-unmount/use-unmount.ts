import { useMount } from '../use-mount';

export type Fn = () => VoidFunction | void;

export function useUnmount(fn: Fn): void {
  useMount(() => {
    return (): void => {
      fn();
    };
  });
}
