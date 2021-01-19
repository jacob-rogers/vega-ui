import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Button } from '../button';

import { Sidebar, SidebarProps } from './Sidebar';
import { useSidebar } from './use-sidebar';

const KNOB_GROUPS = {
  sidebar: 'Sidebar',
};

const knobs = (): Partial<SidebarProps> & { blockHeight: '660px' | 'auto' } => ({
  hasOverlay: boolean('hasOverlay', true, KNOB_GROUPS.sidebar),
  align: select('align', { left: 'left', right: 'right' }, 'right', KNOB_GROUPS.sidebar),
  blockHeight: select('Blocks height', { 'auto': 'auto', '660px': '660px' }, 'auto'),
});

const Wrapper = styled.div<{ justifyContent: string }>`
  display: flex;
  justify-content: ${({ justifyContent }): string => justifyContent};
  &:not(:last-of-type) {
    margin-bottom: var(--space-xs);
  }
`;

const cssButton = css`
  margin-left: var(--space-xs);
`;

const Block = styled.div<{ height?: string; cursor?: string }>`
  height: ${({ height }): string => height || 'auto'};
  padding: var(--space-xs);
  font-size: var(--size-text-s);
  color: var(--color-typo-primary);
  background: var(--color-bg-ghost);
  cursor: ${({ cursor }): string => cursor || 'auto'};
  &:not(:first-of-type) {
    margin-top: var(--space-xs);
  }
`;

storiesOf('ui/Sidebar', module)
  .addDecorator(withKnobs)
  .addParameters({ metadata: { author: 'CSSSR', status: 'Approved' } })
  .addParameters({
    metadata: {
      author: 'CSSSR',
      status: 'Approved',
      link: {
        href:
          'https://github.com/gpn-prototypes/vega-ui/blob/master/packages/components/sidebar/README.md',
        text: 'Документация',
      },
    },
  })
  .add('Обычный контент', () => {
    const {
      state: { isOpen, isMinimized },
      close: handleClose,
      open: handleOpen,
      maximize: handleMaximize,
      minimize: handleMinimize,
    } = useSidebar({
      isOpen: true,
      isMinimized: false,
    });

    const { align, blockHeight, ...restKnobs } = knobs();
    const justifyContent = align === 'right' ? 'flex-start' : 'flex-end';

    return (
      <>
        <Wrapper justifyContent={justifyContent}>
          <Button view="primary" size="m" label="Открыть Сайдбар" onClick={handleOpen} />
          <Button
            view="primary"
            size="m"
            label="Закрыть Сайдбар"
            css={cssButton}
            onClick={handleClose}
          />
        </Wrapper>
        <Wrapper justifyContent={justifyContent}>
          <Button view="primary" size="m" label="Развернуть Сайдбар" onClick={handleMaximize} />
          <Button
            view="primary"
            size="m"
            label="Свернуть Сайдбар"
            css={cssButton}
            onClick={handleMinimize}
          />
        </Wrapper>
        <Sidebar
          align={align}
          isOpen={isOpen}
          isMinimized={isMinimized}
          onOverlayClick={handleClose}
          onMinimize={handleMinimize}
          onClose={handleClose}
          {...restKnobs}
        >
          {isMinimized ? (
            <>
              <Sidebar.Header hasMinimizeButton={false}>Загрузка файлов</Sidebar.Header>
              <Sidebar.Body>
                <Block cursor="pointer" onClick={handleMaximize}>
                  Блок 1
                </Block>
              </Sidebar.Body>
            </>
          ) : (
            <>
              <Sidebar.Header>Загрузка файлов</Sidebar.Header>
              <Sidebar.Body>
                <Block height={blockHeight}>Блок 1</Block>
                <Block height={blockHeight}>Блок 2</Block>
                <Block height={blockHeight}>Блок 3</Block>
              </Sidebar.Body>
              <Sidebar.Footer>
                <Wrapper justifyContent="flex-end">
                  <Button size="s" view="ghost" label="Загрузить еще файл" />
                  <Button size="s" view="primary" label="Сохранить" css={cssButton} />
                </Wrapper>
              </Sidebar.Footer>
            </>
          )}
        </Sidebar>
      </>
    );
  });
