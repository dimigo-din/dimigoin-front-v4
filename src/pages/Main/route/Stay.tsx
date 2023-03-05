import React, { useEffect, useState } from 'react';
import { styled } from '#/stitches.config';
import { Container } from '@/components';
import { Hexile, Vexile } from '@haechi/flexile';

const containerCss = {
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100vh - 14.5rem)',
};

export const Stay: React.FC = () => {
  return (
    <Wrapper>
      <LeftBox></LeftBox>
      <Container padding="0rem" css={containerCss}>
        <div>Stay & outing pages</div>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled('div', {
  width: '100%',
  height: '100%',
  position: 'relative',
  color: '$gray6',
  display: 'grid',
  gridGap: '2rem',
  gridTemplateColumns: '1fr 40rem',
});

const LeftBox = styled(Vexile, {
  position: 'relative',
  width: 'calc(100vw - 66rem)',
  gap: '2rem',
});
