import React from 'react';
import { render } from 'react-dom';
import { PortalParams, useMount, useOnChange, usePortals } from '@gpn-prototypes/vega-hooks';
import { ThemeRoot } from '@gpn-prototypes/vega-root';

type CanvasPortalProps = {
  children: React.ReactElement;
  params: PortalParams;
};

export const CanvasPortal: React.FC<CanvasPortalProps> = (props) => {
  const { params, children } = props;

  const { ref } = usePortals(params);

  const component = <ThemeRoot themeName="dark">{children}</ThemeRoot>;

  const renderPortal = (): void => {
    if (ref.current[params.name]) {
      render(component, ref.current[params.name]);
    }
  };

  useMount(() => {
    renderPortal();
  });

  useOnChange(props, () => {
    renderPortal();
  });

  return null;
};
