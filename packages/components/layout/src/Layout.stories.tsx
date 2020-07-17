import React from 'react';
import styled from '@emotion/styled';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import { Layout } from './Layout';

const Container = styled.div`
  width: 100%;
  height: 900px;
  box-sizing: border-box;
`;

storiesOf('ui/Layout', module).add('по умолчанию', () => {
  return (
    <Container>
      <Layout onChange={action('onChange')} />
    </Container>
  );
});
