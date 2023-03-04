import React, { useEffect, useState } from 'react';
import { Button } from '@/components';
import { CSS } from '@stitches/react';
import { styled } from '#/stitches.config';
import { Hexile, Vexile } from '@haechi/flexile';

export const SelectedCircle: React.FC<{
  name?: string | null;
  category?: string;
}> = ({ name, category }) => {
  const about = '정보보안';
  const clubName = '스텔스';

  return (
    <Container>
      <About>{category ? category : about}</About>
      <ClubName>{name ? name : clubName}</ClubName>
    </Container>
  );
};

const Container = styled(Vexile, {
  height: '18rem',
  padding: '3.2rem',
  margin: 0,
  cursor: 'pointer',
  position: 'relative',
  borderRadius: '1rem',
  backgroundColor: '#fff',
  overflow: 'auto',
  lineHeight: 2,
  gap: '1rem',
});

const About = styled('p', {
  fontSize: '2rem',
  fontWeight: 500,
  lineHeight: '1.4rem',
  color: '$gray3',
});

const ClubName = styled('p', {
  fontSize: '1.6rem',
  fontWeight: 700,
  lineHeight: '1.9rem',
});
