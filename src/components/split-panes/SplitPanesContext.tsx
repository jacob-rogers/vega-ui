import React from 'react';

type Split = 'vertical' | 'horizontal';

export interface PaneSettings {
  size: string | number;
  min: string;
  max: string;
}

interface SplitPanesAPI {
  split: Split;
  resizersSize: number;
  setupPane(element: Element, settings: PaneSettings): void;
  updatePane(element: Element, settings: Partial<PaneSettings>): void;
  getPaneSize(element: Element): number;
  destroyPane(element: Element): void;
  isResizerActive(element: Element): boolean;
}

export const SplitPanesContext = React.createContext<SplitPanesAPI | null>(null);

export function useSplitPanes(): SplitPanesAPI {
  const api = React.useContext(SplitPanesContext);

  if (api === null) {
    throw new Error('<Pane> должен использоваться внутри <SplitPanes>');
  }

  return api;
}
