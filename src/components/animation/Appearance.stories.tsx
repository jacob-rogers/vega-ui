import React, { useState } from 'react';
import { Button } from '@consta/uikit/Button';
import { css } from '@emotion/core';
import { select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Appearance } from './Appearance';

const cssBase = css`
  position: fixed;
  width: 100px;
  height: 100px;
  background: var(--color-bg-soft);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const cssTop = css`
  top: 0px;
  left: 50%;
`;

const cssBottom = css`
  bottom: 0px;
  left: 50%;
`;

const cssLeft = css`
  left: 0px;
  top: 50%;
`;

const cssRight = css`
  right: 0px;
  top: 50%;
`;

const cssMap = {
  top: cssTop,
  bottom: cssBottom,
  left: cssLeft,
  right: cssRight,
};

const cssButton = css`
  margin-left: var(--space-xs);
`;

storiesOf('ui/Animation/Appearance', module)
  .addDecorator(withKnobs)
  .addParameters({ metadata: { author: 'CSSSR', status: 'Approved' } })
  .add('по умолчанию', () => {
    const [isShown, setIsShown] = useState(true);
    const handleShow = (): void => setIsShown(true);
    const handleHide = (): void => setIsShown(false);

    const side = select(
      'side',
      { left: 'left', right: 'right', top: 'top', bottom: 'bottom' },
      'right',
      'Appearance',
    );

    const cssExtra = cssMap[side];

    return (
      <>
        <Button size="m" view="ghost" label="Показать элемент" onClick={handleShow} />
        <Button size="m" view="ghost" label="Скрыть элемент" css={cssButton} onClick={handleHide} />
        <Appearance side={side} in={isShown} mountOnEnter unmountOnExit>
          <div css={[cssBase, cssExtra]}>Элемент</div>
        </Appearance>
      </>
    );
  });
