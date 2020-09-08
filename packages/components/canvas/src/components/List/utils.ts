import { metrics } from './metrics';

type Events = {
  name: string;
  content: {
    type: string;
    name: string;
  }[];
};

export type StepReferencePoints = {
  stepHeight: number;
  eventPoints: {
    posY: number;
    height: number;
    containerHeight: number;
  }[];
};

const containerPaddings =
  metrics.step.container.padding.top + metrics.step.container.padding.bottom;

export const getStepReferencePoints = (events: Events[]): StepReferencePoints => {
  if (events.length === 0) {
    return {
      stepHeight: metrics.step.emptyHeight,
      eventPoints: [],
    };
  }

  // Сразу добавляем сумму всех отступов между мероприятиями
  let summaryEventsHeight = metrics.step.event.marginBottom * (events.length - 1);
  let nextEventPosY = metrics.step.headerHeight;

  const eventPoints = [];

  for (let i = 0; i < events.length; i += 1) {
    const objectNumber = events[i].content.length;

    let containerHeight = 0;
    let eventHeight = 0;

    if (objectNumber === 0) {
      eventHeight = metrics.step.event.emptyHeight;
    } else {
      containerHeight =
        containerPaddings +
        metrics.step.object.height * objectNumber +
        metrics.step.object.marginBottom * (objectNumber - 1);

      eventHeight =
        metrics.step.event.headerHeight + containerHeight + metrics.step.event.padding.bottom;
    }

    summaryEventsHeight += eventHeight;
    eventPoints.push({
      posY: nextEventPosY,
      height: eventHeight,
      containerHeight,
    });

    nextEventPosY += eventHeight + metrics.step.event.marginBottom;
  }

  const stepHeight = metrics.step.headerHeight + summaryEventsHeight + metrics.step.padding.bottom;

  return {
    stepHeight,
    eventPoints,
  };
};
