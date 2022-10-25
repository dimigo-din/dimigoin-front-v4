import React from 'react';
import { CSS } from '@stitches/react';
import { CustomText1, CustomText2 } from './style';

// $accent
export const Text1: React.FC<{
  active?: boolean;
  children: React.ReactElement[] | React.ReactElement | string | false;
  css?: CSS;
  button?: boolean;
  onClick?: React.MouseEventHandler<HTMLParagraphElement>;
}> = ({ active, children, css, button, onClick }) => {
  return (
    <CustomText1
      active={active || false}
      button={button || false}
      css={css}
      onClick={onClick}
    >
      {children}
    </CustomText1>
  );
};

// $black2
export const Text2: React.FC<{
  active?: boolean;
  children: React.ReactElement[] | React.ReactElement | string | false;
  css?: CSS;
  button?: boolean;
  onClick?: React.MouseEventHandler<HTMLParagraphElement>;
}> = ({ active, children, css, button, onClick }) => {
  return (
    <CustomText2
      active={active || false}
      button={button || false}
      css={css}
      onClick={onClick}
    >
      {children}
    </CustomText2>
  );
};
