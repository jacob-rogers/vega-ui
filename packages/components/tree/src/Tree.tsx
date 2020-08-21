import React from 'react';
import { block } from 'bem-cn';

import './Tree.css';

export type TreeProps = {
  title?: string;
  className?: string;
};

const cnTree = block('VegaTree');

export const Tree: React.FC<TreeProps> = ({ title = 'default', className }) => {
  return <div className={cnTree.mix(className)}>Title: {title}</div>;
};
