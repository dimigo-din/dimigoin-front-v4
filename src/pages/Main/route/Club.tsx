import React, { useEffect, useState } from 'react';
import { styled } from '#/stitches.config';
import { Container } from '@/components';
import { Hexile, Vexile } from '@haechi/flexile';
import { AppliedClub, ToApplyClub } from '../s_component/club';

const containerCss = {
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100vh - 14.5rem)',
};

const innerTitleCss = {
  fontWeight: '500',
  lineHeight: '2rem',
  color: '$gray3',
};

const appliedClubsCss = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '26.4rem',
};

const AppliedClubCss = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '25rem',
  minWidth: '20rem',
  backgroundColor: '$subWhite1',
};

const ToApplyClubCss = {
  width: '18rem',
  height: '18rem',
};

const Club: React.FC = () => {
  const [toApplyClub, setToApplyClub] = useState<number[] | undefined | null>(
    undefined,
  );
  const [appliedClub, setAppliedClub] = useState<number[] | undefined | null>(
    undefined,
  );

  useEffect(() => {
    setToApplyClub([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    setAppliedClub([1, 2, 3]);
  }, []);

  return (
    <Wrapper>
      <LeftBox>
        <Container
          padding="3.2rem"
          css={appliedClubsCss}
          title="내가 지원한 동아리"
          innerTitle={appliedClub ? '신청한 뒤에는 취소할 수 없어요' : false}
          innerTitleCss={innerTitleCss}
        >
          <AppliedBox>
            {appliedClub ? (
              appliedClub.map((idx) => (
                <AppliedClub
                  padding="3.2rem"
                  css={AppliedClubCss}
                  key={idx}
                ></AppliedClub>
              ))
            ) : (
              <NO_APPLIEDCLUB_DATA>
                신청한 동아리가 없습니다
              </NO_APPLIEDCLUB_DATA>
            )}
          </AppliedBox>
        </Container>
        <ToApplyBox>
          {toApplyClub ? (
            toApplyClub.map((idx) => (
              <ToApplyClub
                padding="2.8rem"
                css={ToApplyClubCss}
                key={idx}
              ></ToApplyClub>
            ))
          ) : (
            <NO_APPLIEDCLUB_DATA>신청한 동아리가 없습니다</NO_APPLIEDCLUB_DATA>
          )}
        </ToApplyBox>
      </LeftBox>
      <Container padding="0rem" css={containerCss}>
        <div></div>
      </Container>
    </Wrapper>
  );
};

export default Club;

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

const AppliedBox = styled(Hexile, {
  position: 'relative',
  marginTop: '2.4rem',
  justifyContent: 'space-evenly',
  width: '100%',
  overflowX: 'auto',
  gap: '2.8rem',
});

const ToApplyBox = styled(Hexile, {
  position: 'relative',
  maxHeight: 'calc(100vh - 42.9rem)',
  flexWrap: 'wrap',
  overflowY: 'auto',
  gap: '2rem',
});

const NO_APPLIEDCLUB_DATA = styled('div', {
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
