import React, { useState } from 'react';
import styled from '@emotion/styled';
import { select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Animation } from '../animation';
import { Button } from '../button';

import { PageFooter } from './PageFooter';

const Wrapper = styled.div<{ width: string }>`
  margin-top: var(--space-2xl);
  width: ${({ width }): string => width};
`;

const Block1 = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Block2 = styled.div`
  display: flex;
  justify-content: space-between;
`;

const cssButton = { marginLeft: 'var(--space-xs)' };

type KnobsProps = {
  wrapperWidth: '960px' | 'auto';
};

const knobs = (): KnobsProps => ({
  wrapperWidth: select('Wrapper width', { '960px': '960px', 'auto': 'auto' }, '960px'),
});

storiesOf('ui/PageFooter', module)
  .addParameters({
    metadata: {
      author: 'CSSSR',
      status: 'Approved',
      link: {
        href:
          'https://github.com/gpn-prototypes/vega-ui/blob/master/src/components/page-footer/README.md',
        text: 'Документация',
      },
    },
  })
  .add('Одна кнопка', () => {
    const [isShown, setIsShown] = useState(true);
    const handleShow = (): void => setIsShown(true);
    const handleHide = (): void => setIsShown(false);

    const { wrapperWidth } = knobs();

    return (
      <>
        <Button size="m" view="ghost" label="Показать Футер" onClick={handleShow} />
        <Button size="m" view="ghost" label="Скрыть Футер" css={cssButton} onClick={handleHide} />
        <Animation.Appearance side="bottom" in={isShown} mountOnEnter unmountOnExit>
          <Wrapper width={wrapperWidth}>
            <PageFooter>
              <Block1>
                <Button size="m" view="primary" label="Кнопка" />
              </Block1>
            </PageFooter>
          </Wrapper>
        </Animation.Appearance>
      </>
    );
  })
  .add('Две кнопки', () => {
    const [isShown, setIsShown] = useState(true);
    const handleShow = (): void => setIsShown(true);
    const handleHide = (): void => setIsShown(false);

    const { wrapperWidth } = knobs();

    return (
      <>
        <Button size="m" view="ghost" label="Показать Футер" onClick={handleShow} />
        <Button size="m" view="ghost" label="Скрыть Футер" css={cssButton} onClick={handleHide} />
        <Animation.Appearance side="bottom" in={isShown} mountOnEnter unmountOnExit>
          <Wrapper width={wrapperWidth}>
            <PageFooter>
              <Block2>
                <Button size="m" view="primary" label="Кнопка" />
                <Button size="m" view="primary" label="Кнопка" />
              </Block2>
            </PageFooter>
          </Wrapper>
        </Animation.Appearance>
      </>
    );
  });
