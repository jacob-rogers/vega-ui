import React from 'react';
import block from 'bem-cn';
import classNames from 'classnames';

import { ColumnTypes } from '../../enums';
import { HeaderRendererProps } from '../../types';
import { DraggableHeader } from '../DraggableHeader';

import '../Header.css';

const headerBlock = block('Header');

const PrecedingContent = (type: string, headerId: string) => {
  return type === ColumnTypes.Number ? (
    <div className={headerBlock('HeaderId')}>{headerId}</div>
  ) : (
    <div />
  );
};

export default React.memo<HeaderRendererProps>(function DefaultHeader(props: HeaderRendererProps) {
  const { column } = props;
  const { type, headerId } = column;

  if (column.type === ColumnTypes.Splitter)
    return <div className={classNames(headerBlock('Root'))} />;

  return (
    <DraggableHeader
      {...props}
      className={classNames(
        type === ColumnTypes.Number && headerBlock('CalcParamHeader'),
      )}
      precedingContent={PrecedingContent(type!, headerId!)}
    />
  );
});
