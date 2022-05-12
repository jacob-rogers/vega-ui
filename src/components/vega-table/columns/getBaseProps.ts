import { ComponentType } from 'react';
import { FormatterProps, HeaderRendererProps } from 'react-data-grid';

import { BaseTableProps, GridRow } from '../types';

const getBaseProps = (
  formatter: ComponentType<FormatterProps<GridRow>>,
  HeaderRenderer: ComponentType<HeaderRendererProps<GridRow>>,
): BaseTableProps => ({
  formatter,
  headerRenderer: HeaderRenderer,
});

export default getBaseProps;
