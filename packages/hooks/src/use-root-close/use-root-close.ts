import { useKey } from '../use-key';
import { useOnClickOutside } from '../use-on-click-outside';

const escapeKeyCode = 'Escape';

export type PossibleCloseEvent = MouseEvent | KeyboardEvent | TouchEvent;

type Ref = React.MutableRefObject<HTMLElement | null>;

export function useRootClose(ref: Ref | Ref[], onRootClose: (e: PossibleCloseEvent) => void): void {
  useOnClickOutside({ ref, handler: onRootClose });
  useKey(escapeKeyCode, onRootClose);
}
