import React from 'react';
import { IconAdd } from '@gpn-design/uikit/IconAdd';
import { IconDrag } from '@gpn-design/uikit/IconDrag';
import { IconExpand } from '@gpn-design/uikit/IconExpand';
import { IconRemove } from '@gpn-design/uikit/IconRemove';
import { Button } from '@gpn-prototypes/vega-ui';

import { b, useScalePanel } from './context';

import './ScalePanel.css';

interface ScalePanelInnerProps {
  currentScale: number;
  className?: string;
}

interface ScalePanelViewProps extends ScalePanelInnerProps {
  onZoomIn(): void;
  onZoomOut(): void;
}

export const ScalePanelView: React.FC<ScalePanelViewProps> = (props) => {
  const { className, currentScale, onZoomIn, onZoomOut } = props;

  return (
    <div className={b.mix(className).toString()}>
      <Button
        title="Хз что это"
        onlyIcon
        iconLeft={IconExpand}
        className={b('Expand').toString()}
        size="l"
        view="clear"
        // onClick={}
      />
      <Button
        title="Выровнять по горизонтали"
        /* TODO иконку заменить */
        onlyIcon
        iconLeft={IconDrag}
        className={b('Drag').toString()}
        size="l"
        view="clear"
        // onClick={}
      />
      <Button
        title="Уменьшить"
        onlyIcon
        iconLeft={IconRemove}
        className={b('ZoomOut').toString()}
        size="l"
        view="clear"
        onClick={onZoomOut}
      />
      <Button
        title="Увеличить"
        onlyIcon
        iconLeft={IconAdd}
        className={b('ZoomIn').toString()}
        size="l"
        view="clear"
        onClick={onZoomIn}
      />
      <Button
        label={`${currentScale.toString()}%`}
        title="Текущий масштаб"
        className={b('CurrentScale').toString()}
        size="l"
        view="clear"
        // onClick={}
      />
    </div>
  );
};

export const ScalePanelInner: React.FC<ScalePanelInnerProps> = (props) => {
  const { zoomIn, zoomOut } = useScalePanel();
  return <ScalePanelView {...props} onZoomIn={zoomIn} onZoomOut={zoomOut} />;
};
