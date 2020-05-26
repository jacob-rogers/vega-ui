/** @jsx jsx */

import { Fragment, useState } from 'react';
import { jsx } from '@emotion/core';
import { Button } from '@gpn-prototypes/vega-button';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Sidebar, SidebarProps } from './Sidebar';

const defaultKnobs = (): SidebarProps => ({
  hasOverlay: boolean('hasOverlay', true),
  align: select('align', { left: 'left', right: 'right' }, 'right'),
});

const cssWrapper = {
  display: 'flex',
  justifyContent: 'flex-end',
};

const cssButton = {
  marginLeft: '8px',
};

const cssBlock = {
  'padding': '8px',
  'background': 'var(--color-bg-ghost)',
  'fontSize': 'var(--size-text-s)',
  'color': 'var(--color-typo-primary)',
  '&:not(:first-of-type)': { marginTop: 'var(--space-xs)' },
};

const cssBlockBig = {
  height: '660px',
};

storiesOf('ui/Sidebar', module)
  .addDecorator(withKnobs)
  .addParameters({ metadata: { author: 'CSSSR', status: 'Approved' } })
  .add('Обычный контент', () => {
    const [isOpen, setIsOpen] = useState(true);
    const handleOpen = (): void => setIsOpen(true);
    const handleClose = (): void => setIsOpen(false);

    return (
      // eslint-disable-next-line react/jsx-fragments
      <Fragment>
        <Button view="primary" size="m" label="Открыть Сайдбар" onClick={handleOpen} />
        <Sidebar isOpen={isOpen} onOverlayClick={handleClose} {...defaultKnobs()}>
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
      </Fragment>
    );
  })
  .add('Большой контент', () => {
    const [isOpen, setIsOpen] = useState(true);
    const handleOpen = (): void => setIsOpen(true);
    const handleClose = (): void => setIsOpen(false);

    return (
      // eslint-disable-next-line react/jsx-fragments
      <Fragment>
        <Button view="primary" size="m" label="Открыть Сайдбар" onClick={handleOpen} />
        <Sidebar
          isOpen={isOpen}
          onOverlayClick={handleClose}
          portalContainerSelector="#modalRoot"
          {...defaultKnobs()}
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
      </Fragment>
    );
  })
  .add('Свернутое окно', () => {
    const [isOpen, setIsOpen] = useState(true);
    const handleOpen = (): void => setIsOpen(true);
    const handleClose = (): void => setIsOpen(false);

    return (
      // eslint-disable-next-line react/jsx-fragments
      <Fragment>
        <Button view="primary" size="m" label="Открыть Сайдбар" onClick={handleOpen} />
        <Sidebar isOpen={isOpen} isMinimized {...defaultKnobs()}>
          <Sidebar.Header hasMinimizeButton={false} onClose={handleClose}>
            Загрузка файлов
          </Sidebar.Header>
          <Sidebar.Body>
            <div css={cssBlock}>Блок 1</div>
          </Sidebar.Body>
        </Sidebar>
      </Fragment>
    );
  });
