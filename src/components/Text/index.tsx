import React from 'react';
import { CSS } from '@stitches/react';
import { CustomText } from './style';

// $accent
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

// $black2
// export const Text2: React.FC<{
//   active?: boolean;
//   children: React.ReactElement[] | React.ReactElement | string | false;
//   css?: CSS;
//   button?: boolean;
//   onClick?: React.MouseEventHandler<HTMLParagraphElement>;
// }> = ({ active, children, css, button, onClick }) => (
//   <CustomText2
//     active={active || false}
//     button={button || false}
//     css={css}
//     onClick={onClick}
//   >
//     {children}
//   </CustomText2>
// );
