export type Content = {
  type: string;
  id: string;
  name: string;
};

export type Event = {
  id: string;
  name: string;
  content: Content[];
};

export type StepData = {
  type: string;
  id: string;
  name: string;
  events: Event[];
};
