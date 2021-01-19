import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { action } from '@storybook/addon-actions';
import { boolean, number, object, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Button } from '../button';

import { Popover } from './Popover';

const directions = [
  'upLeft',
  'upCenter',
  'upRight',
  'downLeft',
  'downCenter',
  'downRight',
  'leftUp',
  'leftCenter',
  'leftDown',
  'rightUp',
  'rightCenter',
  'rightDown',
] as const;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getCommonKnobs = () => ({
  direction: select('direction', directions, 'upCenter'),
  offset: number('offset', 5),
  arrowOffset: number('arrowOffset', 0),
  possibleDirections: object('possibleDirections', directions),
  onClickOutside: action('onClickOutside'),
});

const Content = styled.div`
  padding: 100px;
  background-color: #efefef;
`;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 30vw;
  height: 30vh;
  background-color: #efe7e5;
`;

storiesOf('ui/Popover', module)
  .addDecorator(withKnobs)
  .addParameters({
    metadata: {
      author: 'Consta',
      status: 'Approved',
      link: {
        href:
          'https://consta-uikit.vercel.app/?path=/docs/components-popover--popover-positioned-by-anchor-story',
        text: 'Документация',
      },
    },
  })
  .add('по умолчанию', () => {
    const buttonRef = useRef(null);
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);
    const handleClickOnAnchor = (): void => {
      setIsPopoverVisible(!isPopoverVisible);
    };

    return (
      <Wrapper>
        <Button type="button" label="Открыть" onClick={handleClickOnAnchor} ref={buttonRef} />
        {isPopoverVisible && (
          <Popover {...getCommonKnobs()} anchorRef={buttonRef}>
            <Content>Контент</Content>
          </Popover>
        )}
      </Wrapper>
    );
  })
  .add('по координате', () => {
    const [position, setPosition] = useState<{ x: number; y: number }>();

    const handleMouseMove = (event: React.MouseEvent): void => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    return (
      <Wrapper>
        <Container
          onMouseMove={handleMouseMove}
          onMouseLeave={(): void => setPosition(undefined)}
        />
        <Popover
          {...getCommonKnobs()}
          isInteractive={boolean('isInteractive', false)}
          position={position}
        >
          {(direction): React.ReactNode => (
            <Content>
              <div>Направление: {direction}</div>
            </Content>
          )}
        </Popover>
      </Wrapper>
    );
  });
