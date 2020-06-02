/** @jsx jsx */

import { jsx } from '@emotion/core';
import { Button } from '@gpn-prototypes/vega-button';
import { storiesOf } from '@storybook/react';

import { ScalePanel } from './ScalePanel';

const cssWrapper = {
  width: '960px',
};

const cssExtraClass1 = {
  display: 'flex',
  justifyContent: 'flex-end',
};

storiesOf('ui/ScalePanel', module)
  .addParameters({ metadata: { author: 'CSSSR', status: 'Approved' } })
  .add('Панель в разработке', () => (
    <div css={cssWrapper}>
      <ScalePanel css={cssExtraClass1}>
        <Button size="m" view="primary" label="Кнопка" />
      </ScalePanel>
    </div>
  ));
