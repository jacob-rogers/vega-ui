import { metrics } from './metrics';
import { Event } from './types';

export type EventReferencePoints = {
  posY: number;
  height: number;
  containerHeight: number;
};

export type StepReferencePoints = {
  stepHeight: number;
  eventPoints: EventReferencePoints[];
};

const containerPaddings =
  metrics.step.container.padding.top + metrics.step.container.padding.bottom;

export const getStepReferencePoints = (events: Event[]): StepReferencePoints => {
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
