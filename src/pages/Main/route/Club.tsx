import React, { useEffect, useState } from 'react';
import { styled } from '#/stitches.config';
import { Container } from '@/components';
import { Hexile, Vexile } from '@haechi/flexile';
import { AppliedClub, ToApplyClub, SelectedCircle } from '../s_component/club';
import { useAllCircle } from '@/hooks/api/useCircle';
import { Circle } from '@/constants/types';

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
  maxWidth: '22rem',
  minWidth: '20rem',
  backgroundColor: '$subWhite1',
};

const Club: React.FC = () => {
  const [toApplyClub, setToApplyClub] = useState<Circle[] | undefined | null>(
    undefined,
  );
  const [appliedClub, setAppliedClub] = useState<number[] | undefined | null>(
    undefined,
  );
  const [circleActive, setCircleActive] = useState<number | undefined>(
    undefined,
  );

  const circle = useAllCircle();

  const SelectCircle = (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log(e?.currentTarget.id);
    setCircleActive(Number(e?.currentTarget.id));
  };

  useEffect(() => {
    setToApplyClub(circle);
    setAppliedClub([1, 2, 3]);
  }, [circle]);

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
            <AppliedSubBox>
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
                  신청한 동아리가 없어요
                </NO_APPLIEDCLUB_DATA>
              )}
            </AppliedSubBox>
          </AppliedBox>
        </Container>
        <ToApplyBox>
          {toApplyClub ? (
            toApplyClub.map(({ name, category }, idx) => (
              <ToApplyClub
                name={name}
                category={category}
                active={circleActive === idx ? true : false}
                onClick={SelectCircle}
                value={idx}
                key={idx}
              ></ToApplyClub>
            ))
          ) : (
            <NO_APPLIEDCLUB_DATA>
              신청가능한 동아리가 없어요
            </NO_APPLIEDCLUB_DATA>
          )}
        </ToApplyBox>
      </LeftBox>
      <Container padding="0rem" css={containerCss}>
        <SelectedCircle
          name={
            circleActive !== undefined
              ? circle && circle[circleActive].name
              : '선택한 동아리가 없어요'
          }
          category={
            circleActive !== undefined
              ? circle && circle[circleActive].category
              : '선택한 동아리가 없어요'
          }
        />
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
  marginTop: '2.4rem',
  width: '100%',
  overflowX: 'auto',
});

const AppliedSubBox = styled(Hexile, {
  position: 'relative',
  justifyContent: 'space-evenly',
  width: 'max(100%, 65.6rem)',
  gap: '2.8rem',
});

const ToApplyBox = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
  position: 'relative',
  maxHeight: 'calc(100vh - 42.9rem)',
  alignItems: 'center',
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
