import React, { useEffect, useState } from 'react';
import { Button } from '@/components';
import { CSS } from '@stitches/react';
import { styled } from '#/stitches.config';
import { Hexile, Vexile } from '@haechi/flexile';

export const ToApplyCircle: React.FC<{
  active?: boolean;
  name?: string;
  category?: string;
  onClick: any;
  value: number;
}> = ({ name, category, active, onClick, value }) => {
  const about = '정보보안';
  const clubName = '스텔스';

  return (
    <Container
      id={`${value}`}
      active={active ? true : undefined}
      onClick={onClick}
    >
      <CircleInfoBox>
        <CircleThumnail />
        <CircleInfo>
          <About>{category ? category : about}</About>
          <CircleName>{name ? name : clubName}</CircleName>
        </CircleInfo>
      </CircleInfoBox>
    </Container>
  );
};

const Container = styled(Hexile, {
  height: '18rem',
  margin: 0,
  cursor: 'pointer',
  position: 'relative',
  borderRadius: '1rem',
  backgroundColor: '#fff',
  overflow: 'auto',
  lineHeight: 2,
  variants: {
    active: {
      true: {
        border: '2px solid $accent',
      },
    },
  },
});

const CircleInfoBox = styled(Vexile, {
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
});

const CircleThumnail = styled('div', {
  width: '4.8rem',
  height: '4.8rem',
  backgroundColor: '$gray3',
  borderRadius: '1rem',
});

const CircleInfo = styled(Vexile, {
  marginTop: '2.6rem',
  textAlign: 'center',
  gap: '.5rem',
});

const About = styled('div', {
  fontSize: '1.2rem',
  fontWeight: 500,
  lineHeight: '1.4rem',
  color: '$gray3',
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
