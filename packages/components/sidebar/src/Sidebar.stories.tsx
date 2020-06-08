import React from 'react';
import { css } from '@emotion/core';
import { Button } from '@gpn-prototypes/vega-button';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Sidebar, SidebarProps } from './Sidebar';
import { useSidebar } from './use-sidebar';

const KNOB_GROUPS = {
  sidebar: 'Sidebar',
};

const knobs = (): SidebarProps => ({
  hasOverlay: boolean('hasOverlay', true, KNOB_GROUPS.sidebar),
  align: select('align', { left: 'left', right: 'right' }, 'right', KNOB_GROUPS.sidebar),
});

const cssWrapper = css`
  display: flex;
  justify-content: flex-end;
`;

const cssButton = css`
  margin-left: var(--space-xs);
`;

const cssBlock = css`
  padding: var(--space-xs);
  background: var(--color-bg-ghost);
  font-size: var(--size-text-s);
  color: var(--color-typo-primary);
  &:not(:first-of-type) {
    margin-top: var(--space-xs);
  }
`;

const cssBlockBig = {
  height: '660px',
};

storiesOf('ui/Sidebar', module)
  .addDecorator(withKnobs)
  .addParameters({ metadata: { author: 'CSSSR', status: 'Approved' } })
  .add('Обычный контент', () => {
    const { isOpen, close: handleClose, open: handleOpen } = useSidebar({ initialState: true });

    return (
      <>
        <Button view="primary" size="m" label="Открыть Сайдбар" onClick={handleOpen} />
        <Sidebar isOpen={isOpen} onOverlayClick={handleClose} {...knobs()}>
          <Sidebar.Header onClose={handleClose}>Загрузка файлов</Sidebar.Header>
          <Sidebar.Body>
            <div css={cssBlock}>Блок 1</div>
            <div css={cssBlock}>Блок 2</div>
            <div css={cssBlock}>Блок 3</div>
          </Sidebar.Body>
          <Sidebar.Footer>
            <div css={cssWrapper}>
              <Button size="s" view="ghost" label="Загрузить еще файл" />
              <Button size="s" view="primary" label="Сохранить" css={cssButton} />
            </div>
          </Sidebar.Footer>
        </Sidebar>
      </>
    );
  })
  .add('Большой контент', () => {
    const { isOpen, close: handleClose, open: handleOpen } = useSidebar({ initialState: true });

    return (
      <>
        <Button view="primary" size="m" label="Открыть Сайдбар" onClick={handleOpen} />
        <Sidebar
          isOpen={isOpen}
          onOverlayClick={handleClose}
          portalContainerSelector="#modalRoot"
          {...knobs()}
        >
          <Sidebar.Header onClose={handleClose}>Загрузка файлов</Sidebar.Header>
          <Sidebar.Body>
            <div css={[cssBlock, cssBlockBig]}>Блок 1</div>
            <div css={[cssBlock, cssBlockBig]}>Блок 2</div>
            <div css={[cssBlock, cssBlockBig]}>Блок 3</div>
          </Sidebar.Body>
          <Sidebar.Footer>
            <div css={cssWrapper}>
              <Button size="s" view="ghost" label="Загрузить еще файл" />
              <Button size="s" view="primary" label="Сохранить" css={cssButton} />
            </div>
          </Sidebar.Footer>
        </Sidebar>
      </>
    );
  })
  .add('Свернутое окно', () => {
    const { isOpen, close: handleClose, open: handleOpen } = useSidebar({ initialState: true });

    return (
      <>
        <Button view="primary" size="m" label="Открыть Сайдбар" onClick={handleOpen} />
        <Sidebar isOpen={isOpen} isMinimized {...knobs()}>
          <Sidebar.Header hasMinimizeButton={false} onClose={handleClose}>
            Загрузка файлов
          </Sidebar.Header>
          <Sidebar.Body>
            <div css={cssBlock}>Блок 1</div>
          </Sidebar.Body>
        </Sidebar>
      </>
    );
  });
