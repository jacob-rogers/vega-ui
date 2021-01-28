import { useEffect, useRef } from 'react';
import Konva from 'konva';

import { CanvasView } from '../entities';
import { Position } from '../types';
import { getBgRect, getContentPadding } from '../utils';

type UseSavedScreen = {
  view: CanvasView;
  stageRef: React.RefObject<Konva.Stage>;
  layerRef: React.RefObject<Konva.Layer>;
  backgroundRectRef: React.RefObject<Konva.Rect>;
};

const isNumber = (value: unknown): boolean => typeof value === 'number' && Number.isFinite(value);

const getScrollPositionFromStorage = (): Position | undefined => {
  let result;
  const rawScrollData = sessionStorage.getItem('canvas-scroll-position');

  if (rawScrollData) {
    const parsedData = JSON.parse(rawScrollData);

    if (isNumber(parsedData.x) && isNumber(parsedData.y)) {
      result = parsedData;
    }
  }

  return result;
};

const getScaleFromStorage = (): number => {
  let result = 0;
  const rawScale = sessionStorage.getItem('canvas-scale');

  if (rawScale) {
    const convertedScale = parseFloat(rawScale);

    if (!Number.isNaN(convertedScale)) result = convertedScale;
  }

  return result;
};

export const useSavedScreen = ({
  view,
  stageRef,
  layerRef,
  backgroundRectRef,
}: UseSavedScreen): void => {
  const initializationRef = useRef(false);

  useEffect(() => {
    if (initializationRef.current) {
      return;
    }

    const { stageSize, contentRect } = view.getState();

    const layer = layerRef.current;
    const stage = stageRef.current;

    const scaleFromStorage = getScaleFromStorage();
    const scrollPositionFromStorage = getScrollPositionFromStorage();

    if (layer && stage) {
      initializationRef.current = true;

      if (scaleFromStorage === 0) {
        if (scrollPositionFromStorage) {
          layer.position(scrollPositionFromStorage);
        }

        return;
      }

      const oldScale = layer.scaleX();

      const newScale = Math.min(1.5, Math.max(0.1, Number(scaleFromStorage)));

      const pointer = {
        x: stageSize.width / 2,
        y: stageSize.height / 2,
      };

      const mousePointTo = {
        x: (pointer.x - layer.x()) / oldScale,
        y: (pointer.y - layer.y()) / oldScale,
      };

      layer.scale({ x: newScale, y: newScale });

      const newPosition = scrollPositionFromStorage || {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale,
      };

      layer.position(newPosition);

      backgroundRectRef.current?.setAttrs(
        getBgRect({
          contentRect,
          contentPadding: getContentPadding(stageSize),
          scale: newScale,
        }),
      );

      view.updateState({ scale: newScale });

      stage.batchDraw();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);
};
