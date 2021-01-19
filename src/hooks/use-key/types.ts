export type PossibleEvent = KeyboardEvent;

export type Handler = (e: PossibleEvent) => void;

export type HandledEventsType = 'keydown' | 'keypress' | 'keyup';
