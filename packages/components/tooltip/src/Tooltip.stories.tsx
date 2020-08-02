import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Text } from '@gpn-design/uikit/Text';
import { action } from '@storybook/addon-actions';
import { boolean, number, object, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Tooltip } from './Tooltip';

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
  size: select('size', ['s', 'm', 'l'], 's'),
  direction: select('direction', directions, 'upCenter'),
  arrowOffset: number('arrowOffset', 0),
  possibleDirections: object('possibleDirections', directions),
  onClickOutside: action('onClickOutside'),
});

const Button = styled.button`
  margin: 200px;
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

storiesOf('ui/Tooltip', module)
  .addDecorator(withKnobs)
  .addParameters({
    metadata: {
      author: 'Дизайн-система ГПН',
      status: 'Approved',
      link: {
        href: 'https://gpn-prototypes.github.io/ui-kit/?path=/story/tooltip',
        text: 'Документация',
      },
    },
  })
  .add('по умолчанию', () => {
    const buttonRef = useRef(null);
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const handleClickOnAnchor = (): void => {
      setIsTooltipVisible(!isTooltipVisible);
    };

    React.useEffect(() => setIsTooltipVisible(false), [buttonRef]);

    return (
      <>
        <Button type="button" onClick={handleClickOnAnchor} ref={buttonRef}>
          Открыть
        </Button>
        {isTooltipVisible && (
          <Tooltip {...getCommonKnobs()} anchorRef={buttonRef}>
            <Text size="xs">Текст подсказки</Text>
          </Tooltip>
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
        <Tooltip
          {...getCommonKnobs()}
          isInteractive={boolean('isInteractive', false)}
          position={position}
        >
          <Text size="xs">Подсказка</Text>
        </Tooltip>
      </>
    );
  });
