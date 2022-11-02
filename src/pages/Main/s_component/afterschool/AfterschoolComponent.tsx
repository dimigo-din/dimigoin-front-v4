import React, { useEffect, useState } from 'react';
import { Container, Button } from '@/components';
import { CSS } from '@stitches/react';
import { styled } from '#/stitches.config';
import { Hexile, Vexile } from '@haechi/flexile';

export const AfterschoolComponent: React.FC<{
  padding: string;
  css?: CSS;
  title: string;
  teacher: string;
  time: string;
  remaining: number;
  active?: boolean;
  btnVal: string;
}> = ({ padding, css, title, teacher, time, remaining, active, btnVal }) => (
  <Container padding={padding} css={css}>
    <Header>
      <Title>{title}</Title>
      <Teacher>{teacher} 선생님</Teacher>
    </Header>
    <InfoBox>
      <Button value={btnVal} active={active} />
    </InfoBox>
  </Container>
);

const Header = styled(Vexile);
const InfoBox = styled(Vexile);

const Title = styled(Hexile, {
  fontSize: '1.8rem',
  lineHeight: '2.1rem',
});

const Teacher = styled(Hexile, {
  fontSize: '1.4rem',
  lineHeight: '1.7rem',
  color: '$gray3',
});
