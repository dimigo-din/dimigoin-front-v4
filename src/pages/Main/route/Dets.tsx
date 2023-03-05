import React, { useEffect, useState } from 'react';
import { styled } from '#/stitches.config';
import { Container } from '@/components';
import { Hexile } from '@haechi/flexile';
import { DetsComponent, AppliedDets } from '../s_component/dets';

const containerCss = {
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100vh - 14.5rem)',
};

const DetsCss = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  maxWidth: '38rem',
  flexBasis: '38rem',
  height: '38rem',
};

const appliedDetsCss = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%',
  height: '18.8rem',
  backgroundColor: '$subWhite1',
};

export const Dets: React.FC = () => {
  const [toApplyDets, setToApplyDets] = useState<number[] | undefined | null>(
    undefined,
  );
  const [appliedDets, setAppliedDets] = useState<number[] | undefined | null>(
    undefined,
  );

  useEffect(() => {
    setToApplyDets([1, 2, 3, 4, 5]);
    setAppliedDets([1, 2, 3, 4, 5]);
  }, []);

  return (
    <Wrapper>
      <LeftBox>
        {toApplyDets ? (
          toApplyDets.map((idx) => (
            <DetsComponent
              padding="3.2rem"
              css={DetsCss}
              active={true}
              btnVal={'신청'}
              banner={1}
              key={idx}
            />
          ))
        ) : (
          <NO_DETS_DATA>신청가능한 DETS가 없어요</NO_DETS_DATA>
        )}
      </LeftBox>
      <Container padding="4rem 3.5rem" css={containerCss}>
        <Title>내가 신청한 DETS</Title>
        <AppliedBox>
          {appliedDets ? (
            appliedDets.map((idx) => (
              <AppliedDets
                padding="2.8rem"
                css={appliedDetsCss}
                btnVal="취소"
                active={false}
                key={idx}
              />
            ))
          ) : (
            <NO_DETS_DATA>신청한 DETS가 없어요</NO_DETS_DATA>
          )}
        </AppliedBox>
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
  gridTemplateColumns: '1fr 45rem',
});

const LeftBox = styled(Hexile, {
  position: 'relative',
  height: 'fit-content',
  maxHeight: 'calc(100vh - 14.5rem)',
  flexWrap: 'wrap',
  overflowY: 'auto',
  gap: '2rem',
});

const Title = styled('span', {
  fontSize: '2rem',
  fontWeight: 700,
  lineHeight: '2.4rem',
});

const AppliedBox = styled(Hexile, {
  position: 'relative',
  minHeight: '60rem',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '2.4rem',
  flexWrap: 'wrap',
  overflowY: 'auto',
  gap: '2rem',
});

const NO_DETS_DATA = styled('div', {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '20rem',
  fontSize: '1.8rem',
  fontWeight: 500,
  textAlign: 'center',
  color: '$gray2',
});
