import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Button } from '@gpn-prototypes/vega-button';
import { Text } from '@gpn-prototypes/vega-text';
import { action } from '@storybook/addon-actions';
import { boolean, object, select, text, withKnobs } from '@storybook/addon-knobs';
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
  possibleDirections: object('possibleDirections', directions),
  onClickOutside: action('onClickOutside'),
  text: text('text', 'Подсказка'),
});

const Container = styled.div`
  margin: 50px;
  height: 40vh;
  background-color: #efe7e5;
`;

storiesOf('ui/Tooltip', module)
  .addDecorator(withKnobs)
  .addParameters({
    metadata: {
      author: 'Сonsta',
      status: 'Approved',
      link: {
        href:
          'https://consta-uikit.vercel.app/?path=/docs/components-tooltip--tooltip-positioned-by-anchor-story',
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
      <div style={{ margin: '200px 0 0 200px' }}>
        <Button type="button" onClick={handleClickOnAnchor} ref={buttonRef} label="Открыть" />
        {isTooltipVisible && (
          <Tooltip {...getCommonKnobs()} anchorRef={buttonRef}>
            <Text size="xs">{getCommonKnobs().text}</Text>
          </Tooltip>
        )}
      </div>
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
          <Text size="xs">{getCommonKnobs().text}</Text>
        </Tooltip>
      </>
    );
  });
