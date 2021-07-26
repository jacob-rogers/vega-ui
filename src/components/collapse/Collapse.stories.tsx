import React, { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Collapse } from './Collapse';

storiesOf('ui/Collapse', module)
  .addDecorator(withKnobs)
  .addParameters({
    metadata: {
      author: 'Consta',
      status: 'Approved',
      link: {
        href: 'https://consta-uikit.vercel.app/?path=/docs/components-collapse--playground',
        text: 'Документация',
      },
    },
  })
  .add('по умолчанию', () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Collapse isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} label="Компонент Collapse">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam delectus expedita
          itaque, officiis quia rem sit voluptate? Alias aliquam aspernatur beatae corporis, cumque
          cupiditate dolorem earum omnis quibusdam ratione sed?
        </p>
      </Collapse>
    );
  });
