import { useMount } from '../use-mount';

export function useUnmount(fn: Function): void {
  useMount(() => fn);
}
