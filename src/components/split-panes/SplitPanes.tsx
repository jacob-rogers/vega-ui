import React from 'react';

import { cnSplitPanes } from './cn-split-panes';
import { useActiveCursorStyles, useForceUpdate, useGlobalMovementHandlers } from './hooks';
import { Pane } from './Pane';
import { Resizer } from './Resizer';
import { PaneSettings, SplitPanesContext } from './SplitPanesContext';
import * as utils from './utils';

import './SplitPanes.css';

type PaneProps = React.ComponentProps<typeof Pane>;

type Child = React.ReactElement<PaneProps>;
type Children = Child[];

export interface SplitPanesProps extends React.HTMLAttributes<HTMLElement> {
  split?: 'horizontal' | 'vertical';
  resizerSize?: number;
  onResize?: VoidFunction;
  onResizeStart?: VoidFunction;
  onResizeEnd?: VoidFunction;
  allowResize?: boolean;
  children: Children;
}

interface SplitPanesComponent extends React.FC<SplitPanesProps> {
  Pane: typeof Pane;
}

const DEFAULT_PANE_SIZE = '1';
const DEFAULT_PANE_MIN_SIZE = '0';
const DEFAULT_PANE_MAX_SIZE = '100%';

const DEFAULT_PANE_SETTINGS: PaneSettings = {
  size: DEFAULT_PANE_SIZE,
  min: DEFAULT_PANE_MIN_SIZE,
  max: DEFAULT_PANE_MAX_SIZE,
};

interface DimensionsSnapshot {
  splitPaneSizePx: number;
  beforeResizerPaneSizePx: number;
  afterResizerPaneSizePx: number;
}

export const SplitPanes: SplitPanesComponent = (props) => {
  const {
    className,
    split = 'vertical',
    resizerSize = 2,
    allowResize = true,
    children,
    onResize,
    onResizeStart,
    onResizeEnd,
    ...rest
  } = props;

  const panesSettingsMap = React.useMemo(() => new Map<Element, PaneSettings>(), []);
  const panesSizePx = React.useMemo(() => new WeakMap<Element, number>(), []);
  const forceUpdate = useForceUpdate();

  const setupPane = React.useCallback(
    (elem: HTMLElement, settings: PaneSettings) => {
      panesSettingsMap.set(elem, settings);
    },
    [panesSettingsMap],
  );

  const updatePane = React.useCallback(
    (elem: Element, settings: Partial<PaneSettings>) => {
      const prev = panesSettingsMap.get(elem) ?? { ...DEFAULT_PANE_SETTINGS };
      panesSettingsMap.set(elem, Object.assign(prev, settings));
    },
    [panesSettingsMap],
  );

  const destroyPane = React.useCallback(
    (elem: HTMLElement) => {
      panesSettingsMap.delete(elem);
    },
    [panesSettingsMap],
  );

  const getResizerPanes = React.useCallback(
    (resizer: Element) => {
      const first = resizer.previousElementSibling;
      const second = resizer.nextElementSibling;

      if (first === null) {
        throw new Error('Не найдена панель перед ресайзером');
      }

      if (second === null) {
        throw new Error('Не найдена панель после ресайзера');
      }

      const firstPaneSettings = panesSettingsMap.get(first) ?? DEFAULT_PANE_SETTINGS;
      const secondPaneSettings = panesSettingsMap.get(second) ?? DEFAULT_PANE_SETTINGS;

      return [
        { element: first, settings: firstPaneSettings },
        { element: second, settings: secondPaneSettings },
      ];
    },
    [panesSettingsMap],
  );

  React.useLayoutEffect(() => {
    const sizeProp = split === 'vertical' ? 'width' : 'height';
    Array.from(panesSettingsMap.keys()).forEach((element) => {
      const rect = element.getBoundingClientRect();
      panesSizePx.set(element, rect[sizeProp]);
    });
  });

  const getPaneSize = React.useCallback(
    (element: Element): number => panesSizePx.get(element) ?? 0,
    [panesSizePx],
  );

  const startCoods = React.useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const dimensionsSnapshot = React.useRef<DimensionsSnapshot | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const resizersSize: number = React.useMemo(() => {
    return (React.Children.count(children) - 1) * resizerSize;
  }, [children, resizerSize]);

  const [activeResizer, setResizer] = React.useState<Element | null>(null);
  const isResizing = activeResizer !== null;

  const isResizerActive = React.useCallback((element: Element) => activeResizer === element, [
    activeResizer,
  ]);

  const start = (event: React.MouseEvent<Element>): void => {
    const { clientX: x, clientY: y, currentTarget: resizer } = event;

    if (!allowResize) {
      return;
    }

    const container = containerRef.current;

    if (container === null) {
      return;
    }

    const sizeProp = split === 'vertical' ? 'width' : 'height';

    const [beforeResizerPaneSizePx, afterResizerPaneSizePx] = getResizerPanes(resizer).map(
      (pane) => pane.element.getBoundingClientRect()[sizeProp],
    );

    const splitPaneDimensions = container.getBoundingClientRect();
    const splitPaneSizePx =
      split === 'vertical'
        ? splitPaneDimensions.width - resizersSize
        : splitPaneDimensions.height - resizersSize;

    startCoods.current = { x, y };

    dimensionsSnapshot.current = {
      splitPaneSizePx,
      beforeResizerPaneSizePx,
      afterResizerPaneSizePx,
    };

    setResizer(resizer);

    if (typeof onResizeStart === 'function') {
      onResizeStart();
    }
  };

  useActiveCursorStyles(isResizing, split);

  useGlobalMovementHandlers(isResizing, {
    onMove(event) {
      const snapshot = dimensionsSnapshot.current;

      if (snapshot === null || activeResizer === null) {
        return;
      }

      const { clientX: x, clientY: y } = event;

      const [before, after] = getResizerPanes(activeResizer);
      const maxSize = snapshot.beforeResizerPaneSizePx + snapshot.afterResizerPaneSizePx;
      const beforeMinSizePx = utils.convert(before.settings.min, snapshot.splitPaneSizePx);
      const afterMinSizePx = utils.convert(after.settings.min, snapshot.splitPaneSizePx);

      const beforeMaxSizePx = Math.min(
        utils.convert(before.settings.max, snapshot.splitPaneSizePx),
        maxSize - afterMinSizePx,
      );

      const afterMaxSizePx = Math.min(
        utils.convert(after.settings.max, snapshot.splitPaneSizePx),
        maxSize - beforeMinSizePx,
      );

      const moveOffest = split === 'vertical' ? startCoods.current.x - x : startCoods.current.y - y;

      let beforeSizePx = snapshot.beforeResizerPaneSizePx - moveOffest;
      let afterSizePx = snapshot.afterResizerPaneSizePx + moveOffest;

      let beforeHasReachedLimit = false;
      let afterHasReachedLimit = false;

      if (beforeSizePx < beforeMinSizePx) {
        beforeSizePx = beforeMinSizePx;
        beforeHasReachedLimit = true;
      } else if (beforeSizePx > beforeMaxSizePx) {
        beforeSizePx = beforeMaxSizePx;
        beforeHasReachedLimit = true;
      }

      if (beforeHasReachedLimit) {
        afterSizePx =
          snapshot.beforeResizerPaneSizePx + snapshot.afterResizerPaneSizePx - beforeSizePx;
      }

      if (afterSizePx < afterMinSizePx) {
        afterSizePx = afterMinSizePx;
        afterHasReachedLimit = true;
      } else if (afterSizePx > afterMaxSizePx) {
        afterSizePx = afterMaxSizePx;
        afterHasReachedLimit = true;
      }

      if (afterHasReachedLimit) {
        beforeSizePx =
          snapshot.beforeResizerPaneSizePx + snapshot.afterResizerPaneSizePx - afterSizePx;
      }

      panesSizePx.set(before.element, beforeSizePx);
      panesSizePx.set(after.element, afterSizePx);

      let updateRatio = false;

      [before, after].forEach((pane) => {
        const unit = utils.getUnit(pane.settings.size);
        if (unit !== 'ratio') {
          updatePane(pane.element, {
            size: utils.convertToUnit(
              panesSizePx.get(pane.element) as number,
              unit,
              snapshot.splitPaneSizePx,
            ),
          });
        } else {
          updateRatio = true;
        }
      });

      if (updateRatio) {
        let ratioCount = 0;
        let lastRatioSettings: PaneSettings | undefined;

        Array.from(panesSettingsMap.entries()).forEach(([elem, settings]) => {
          if (utils.getUnit(settings.size) === 'ratio') {
            ratioCount += 1;
            lastRatioSettings = settings;

            const size = panesSizePx.get(elem);

            if (size !== undefined) {
              settings.size = utils.convertToUnit(size, 'ratio'); // eslint-disable-line no-param-reassign
            }
          }
        });

        if (ratioCount === 1 && lastRatioSettings !== undefined) {
          lastRatioSettings.size = '1';
        }
      }

      if (typeof onResize === 'function') {
        onResize();
      }

      forceUpdate();
    },
    onEnd(event) {
      event.preventDefault();
      setResizer(null);
      if (typeof onResizeEnd === 'function') {
        onResizeEnd();
      }
    },
  });

  return (
    <SplitPanesContext.Provider
      value={{
        split,
        setupPane,
        destroyPane,
        updatePane,
        getPaneSize,
        resizersSize,
        isResizerActive,
      }}
    >
      <div
        role="tree"
        {...rest}
        ref={containerRef}
        className={cnSplitPanes({ split, resizing: isResizing })
          .is({ disabled: !allowResize })
          .mix(className)}
      >
        {React.Children.map(children, (child, idx) => {
          if (children.length - 1 === idx) {
            return child;
          }

          return (
            // eslint-disable-next-line
            <React.Fragment key={idx}>
              {child}
              <Resizer onStart={start} />
            </React.Fragment>
          );
        })}
      </div>
    </SplitPanesContext.Provider>
  );
};

SplitPanes.Pane = Pane;
