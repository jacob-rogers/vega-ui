import React from 'react';
import { PortalsRoot, usePortalsRoot } from '@gpn-prototypes/vega-portals-root';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, addParameters, configure } from '@storybook/react';
import { withPerformance } from 'storybook-addon-performance';
import { withThemes } from 'storybook-addon-themes';

import { withMetadata } from './with-metadata';
import { VegaThemeDecorator } from './with-themes';

document.documentElement.lang = 'ru';

document.body.style.margin = '0px';

const themes = [
  {
    name: 'gpnDefault',
    color: '#fff',
  },
  {
    name: 'gpnDark',
    default: true,
    color: '#22272b',
  },
  {
    name: 'gpnDisplay',
    color: '#002033',
  },
];

addParameters({ themes: { list: themes, Decorator: VegaThemeDecorator } });
addDecorator(withMetadata);
addDecorator(withThemes);
addDecorator(withKnobs);
addDecorator(withPerformance);
addDecorator(withA11y);

addParameters({
  themes: { list: themes, Decorator: withThemes },
});

addDecorator(withKnobs);
addDecorator(withPerformance);
addDecorator((story) => {
  const appStyles = {
    background: 'var(--color-bg-default)',
    padding: 'var(--space-3xl)',
    minHeight: '100vh',
  };

  return (
    <PortalsRoot containerId={portalContainerId} className={defaultClassName}>
      <div style={appStyles}>{story()}</div>
    </PortalsRoot>
  );
});

addDecorator(withThemes);

function loadStories(): void {
  const req = require.context('../packages', true, /\.stories\.tsx$/);

  req.keys().forEach(req);
}

configure(loadStories, module);
