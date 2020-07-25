import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { action } from '@storybook/addon-actions';
import { boolean, number, object, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

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

const Button = styled.button`
  margin: 200px;
`;

const Content = styled.div`
  padding: 100px;
  background-color: #efefef;
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30vw;
  height: 30vh;
  transform: translate(-50%; -50%);
  background-color: #efe7e5;
`;

storiesOf('ui/Popover', module)
  .addDecorator(withKnobs)
  .addParameters({
    metadata: {
      author: 'Дизайн-система ГПН',
      status: 'Approved',
      link: {
        href: 'https://gpn-prototypes.github.io/ui-kit/?path=/story/popover',
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
      <>
        <Button type="button" onClick={handleClickOnAnchor} ref={buttonRef}>
          Открыть
        </Button>
        {isPopoverVisible && (
          <Popover {...getCommonKnobs()} anchorRef={buttonRef}>
            <Content>Контент</Content>
          </Popover>
        )}
      </>
    );
  })
  .add('по координате', () => {
    const [position, setPosition] = useState<{ x: number; y: number }>();

    const handleMouseMove = (event: React.MouseEvent): void => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    return (
      <>
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
      </>
    );
  });
