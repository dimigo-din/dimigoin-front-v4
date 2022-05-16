import { CSS } from '@stitches/react';
import React from 'react';
import { ContainerCustom, Title, SubTitle } from './style';

export const Container: React.FC<{
  padding: string;
  children: React.ReactElement[] | React.ReactElement | false;
  title?: string;
  subTitle?: string;
  column?: boolean;
  css?: CSS;
}> = ({ padding, children, title, subTitle, column, css }) => {
  return (
    <ContainerCustom
    column={column || false}
    css={css}
    style={{padding: padding || '4rem 3.5rem'}}
    >
      {subTitle && (<SubTitle>{subTitle}</SubTitle>)}
      {title && (<Title>{title}</Title>)}
      {children}
    </ContainerCustom>
  );
};