import React from 'react';
import { cnTheme } from '@gpn-design/uikit/Theme';
import { AppContainer, AppContainerManager } from '@gpn-prototypes/vega-app-container';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, addParameters, configure } from '@storybook/react';
import { withPerformance } from 'storybook-addon-performance';
import { withThemes } from 'storybook-addon-themes';

import { withMetadata } from './with-metadata';
import { VegaThemeDecorator } from './with-themes';

document.documentElement.lang = 'ru';

const themes = cnTheme({
  space: 'gpnDefault',
  size: 'gpnDefault',
  font: 'gpnDefault',
  control: 'gpnDefault',
});

const defaultClassName = `Theme ${themes} Theme_color_gpnDefault`;

document.body.className = defaultClassName;
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
const appContainerManager = new AppContainerManager('rootSelector', 'modalRoot');

appContainerManager.createPortalRoot({ className: defaultClassName });

const ThemeDecorator = ({
  children,
  theme = { class: 'Theme_color_gpnDefault' },
}): React.ReactElement => {
  const className = `Theme ${themes} ${theme.class}`;
  document.body.className = className;
  appContainerManager.updatePortalRootClassName(className);
  return <div className={className}>{children}</div>;
};

addParameters({
  themes: { list: getThemes(), Decorator: ThemeDecorator },
});

addDecorator(withKnobs);
addDecorator(withPerformance);
addDecorator((story) => {
  return story();
});

addDecorator((storyFn) => {
  window.document.documentElement.lang = 'ru';

  document.body.className = defaultClassName;

  return <div>{storyFn()}</div>;
});

addDecorator((story) => {
  const appStyles = {
    background: 'var(--color-bg-default)',
    padding: 'var(--space-3xl)',
    minHeight: '100vh',
  };

  return (
    <AppContainer appContainerManager={appContainerManager} style={appStyles}>
      {story()}
    </AppContainer>
  );
});

addDecorator(withThemes);

function loadStories(): void {
  const req = require.context('../packages', true, /\.stories\.tsx$/);

  req.keys().forEach(req);
}

configure(loadStories, module);
