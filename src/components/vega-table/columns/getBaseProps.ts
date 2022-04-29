import { ComponentType } from 'react';
import { FormatterProps, HeaderRendererProps } from 'react-data-grid';

import { BaseProps, GridRow } from '../types';

const getBaseProps = (
  formatter: ComponentType<FormatterProps<GridRow>>,
  HeaderRenderer: ComponentType<HeaderRendererProps<GridRow>>,
): BaseProps => ({
  formatter,
  headerRenderer: HeaderRenderer,
});

export default getBaseProps;
