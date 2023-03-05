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
      <LeftBox>
        <Container
          title="잔류신청"
          subTitle={'n월 n주차'}
          css={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: 'calc(100vh - 14.5rem)',
          }}
          padding="3.2rem"
        >
          <TitleBox>
            <Title></Title>
          </TitleBox>
        </Container>
      </LeftBox>
      <Container
        title="Stay & outing pages"
        padding="3.2rem"
        css={containerCss}
      >
        <div></div>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled('div', {
  width: '100%',
  height: '100%',
  position: 'relative',
  color: '$grade10',
  display: 'grid',
  gridGap: '2rem',
  gridTemplateColumns: '1fr 40rem',
});

const LeftBox = styled(Hexile, {
  position: 'relative',
  width: 'calc(100vw - 66rem)',
  gap: '2rem',
});

const TitleBox = styled(Vexile);
const Title = styled('p', {
  fontSize: '2rem',
  fontWeight: 700,
  lineHeight: '2.4rem',
});
const SubTitle = styled('p', {});
