import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, addParameters, configure } from '@storybook/react';
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
addDecorator(withA11y);
addDecorator(withKnobs);
addDecorator(withPerformance);
addDecorator(withThemes);

function loadStories(): void {
  const req = require.context('../packages', true, /\.stories\.tsx$/);

  req.keys().forEach(req);
}

configure(loadStories, module);
