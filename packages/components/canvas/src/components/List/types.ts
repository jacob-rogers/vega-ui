export type Content = {
  type: string;
  id: number;
  name: string;
};

export type Event = {
  id: number;
  name: string;
  content: Content[];
};

export type StepData = {
  type: string;
  id: number;
  name: string;
  events: Event[];
};
