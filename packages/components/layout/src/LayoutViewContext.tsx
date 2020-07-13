import { createContext, useContext } from 'react';

export type LayoutViewContextProps = {
  orientation?: 'horizontal' | 'vertical';
};

export const LayoutViewContext = createContext<LayoutViewContextProps>({
  orientation: 'vertical',
});

export const useLayoutView = (): LayoutViewContextProps => {
  return useContext(LayoutViewContext);
};
