import React, { useEffect, useState } from 'react';
import { Container, Button } from '@/components';
import { CSS } from '@stitches/react';
import { styled } from '#/stitches.config';
import { Hexile, Vexile } from '@haechi/flexile';

export const AppliedCircle: React.FC<{
  padding: string;
  css?: CSS;
  active?: boolean;
}> = ({ padding, css, active }) => {
  const about = '농림축산협회';
  const clubName = '어썰티브';

  return (
    <Container padding={padding} css={css}>
      <CircleInfoBox>
        <CircleThumnail />
        <CircleInfo>
          <About>{about}</About>
          <CircleName>{clubName}</CircleName>
        </CircleInfo>
      </CircleInfoBox>
      <CheckState>지원 완료</CheckState>
    </Container>
  );
};

const CircleInfoBox = styled(Hexile, {
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
});

const CircleThumnail = styled('div', {
  width: '4.8rem',
  height: '4.8rem',
  backgroundColor: '$grade6',
  borderRadius: '1rem',
});

const CircleInfo = styled(Vexile, {
  marginLeft: '1.6rem',
  textAlign: 'center',
  gap: '.5rem',
});

const About = styled('div', {
  fontSize: '1.2rem',
  fontWeight: 500,
  lineHeight: '1.4rem',
  color: '$grade6',
});

const CircleName = styled('div', {
  fontSize: '1.6rem',
  fontWeight: 700,
  lineHeight: '1.9rem',
});

const CheckState = styled('div', {
  color: '$blue',
  fontSize: '1.6rem',
  fontWeight: 700,
  lineHeight: '2rem',
  marginTop: '2rem',
});
