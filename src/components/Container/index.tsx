import { CSS } from '@stitches/react';
import React from 'react';
import { containerCustom } from './style';

export const Container: React.FC<{
  padding: string;
  children: React.ReactElement[] | false;
  column?: boolean;
  css?: CSS;
}> = ({ padding, children, column, css }) => {
  const Ctn = containerCustom(padding);

  return (
    <Ctn column={column || false} css={css}>
      {children}
    </Ctn>
  );
};