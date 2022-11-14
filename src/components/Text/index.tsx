import React from 'react';
import { CSS } from '@stitches/react';
import { CustomText } from './style';

export const Text: React.FC<
  {
    active?: boolean;
    css?: CSS;
    button?: boolean;
  } & React.HTMLProps<HTMLSpanElement>
> = ({ active, css, button, ...props }) => (
  <CustomText
    active={active || false}
    button={button || false}
    css={css}
    onClick={props.onClick}
  >
    {props.children}
  </CustomText>
);
