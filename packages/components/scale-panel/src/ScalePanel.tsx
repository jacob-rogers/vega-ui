import React from 'react';
import { IconAdd } from '@gpn-design/uikit/IconAdd';
import { IconDrag } from '@gpn-design/uikit/IconDrag';
import { IconExpand } from '@gpn-design/uikit/IconExpand';
import { IconRemove } from '@gpn-design/uikit/IconRemove';
import { Button } from '@gpn-prototypes/vega-ui';

import { b, useScalePanel } from './context';
import { ScalePanelManager } from './ScalePanelManager';

import './ScalePanel.css';

interface ScalePanelProps extends React.ComponentProps<typeof ScalePanelManager> {
  currentScale: number;
  className?: string;
  onChange: (idx: number) => void;
}

export const ScalePanel: React.FC<ScalePanelProps> = (props) => {
  const { onChange, className, currentScale } = props;
  const { zoomIn, zoomOut } = useScalePanel();

  return (
    <ScalePanelManager currentScale={currentScale} onChange={onChange}>
      <div className={b.mix(className).toString()}>
        {/* {children} */}
        <Button
          // title={}
          title="Хз что это"
          onlyIcon
          iconLeft={IconExpand}
          className={b('Expand').toString()}
          size="l"
          view="clear"
          // onClick={}
        />
        <Button
          // title={}
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
          // title={}
          title="Уменьшить"
          onlyIcon
          iconLeft={IconRemove}
          className={b('ZoomOut').toString()}
          size="l"
          view="clear"
          onClick={zoomOut}
        />
        <Button
          // title={}
          title="Увеличить"
          onlyIcon
          iconLeft={IconAdd}
          className={b('ZoomIn').toString()}
          size="l"
          view="clear"
          onClick={zoomIn}
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
    </ScalePanelManager>
  );
};
