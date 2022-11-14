import React, { useEffect, useState } from 'react';
import { Container, Button } from '@/components';
import { CSS } from '@stitches/react';
import { styled } from '#/stitches.config';
import { Hexile, Vexile } from '@haechi/flexile';

export const AppliedClub: React.FC<{
  padding: string;
  css?: CSS;
  active?: boolean;
}> = ({ padding, css, active }) => {
  const about = '농림축산협회';
  const clubName = '어썰티브';

  return (
    <Container padding={padding} css={css}>
      <ClubInfoBox>
        <ClubThumnail />
        <ClubInfo>
          <About>{about}</About>
          <ClubName>{clubName}</ClubName>
        </ClubInfo>
      </ClubInfoBox>
      <CheckState>지원 완료</CheckState>
    </Container>
  );
};

const ClubInfoBox = styled(Hexile, {
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
});

const ClubThumnail = styled('div', {
  width: '4.8rem',
  height: '4.8rem',
  backgroundColor: '$gray3',
  borderRadius: '1rem',
});

const ClubInfo = styled(Vexile, {
  marginLeft: '1.6rem',
  textAlign: 'center',
  gap: '.5rem',
});

const About = styled('div', {
  fontSize: '1.2rem',
  fontWeight: 500,
  lineHeight: '1.4rem',
  color: '$gray3',
});

const ClubName = styled('div', {
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
