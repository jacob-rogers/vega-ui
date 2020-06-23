import { cnTheme } from '@gpn-design/uikit/Theme';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, addParameters, configure } from '@storybook/react';
import { withPerformance } from 'storybook-addon-performance';

import { getThemes } from './themes';
import { withMetadata } from './with-metadata';

import '@gpn-design/uikit/__internal__/src/components/Theme/Theme.css';
import '@gpn-design/uikit/__internal__/src/components/Theme/_color/Theme_color_gpnDefault.css';
import '@gpn-design/uikit/__internal__/src/components/Theme/_color/Theme_color_gpnDark.css';
import '@gpn-design/uikit/__internal__/src/components/Theme/_color/Theme_color_gpnDisplay.css';
import '@gpn-design/uikit/__internal__/src/components/Theme/_space/Theme_space_gpnDefault.css';
import '@gpn-design/uikit/__internal__/src/components/Theme/_size/Theme_size_gpnDefault.css';
import '@gpn-design/uikit/__internal__/src/components/Theme/_font/Theme_font_gpnDefault.css';
import '@gpn-design/uikit/__internal__/src/components/Theme/_control/Theme_control_gpnDefault.css';
import '@gpn-design/uikit/__internal__/src/utils/whitepaper/whitepaper.css';

document.documentElement.lang = 'ru';

const themes = cnTheme({
  space: 'gpnDefault',
  size: 'gpnDefault',
  font: 'gpnDefault',
  control: 'gpnDefault',
});

const defaultClassName = `Theme ${themes} Theme_color_gpnDark`;
document.body.className = defaultClassName;
document.body.style.margin = '0px';

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modalRoot');
document.body.appendChild(modalRoot);

addParameters({ themes: getThemes() });
addDecorator(withMetadata);
addDecorator(withKnobs);
addDecorator(withPerformance);
addDecorator(withA11y);

function loadStories(): void {
  const req = require.context('../packages', true, /\.stories\.tsx$/);

  req.keys().forEach(req);
}

configure(loadStories, module);
