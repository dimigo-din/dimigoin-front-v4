import React, { useEffect, useState } from 'react';
import { styled } from '#/stitches.config';
import { Container } from '@/components';
import { Hexile } from '@haechi/flexile';
import { useAfterschool } from '@/hooks/api';

const containerCss = {
  display: 'flex',
  flexDirection: 'column',
};
const TextCss = {
  fontWeight: 700,
  lineHeight: '1.9rem',
  '&::before': {
    content: '',
    width: '4rem',
    border: '1px solid #E83C77',
    borderRadius: '.5rem',
    position: 'absolute',
    bottom: '-0.8rem',
    left: '50%',
    transform: 'translateX(-50%)',
  },
};

const AfterSchool: React.FC = () => {
  const [appliedClass, setAppliedClass] = useState(undefined);
  const asdf = useAfterschool();
  console.log(asdf);

  return (
    <Wrapper>
      <LeftBox></LeftBox>
      <Container padding="4rem 3.5rem" css={containerCss}>
        <Title>내가 신청한 강좌</Title>
        <Contents>{appliedClass ? '' : '신청강좌x'}</Contents>
      </Container>
    </Wrapper>
  );
};

export default AfterSchool;

const Wrapper = styled('div', {
  width: '100%',
  height: '100%',
  position: 'relative',
  color: '$gray6',
  display: 'grid',
  gridGap: '2rem',
  gridTemplateColumns: '1fr 45rem',
});

const LeftBox = styled(Hexile, {
  maxHeight: 'calc(100vh - 16rem)',
  gap: '2rem',
});

const Title = styled('span', {
  fontSize: '1.8rem',
  fontWeight: 700,
  lineHeight: '2.1rem',
  color: '$gray1',
});

const Contents = styled(Hexile);
