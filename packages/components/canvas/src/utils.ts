import Konva from 'konva';

export type ContentRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const getContentRect = (
  elements: Konva.Node[],
  minWidth: number,
  minHeight: number,
): ContentRect => {
  const rect = {
    x: 0,
    y: 0,
    width: minWidth,
    height: minHeight,
  };

  for (let i = 0; i < elements.length; i += 1) {
    const element = elements[i];

    const elementXO = element.x();
    const elementY0 = element.y();
    const elementX1 = element.x() + element.width();
    const elementY1 = element.y() + element.height();

    /*

    x0, y0 ----- x1, y0
    |                 |
    |                 |
    |                 |
    x0, y1 ----- x1, y1

    */

    const rectX0 = rect.x;
    const rectY0 = rect.y;
    const rectX1 = rect.x + rect.width;
    const rectY1 = rect.y + rect.height;

    if (elementXO < rectX0) {
      rect.x = elementXO;
      rect.width = rectX1 - elementXO;
    }

    if (elementY0 < rectY0) {
      rect.y = elementY0;
      rect.height = rectY1 - elementY0;
    }

    if (elementX1 > rectX1) {
      rect.width = elementX1 - rectX0;
    }

    if (elementY1 > rectY1) {
      rect.height = elementY1 - rectY0;
    }
  }

  return rect;
};
