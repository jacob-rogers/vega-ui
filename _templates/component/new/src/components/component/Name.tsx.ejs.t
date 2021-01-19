---
to: src/components/<%= name %>/<%= h.changeCase.pascal(name) %>.tsx
---
import React from 'react';
import { block } from 'bem-cn';

import './<%= h.changeCase.pascal(name) %>.css';

export type <%= h.changeCase.pascal(name) %>Props = {
  title?: string;
  className?: string;
};

const cn<%= h.changeCase.pascal(name) %> = block('Vega<%= h.changeCase.pascal(name) %>');

export const <%= h.changeCase.pascal(name) %>: React.FC<<%= h.changeCase.pascal(name) %>Props> = ({ title = 'default', className }) => {
  return <div className={cn<%= h.changeCase.pascal(name) %>.mix(className)}>Title: {title}</div>;
};
