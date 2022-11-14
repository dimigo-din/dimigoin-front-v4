import React from 'react';
import { ButtonCustom } from './style';
import { CSS } from '@stitches/react';

export const Button: React.FC<{
  active?: boolean;
  large?: boolean;
  value: string;
  onClick?: () => void;
  type?: 'button' | 'reset' | 'submit';
  css?: CSS;
}> = ({ active, large, value, onClick, type, css }) => (
  <ButtonCustom
    css={css}
    active={active || false}
    large={large || false}
    onClick={onClick}
    type={type}
  >
    {value}
  </ButtonCustom>
);
