import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, addParameters } from '@storybook/react';
import { withPerformance } from 'storybook-addon-performance';
import { withThemes } from 'storybook-addon-themes';

import { withMetadata } from './with-metadata';
import { VegaRootDecorator } from './with-root';

document.documentElement.lang = 'ru';

document.body.style.margin = '0px';

const themes = [
  {
    name: 'default',
    color: '#fff',
  },
  {
    name: 'dark',
    default: true,
    color: '#22272b',
  },
  {
    name: 'display',
    color: '#002033',
  },
];

addParameters({ themes: { list: themes, Decorator: VegaRootDecorator } });
addDecorator(withMetadata);
addDecorator(withKnobs);
addDecorator(withPerformance);
// @ts-expect-error: в декораторе проблема с типизацией возвращаемого параметра
addDecorator(withA11y);
addDecorator(withThemes);
