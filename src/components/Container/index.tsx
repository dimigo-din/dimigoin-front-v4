import { CSS } from '@stitches/react';
import React from 'react';
import {
  ContainerCustom,
  Title,
  SubTitle,
  TitleContainer,
  InnerTitle,
} from './style';

export const Container: React.FC<{
  padding: string;
  children: React.ReactElement[] | React.ReactElement | false;
  title?: string;
  innerTitle?: React.ReactElement[] | React.ReactElement | string | false;
  subTitle?: string;
  column?: boolean;
  css?: CSS;
  innerTitleCss?: CSS;
}> = ({
  padding,
  children,
  title,
  innerTitle,
  subTitle,
  column,
  css,
  innerTitleCss,
}) => {
  return (
    <ContainerCustom
      column={column || false}
      css={css}
      style={{ padding: padding || '4rem 3.5rem' }}
    >
      {innerTitle ? (
        <TitleContainer>
          <Title>{title}</Title>
          <InnerTitle css={innerTitleCss}>{innerTitle}</InnerTitle>
        </TitleContainer>
      ) : (
        title && <Title>{title}</Title>
      )}
      {subTitle && <SubTitle>{subTitle}</SubTitle>}
      {children}
    </ContainerCustom>
  );
};
