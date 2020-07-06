import React, {
  createContext,
  MutableRefObject,
  RefObject,
  useContext,
  useRef,
  useState,
} from 'react';

type DivProps = JSX.IntrinsicElements['div'];

export type PortalParams = {
  className?: string;
  id: string;
} & DivProps;

type Portal = {
  ref: string | ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null;
} & PortalParams;

type PortalContextProps = {
  portals: MutableRefObject<(HTMLDivElement | null)[]>;
};

const PortalsContext = createContext<PortalContextProps>({
  portals: { current: [] },
});

export const usePortals = (): PortalContextProps => useContext(PortalsContext);

type PortalsRootProps = {
  children: React.ReactNode;
  portalParams?: PortalParams[];
};

export const PortalsRoot: React.FC<PortalsRootProps> = (props) => {
  const { children, portalParams = [] } = props;

  const refs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <PortalsContext.Provider value={{ portals: refs }}>
      {children}
      {portalParams.map(({ id, ...rest }) => (
        <div {...rest} key={id} ref={(ref): number => refs.current.push(ref)} />
      ))}
    </PortalsContext.Provider>
  );
};
