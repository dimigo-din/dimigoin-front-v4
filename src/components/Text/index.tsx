import React from 'react';
import { CSS } from '@stitches/react';
import { CustomText } from './style';

export const Text: React.FC<{
  active?: boolean;
  children: React.ReactElement[] | React.ReactElement | string | false;
  css?: CSS;
  button?: boolean;
  onClick?: React.MouseEventHandler<HTMLParagraphElement>;
}> = ({ active, children, css, button, onClick }) => {
  return (
    <CustomText
    active={active || false}
    button={button || false}
    css={css}
    onClick={onClick}>{children}</CustomText>
  );
};
